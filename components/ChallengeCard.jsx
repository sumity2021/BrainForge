"use client";

import { useState } from "react";

export default function ChallengeCard({
  challenge,
  showDeleteButton = false,
  onDelete,
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const subjectMap = {
    dsa: {
      name: "Data Structures & Algorithms",
      icon: "🔗",
      color: "bg-blue-100 text-blue-800",
    },
    cpp: { name: "C++", icon: "🧑‍💻", color: "bg-purple-100 text-purple-800" },
    java: { name: "Java", icon: "☕", color: "bg-orange-100 text-orange-800" },
    sql: { name: "SQL", icon: "🗃️", color: "bg-green-100 text-green-800" },
    oops: {
      name: "Object-Oriented Programming",
      icon: "🏗️",
      color: "bg-indigo-100 text-indigo-800",
    },
    os: {
      name: "Operating Systems",
      icon: "💻",
      color: "bg-gray-100 text-gray-800",
    },
    dbms: {
      name: "Database Management",
      icon: "📊",
      color: "bg-teal-100 text-teal-800",
    },
    cn: {
      name: "Computer Networks",
      icon: "🌐",
      color: "bg-cyan-100 text-cyan-800",
    },
  };

  const difficultyConfig = {
    easy: { color: "bg-green-100 text-green-800", icon: "🌱" },
    medium: { color: "bg-yellow-100 text-yellow-800", icon: "⚡" },
    hard: { color: "bg-red-100 text-red-800", icon: "🔥" },
  };

  const subject = subjectMap[challenge.subject] || {
    name: challenge.subject,
    icon: "📝",
    color: "bg-gray-100 text-gray-800",
  };
  const difficulty = difficultyConfig[challenge.difficulty] || {
    color: "bg-gray-100 text-gray-800",
    icon: "❓",
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleOptionClick = (optionIndex) => {
    setSelectedOption(optionIndex);
    setShowExplanation(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 md:p-6 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3">
              <span
                className={`inline-flex items-center px-2 py-1 md:px-3 rounded-full text-xs md:text-sm font-medium ${subject.color}`}
              >
                <span className="mr-1">{subject.icon}</span>
                <span className="hidden sm:inline">{subject.name}</span>
                <span className="sm:hidden">{subject.name.split(" ")[0]}</span>
              </span>
              <span
                className={`inline-flex items-center px-2 py-1 md:px-3 rounded-full text-xs md:text-sm font-medium ${difficulty.color}`}
              >
                <span className="mr-1">{difficulty.icon}</span>
                {challenge.difficulty.charAt(0).toUpperCase() +
                  challenge.difficulty.slice(1)}
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-tight mb-2">
              {challenge.title}
            </h3>
            <div
              className="prose prose-sm md:prose text-gray-600 max-w-none break-words overflow-x-auto overflow-y-hidden whitespace-pre-wrap scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#d1d5db #f3f4f6",
              }}
              dangerouslySetInnerHTML={{ __html: challenge.question }}
            />
            <p className="text-xs md:text-sm text-gray-500 mt-2">
              {formatDate(challenge.dateCreated)}
            </p>
          </div>
          {showDeleteButton && onDelete && (
            <button
              onClick={() => onDelete(challenge.id)}
              className="ml-2 md:ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0 touch-manipulation"
              title="Delete challenge"
            >
              <svg
                className="w-4 h-4 md:w-5 md:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Options */}
      <div className="p-4 md:p-6">
        <div className="space-y-2 md:space-y-3">
          {challenge.options.map((option, index) => {
            const isCorrect = index === challenge.correctAnswerId;
            const isSelected = selectedOption === index;
            const optionLetter = String.fromCharCode(65 + index); // A, B, C, D

            // Determine styling based on selection and correctness
            let optionStyle =
              "border-gray-200 bg-gray-50 hover:bg-blue-50 hover:border-blue-200 cursor-pointer";
            let letterStyle = "bg-gray-300 text-gray-700";

            if (showExplanation) {
              if (isCorrect) {
                // Correct answer - always green
                optionStyle = "border-green-300 bg-green-50";
                letterStyle = "bg-green-500 text-white";
              } else if (isSelected) {
                // Selected wrong answer - red
                optionStyle = "border-red-300 bg-red-50";
                letterStyle = "bg-red-500 text-white";
              } else {
                // Other options - neutral
                optionStyle = "border-gray-200 bg-gray-50";
                letterStyle = "bg-gray-300 text-gray-700";
              }
            }

            return (
              <div
                key={index}
                onClick={() => !showExplanation && handleOptionClick(index)}
                className={`p-3 md:p-4 rounded-lg border-2 transition-all touch-manipulation ${optionStyle} ${
                  !showExplanation ? "hover:shadow-md active:scale-[0.98]" : ""
                }`}
              >
                <div className="flex items-start space-x-2 md:space-x-3">
                  <div
                    className={`flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-bold ${letterStyle}`}
                  >
                    {optionLetter}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm md:text-base text-gray-800 font-medium break-words"
                      dangerouslySetInnerHTML={{ __html: option }}
                    />

                    {showExplanation && isCorrect && (
                      <div className="mt-2 flex items-center space-x-1 text-green-700">
                        <svg
                          className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-xs md:text-sm font-medium">
                          Correct Answer
                        </span>
                      </div>
                    )}
                    {showExplanation && isSelected && !isCorrect && (
                      <div className="mt-2 flex items-center space-x-1 text-red-700">
                        <svg
                          className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-xs md:text-sm font-medium">
                          Your Answer
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="mt-4 md:mt-6 p-3 md:p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-2">
              <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                <svg
                  className="w-2.5 h-2.5 md:w-3 md:h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-blue-900 mb-2 text-sm md:text-base">
                  Explanation
                </h4>
                <div
                  className="text-blue-800 leading-relaxed prose space-y-2 max-w-none break-words"
                  dangerouslySetInnerHTML={{ __html: challenge.explanation }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
