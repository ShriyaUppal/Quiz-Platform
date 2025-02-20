import React from "react";
import { Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import Quiz from "./components/Quiz";
import "./App.css";
import Result from "./components/Result";
import QuizHistory from "./components/QuizHistory";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/result" element={<Result />} />
      <Route path="/quiz-history" element={<QuizHistory />} />
    </Routes>
  );
};

export default App;
