import { useLocation, useNavigate } from "react-router";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || { score: 0, total: 0 };

  return (
    <div className="min-h-screen flex items-center justify-center  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Quiz Completed! 🎉</h2>
        <p className="text-lg text-gray-700 mt-2">
          Your Score: <span className="font-bold">{score}</span> / {total}
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition hover:cursor-pointer"
        >
          Restart Quiz 🔄
        </button>
      </div>
    </div>
  );
};

export default Result;
