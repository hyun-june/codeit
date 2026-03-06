// src/components/PasswordInput/index.tsx

"use client";

import { useState } from "react";

export const PasswordInput = () => {
  const [isShow, setIsShow] = useState(false);
  return (
    <div>
      <input
        type={isShow ? "text" : "password"}
        placeholder="비밀번호를 입력하세요."
      />
      <button onClick={() => setIsShow((prev) => !prev)}>
        {isShow ? "숨기기" : "보기"}
      </button>
    </div>
  );
};
