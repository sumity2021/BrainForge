import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import { ChallengeQuota } from "@/lib/models";

export async function GET(request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    let quota = await ChallengeQuota.findOne({ userId });
    if (!quota) {
      quota = await ChallengeQuota.create({ userId });
    }

    // Reset quota if 24 hours have passed
    const now = new Date();
    const timeDiff = now.getTime() - quota.lastResetDate.getTime();
    const hoursDiff = timeDiff / (1000 * 3600);

    if (hoursDiff >= 24) {
      quota.challengesGenerated = 0;
      quota.lastResetDate = now;
      await quota.save();
    }

    const nextResetTime = new Date(
      quota.lastResetDate.getTime() + 24 * 60 * 60 * 1000
    );

    return NextResponse.json({
      challengesGenerated: quota.challengesGenerated,
      maxChallenges: 5,
      nextResetTime: nextResetTime.toISOString(),
    });
  } catch (error) {
    console.error("Error fetching quota:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
