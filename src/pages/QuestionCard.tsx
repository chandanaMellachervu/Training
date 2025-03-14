import React, { useState, useEffect } from "react";
// import axios from "axios";

// Question ka type define kiya
interface Question {
  _id: string;
  question: string;
  topic: string;
}

const QuestionCard: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]); // Type define kiya

  // useEffect(() => {
  //   axios.get<Question[]>("/api/questions").then((res) => {
  //     setQuestions(res.data);
  //   });
  // }, []);

  return (
    <div className="bg-white shadow-md p-6 rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Questions</h2>
      <ul>
        {questions.map((q) => (
          <li key={q._id} className="border-b py-2">
            {q.question} - {q.topic}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionCard;
