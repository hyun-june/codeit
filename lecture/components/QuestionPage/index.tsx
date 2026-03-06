"use client";

import * as m from "motion/react-m";

interface QuestionPageProps {
  question: {
    question: string;
    options: string[];
  };
  onAnswer: (answer: string) => void;
}

export default function QuestionPage({
  question,
  onAnswer,
}: QuestionPageProps) {
  return (
    <div className="w-full max-w-2xl px-4">
      <m.h2
        className="mb-8 text-center text-2xl font-bold"
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {question.question}
      </m.h2>
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <m.button
            key={index}
            onClick={() => onAnswer(option)}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index / 4 }}
            whileHover={{
              boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
              scale: 1.05,
            }}
            className="w-full rounded-lg bg-white p-4 text-left shadow"
          >
            {option}
          </m.button>
        ))}
      </div>
    </div>
  );
}
