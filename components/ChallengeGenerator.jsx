"use client";

import { useState, useEffect } from "react";
import { Sparkles, Clock, User, Trophy, Zap, Loader2 } from "lucide-react";
import ChallengeCard from "./ChallengeCard";

export default function ChallengeGenerator() {
  const [challenge, setChallenge] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [difficulty, setDifficulty] = useState("easy");
  const [subject, setSubject] = useState("dsa");
  const [quota, setQuota] = useState(null);

  const subjects = [
    { value: "dsa", label: "Data Structures & Algorithms", icon: "🔗" },
    { value: "cpp", label: "C++", icon: "🧑‍💻" },
    { value: "java", label: "Java", icon: "☕" },
    { value: "sql", label: "SQL", icon: "🗃️" },
    { value: "oops", label: "Object-Oriented Programming", icon: "🏗️" },
    { value: "os", label: "Operating Systems", icon: "💻" },
    { value: "dbms", label: "Database Management", icon: "📊" },
    { value: "cn", label: "Computer Networks", icon: "🌐" },
  ];

  const difficulties = [
    {
      value: "easy",
      label: "Easy",
      color: "text-green-600 bg-green-100",
      icon: "🌱",
    },
    {
      value: "medium",
      label: "Medium",
      color: "text-yellow-600 bg-yellow-100",
      icon: "⚡",
    },
    {
      value: "hard",
      label: "Hard",
      color: "text-red-600 bg-red-100",
      icon: "🔥",
    },
  ];

  useEffect(() => {
    fetchQuota();
  }, []);

  const fetchQuota = async () => {
    try {
      const response = await fetch("/api/quota");
      if (response.ok) {
        const quotaData = await response.json();
        setQuota(quotaData);
      }
    } catch (err) {
      console.error("Failed to fetch quota:", err);
    }
  };

  const generateChallenge = async () => {
    if (quota && quota.challengesGenerated >= quota.maxChallenges) {
      setError("Daily quota exceeded. Try again tomorrow!");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-challenge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ difficulty, subject }),
      });

      if (response.ok) {
        const challengeData = await response.json();
        setChallenge(challengeData);
        await fetchQuota(); // Refresh quota
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to generate challenge");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getNextResetTime = () => {
    if (!quota) return "";
    const resetTime = new Date(quota.nextResetTime);
    const now = new Date();
    const diffHours = Math.ceil(
      (resetTime.getTime() - now.getTime()) / (1000 * 60 * 60)
    );
    return `${diffHours} hours`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="relative">
            <Sparkles className="w-12 h-12 text-blue-600" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <Zap className="w-3 h-3 text-yellow-800" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI Challenge Generator
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Test your programming knowledge with AI-powered challenges tailored to
          your skill level
        </p>
      </div>

      {/* Quota Display */}
      {quota && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <span className="font-semibold text-gray-800">
                Daily Progress
              </span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>
                  {quota.challengesGenerated}/{quota.maxChallenges} challenges
                </span>
              </div>
              {quota.challengesGenerated >= quota.maxChallenges && (
                <div className="flex items-center space-x-1 text-orange-600">
                  <Clock className="w-4 h-4" />
                  <span>Resets in {getNextResetTime()}</span>
                </div>
              )}
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    (quota.challengesGenerated / quota.maxChallenges) * 100
                  }%`,
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Configuration Panel */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
          <Sparkles className="w-6 h-6 text-blue-600" />
          <span>Configure Your Challenge</span>
        </h2>

        <div className="space-y-8">
          {/* Subject Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Subject
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {subjects.map((sub) => (
                <button
                  key={sub.value}
                  onClick={() => setSubject(sub.value)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    subject === sub.value
                      ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{sub.icon}</span>
                    <div>
                      <div className="font-medium text-gray-800 text-sm">
                        {sub.label}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Difficulty
            </label>
            <div className="flex space-x-4">
              {difficulties.map((diff) => (
                <button
                  key={diff.value}
                  onClick={() => setDifficulty(diff.value)}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all duration-200 ${
                    difficulty === diff.value
                      ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-xl">{diff.icon}</span>
                    <span className="font-medium text-gray-800">
                      {diff.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateChallenge}
            disabled={
              isLoading ||
              (quota && quota.challengesGenerated >= quota.maxChallenges)
            }
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating Challenge...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>Generate New Challenge</span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      )}

      {/* Challenge Display */}
      {challenge && (
        <div className="animate-fade-in">
          <ChallengeCard challenge={challenge} key={challenge.id} />
        </div>
      )}
    </div>
  );
}
