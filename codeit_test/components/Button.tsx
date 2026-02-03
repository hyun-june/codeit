"use client";

import { FaPlus } from "react-icons/fa6";

const Button = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-[168px] bg-slate-200 text-slate-900 flex gap-1 items-center justify-center border-t-2 border-l-2 border-b-4 border-r-4 border-slate-900 rounded-3xl font-bold cursor-pointer"
    >
      <FaPlus size={16} />
      추가하기
    </button>
  );
};

export default Button;
