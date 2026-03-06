import * as m from "motion/react-m";

export default function ResultPage({ answers }: { answers: string[] }) {
  return (
    <m.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="text-center"
    >
      <m.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-6 text-3xl font-bold"
      >
        테스트 결과
      </m.h2>
      <m.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="rounded-lg bg-white p-6 shadow-lg"
      >
        {answers.map((answer, index) => (
          <m.p
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 + index * 0.2 }}
            className="mb-2"
          >
            질문 {index + 1}: {answer}
          </m.p>
        ))}
      </m.div>
    </m.div>
  );
}
