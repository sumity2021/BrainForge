import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import { Challenge, ChallengeQuota } from "@/lib/models";
import { generateChallengeWithAI } from "@/lib/ai-generator";

export async function POST(request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { difficulty, subject } = await request.json();

    if (!difficulty || !subject) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    // Check and manage quota
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

    // Check if user has exceeded quota (5 challenges per day)
    if (quota.challengesGenerated >= 5) {
      return NextResponse.json(
        {
          error: "Daily quota exceeded",
          quotaExceeded: true,
        },
        { status: 429 }
      );
    }

    // Generate challenge with AI
    const challengeData = await generateChallengeWithAI(difficulty, subject);

    // Save challenge to database
    const challenge = await Challenge.create({
      difficulty,
      subject,
      createdBy: userId,
      title: challengeData.title,
      question: challengeData.question,
      options: challengeData.options,
      correctAnswerId: challengeData.correctAnswerId,
      explanation: challengeData.explanation,
    });

    // Update quota
    quota.challengesGenerated += 1;
    await quota.save();

    return NextResponse.json({
      id: challenge._id,
      difficulty: challenge.difficulty,
      subject: challenge.subject,
      title: challenge.title,
      question: challenge.question,
      options: challenge.options,
      correctAnswerId: challenge.correctAnswerId,
      explanation: challenge.explanation,
      dateCreated: challenge.dateCreated,
    });
  } catch (error) {
    console.error("Error generating challenge:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
