import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import { Challenge } from "@/lib/models";

export async function GET(request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const challenges = await Challenge.find({ createdBy: userId })
      .sort({ dateCreated: -1 })
      .limit(50);

    return NextResponse.json(
      challenges.map((challenge) => ({
        id: challenge._id,
        difficulty: challenge.difficulty,
        subject: challenge.subject,
        title: challenge.title,
        question: challenge.question,
        options: challenge.options,
        correctAnswerId: challenge.correctAnswerId,
        explanation: challenge.explanation,
        dateCreated: challenge.dateCreated,
      }))
    );
  } catch (error) {
    console.error("Error fetching history:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
