"use client";

import { useState, useEffect } from "react";
import { History, Trash2, Calendar, Brain, Filter, Search } from "lucide-react";
import ChallengeCard from "./ChallengeCard";

export default function HistoryPanel() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState("all");
  const [filterDifficulty, setFilterDifficulty] = useState("all");

  const subjects = [
    { value: "all", label: "All Subjects" },
    { value: "dsa", label: "Data Structures & Algorithms" },
    { value: "cpp", label: "C++" },
    { value: "java", label: "Java" },
    { value: "sql", label: "SQL" },
    { value: "oops", label: "Object-Oriented Programming" },
    { value: "os", label: "Operating Systems" },
    { value: "dbms", label: "Database Management" },
    { value: "cn", label: "Computer Networks" },
  ];

  const difficulties = [
    { value: "all", label: "All Difficulties" },
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ];

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/my-history");
      if (response.ok) {
        const data = await response.json();
        setHistory(data);
      } else {
        setError("Failed to fetch history");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/delete-challenge/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setHistory(history.filter((challenge) => challenge.id !== id));
      } else {
        console.error("Failed to delete challenge");
      }
    } catch (err) {
      console.error("Error deleting challenge:", err);
    }
  };

  const filteredHistory = history.filter((challenge) => {
    const matchesSearch = challenge.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSubject =
      filterSubject === "all" || challenge.subject === filterSubject;
    const matchesDifficulty =
      filterDifficulty === "all" || challenge.difficulty === filterDifficulty;

    return matchesSearch && matchesSubject && matchesDifficulty;
  });

  const groupChallengesByDate = (challenges) => {
    const groups = {};

    challenges.forEach((challenge) => {
      const date = new Date(challenge.dateCreated).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(challenge);
    });

    return groups;
  };

  const groupedChallenges = groupChallengesByDate(filteredHistory);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your challenge history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-700 font-medium">{error}</p>
          <button
            onClick={fetchHistory}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <History className="w-10 h-10 text-blue-600" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Challenge History
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Review your past challenges and track your progress
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {history.length}
              </p>
              <p className="text-gray-600">Total Challenges</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {Object.keys(groupedChallenges).length}
              </p>
              <p className="text-gray-600">Active Days</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Filter className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {filteredHistory.length}
              </p>
              <p className="text-gray-600">Filtered Results</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
          <Filter className="w-5 h-5 text-blue-600" />
          <span>Filter Challenges</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search challenges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Subject Filter */}
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {subjects.map((subject) => (
              <option key={subject.value} value={subject.value}>
                {subject.label}
              </option>
            ))}
          </select>

          {/* Difficulty Filter */}
          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {difficulties.map((difficulty) => (
              <option key={difficulty.value} value={difficulty.value}>
                {difficulty.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* History Content */}
      {filteredHistory.length === 0 ? (
        <div className="text-center py-12">
          <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-500 mb-2">
            No challenges found
          </h3>
          <p className="text-gray-400 mb-6">
            {history.length === 0
              ? "You haven't generated any challenges yet. Start by creating your first challenge!"
              : "Try adjusting your search or filter criteria."}
          </p>
          {history.length === 0 && (
            <button
              onClick={() => (window.location.href = "/")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Generate Your First Challenge
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedChallenges)
            .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
            .map(([date, challenges]) => (
              <div key={date} className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {new Date(date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </h3>
                  <div className="flex-1 h-px bg-gray-200"></div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {challenges.length} challenge
                    {challenges.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="grid gap-6">
                  {challenges
                    .sort(
                      (a, b) =>
                        new Date(b.dateCreated).getTime() -
                        new Date(a.dateCreated).getTime()
                    )
                    .map((challenge) => (
                      <ChallengeCard
                        key={challenge.id}
                        challenge={challenge}
                        showDeleteButton={true}
                        onDelete={handleDelete}
                      />
                    ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
