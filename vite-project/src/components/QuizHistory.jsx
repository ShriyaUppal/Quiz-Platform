import React, { useState, useEffect } from "react";
import { getQuizHistory, clearQuizHistory } from "./utils/indexedDB";

const QuizHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const quizAttempts = await getQuizHistory();
      console.log(quizAttempts);
      setHistory(quizAttempts.reverse()); // Show latest attempts first
    };
    fetchHistory();
  }, []);

  const handleClearHistory = async () => {
    await clearQuizHistory();
    setHistory([]); // Update UI after clearing history
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">
          📜 Quiz History
        </h2>

        {history.length === 0 ? (
          <p className="text-gray-500 text-center">No quiz history found.</p>
        ) : (
          <ul className="divide-y divide-gray-300">
            {history.map((attempt, index) => (
              <li key={index} className="py-3">
                <p className="text-lg font-medium">
                  Score: {attempt.score} / {attempt.totalQuestions}
                </p>
                <p className="text-sm text-gray-500">
                  📅{" "}
                  {attempt.date || attempt.timeStamp
                    ? new Date(
                        attempt.date || attempt.timeStamp
                      ).toLocaleString()
                    : "Unknown Date"}
                </p>
              </li>
            ))}
          </ul>
        )}

        {history.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition hover:cursor-pointer"
          >
            🗑 Clear History
          </button>
        )}
        <a
          href="/"
          className="mt-4 px-4 py-2 text-purple-600 rounded-lg hover:text-purple-700 transition"
        >
          🔙 Back to Home
        </a>
      </div>
    </div>
  );
};

export default QuizHistory;
