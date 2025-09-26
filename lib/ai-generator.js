import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateChallengeWithAI(difficulty, subject) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

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

  const prompt = `
  You are an expert computer science educator creating a multiple-choice question.

  **Topic:** ${subjectMap[subject] || subject}
  **Difficulty:** ${difficulty}

  **Instructions:**
  1.  **Title:** Create a clear, concise title for the question.
  2.  **Question:** Write a high-quality question. Use HTML for formatting. For code blocks, use \`<pre><code>...</code></pre>\`. For inline code, use \`<code>...\</code>\`.
  3.  **Options:** Provide exactly 4 unique options. One must be correct. Do NOT include prefixes like "A.", "B.". Use HTML for formatting if needed.
  4.  **Correct Answer ID:** Provide the 0-based index of the correct option.
  5.  **Explanation:** Provide a detailed explanation. First, explain why the correct answer is right. Then, briefly explain why each of the other options is incorrect. Use HTML for formatting.

  **JSON Output Schema:**
  {
    "title": "string",
    "question": "string (HTML) can include <pre><code>...</code></pre> for code blocks in multi-line code snippets",
    "options": ["string (HTML)", "string (HTML)", "string (HTML)", "string (HTML)"],
    "correctAnswerId": "number (0-3)",
    "explanation": "string (HTML)"
  }

  **Example:**
  {
    "title": "CSS Box Model Property",
    "question": "Which CSS property defines the space between an element's content and its border?",
    "options": [
      "<code>margin</code>",
      "<code>padding</code>",
      "<code>border</code>",
      "<code>outline</code>"
    ],
    "correctAnswerId": 1,
    "explanation": "<b>Correct:</b> <code>padding</code> is the correct property. It defines the innermost space around the content area, inside the border. <br><br><b>Incorrect Options:</b><br>• <code>margin</code> defines the space outside the border.<br>• <code>border</code> is the line between padding and margin.<br>• <code>outline</code> is a line drawn outside the border, but it doesn't take up space."
  }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("AI Response Text:", text);

    const challengeData = JSON.parse(text);

    // Validate the response structure
    if (
      !challengeData.title ||
      !challengeData.question ||
      !Array.isArray(challengeData.options) ||
      challengeData.options.length !== 4 ||
      typeof challengeData.correctAnswerId !== "number" ||
      !challengeData.explanation
    ) {
      throw new Error("Invalid challenge data structure from AI");
    }

    return challengeData;
  } catch (error) {
    console.error("Error generating challenge with AI:", error);
    throw new Error(
      "Failed to generate challenge due to an AI or parsing error."
    );
  }
}
