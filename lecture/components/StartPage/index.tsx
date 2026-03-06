"use client";

import * as m from "motion/react-m";

export default function StartPage({ onStart }: { onStart: () => void }) {
  return (
    <m.div className="text-center">
      <m.h1
        className="mb-8 text-4xl font-bold"
        initial={{ fontSize: 0 }}
        animate={{ fontSize: 36 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        MBTI 테스트
      </m.h1>
      <m.button
        onClick={onStart}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{
          scale: 1.1,
        }}
        className="rounded-lg bg-blue-500 px-6 py-3 text-lg text-white"
      >
        시작하기
      </m.button>
    </m.div>
  );
}
