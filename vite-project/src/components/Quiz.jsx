import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveQuizAttempt } from "./utils/indexedDB";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [inputValue, setInputValue] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const navigate = useNavigate();

  // Fetch quiz questions
  useEffect(() => {
    fetch("/questions.json")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
        setTotalQuestions(data.length);
        setLoading(false);
      })
      .catch((err) => console.error("Error loading questions:", err));
  }, []);

  // Timer logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      nextQuestion();
    }
  }, [timer]);

  // Reset states when moving to the next question
  useEffect(() => {
    setTimer(30);
    setInputValue("");
    setAnswerStatus(null);
    setSelectedAnswer(null);
  }, [currentQuestion]);

  // Save quiz attempt when the quiz is finished
  useEffect(() => {
    if (quizFinished) {
      const quizResult = { score, totalQuestions };
      console.log("🔥 Saving quiz attempt:", quizResult); // Debug Log
      saveQuizAttempt(quizResult)
        .then(() => console.log("✅ Quiz saved successfully!"))
        .catch((error) => console.error("❌ Error saving quiz:", error));
    }
  }, [quizFinished]);

  // Move to the next question
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setQuizFinished(true);
      navigate("/result", { state: { score, total: questions.length } });
    }
  };

  // Handle answer selection for multiple-choice questions
  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
    if (questions[currentQuestion]?.correct === answer) {
      setAnswerStatus("correct");
      setScore((prev) => prev + 1);
    } else {
      setAnswerStatus("wrong");
    }
    setTimeout(nextQuestion, 1000);
  };

  // Handle integer-based answer submission
  const handleIntegerAnswer = () => {
    if (!inputValue.trim()) return; // Prevents empty submission

    const correctAnswer = String(questions[currentQuestion]?.correct).trim();
    const userAnswer = String(inputValue).trim();

    if (userAnswer === correctAnswer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(nextQuestion, 1000);
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-xl">Loading Questions...</div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">
          {questions.length > 0
            ? `Q${questions[currentQuestion].id}: ${questions[currentQuestion].question}`
            : "No questions available"}
        </h2>

        {questions[currentQuestion]?.options ? (
          <div className="grid gap-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelection(option)}
                className={`px-4 py-2 rounded-lg transition-all hover:cursor-pointer ${
                  selectedAnswer === option
                    ? answerStatus === "correct"
                      ? "bg-green-600 text-white"
                      : "bg-red-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-black"
                }`}
                disabled={selectedAnswer !== null}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-4">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-center"
              placeholder="Enter your answer"
            />
            <button
              onClick={handleIntegerAnswer}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition hover:cursor-pointer"
            >
              Submit
            </button>
          </div>
        )}

        <div className="mt-4">
          <p className="text-gray-700">Time Remaining: {timer} secs</p>
          <div className="w-full bg-gray-200 h-2 rounded-md mt-1">
            <div
              className="h-2 bg-red-500 rounded-md transition-all duration-500"
              style={{ width: `${(timer / 30) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
