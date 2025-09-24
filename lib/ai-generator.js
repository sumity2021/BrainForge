import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log("Gemini API Key?", !!process.env.GEMINI_API_KEY);

export async function generateChallengeWithAI(difficulty, subject) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const subjectMap = {
    dsa: "Data Structures and Algorithms",
    cpp: "C++ Programming",
    sql: "SQL and Database Queries",
    oops: "Object-Oriented Programming",
    java: "Java Programming",
    os: "Operating Systems",
    dbms: "Database Management Systems",
    cn: "Computer Networks",
  };

  const prompt = `Generate a ${difficulty} level multiple choice question about ${
    subjectMap[subject] || subject
  }.

Requirements:
1. Create a clear, concise question title
2. Provide exactly 4 options (A, B, C, D)
3. Only one option should be correct
4. Include a detailed explanation of why the correct answer is right
5. Make the question challenging but fair for ${difficulty} level

Return the response in this exact JSON format:
{
  "title": "Your question here",
  "question": "The question text here in HTML format",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswerId": 0,
  "explanation": "Detailed explanation here in HTML format"
}

The correctAnswerId should be 0-based index (0 for A, 1 for B, 2 for C, 3 for D).`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No valid JSON found in AI response");
    }

    const challengeData = JSON.parse(jsonMatch[0]);

    // Validate the response structure
    if (
      !challengeData.title ||
      !challengeData.question ||
      !Array.isArray(challengeData.options) ||
      challengeData.options.length !== 4 ||
      typeof challengeData.correctAnswerId !== "number" ||
      !challengeData.explanation
    ) {
      throw new Error("Invalid challenge data structure");
    }

    return challengeData;
  } catch (error) {
    console.error("Error generating challenge:", error);
    throw new Error("Failed to generate challenge");
  }
}
