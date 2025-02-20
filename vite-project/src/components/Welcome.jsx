import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4">
      <div className="bg-white text-gray-800 shadow-lg rounded-2xl p-8 text-center w-full max-w-lg">
        <h1 className="text-4xl font-bold mb-4">🎉 Welcome to the Quiz!</h1>
        <p className="text-lg text-gray-600 mb-4">
          Test your knowledge and challenge yourself.
        </p>

        <h2 className="text-2xl font-bold text-indigo-500 mb-3">
          📌 Instructions:
        </h2>
        <ol className="list-decimal list-outside text-lg text-gray-700 space-y-2 text-left pl-6">
          <li>Select the best answer for multiple-choice questions.</li>
          <li>Enter your numerical answer for integer-type questions.</li>
          <li>Each correct answer earns you one point.</li>
          <li>
            You have <strong>30 seconds</strong> per question before
            auto-switching.
          </li>
        </ol>

        <div className="flex flex-row justify-between">
          <button
            onClick={() => navigate("/quiz")}
            className="mt-6 px-8 py-3 bg-indigo-500 text-white text-lg font-semibold rounded-xl shadow-md hover:bg-indigo-700 hover:scale-105 transition-transform duration-300 hover:cursor-pointer"
          >
            Start Quiz 🚀
          </button>
          <button
            onClick={() => navigate("/quiz-history")}
            className="mt-6 px-8 py-3 bg-indigo-500 text-white text-lg font-semibold rounded-xl shadow-md hover:bg-indigo-700 hover:scale-105 transition-transform duration-300 hover:cursor-pointer"
          >
            View Quiz History 📜
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
