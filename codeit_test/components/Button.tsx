"use client";

import Image from "next/image";
import { FaPlus, FaCheck, FaXmark } from "react-icons/fa6";

interface ButtonProps {
  type:
    | "add"
    | "empty-add"
    | "delete"
    | "editing"
    | "edit-active"
    | "detail-plus"
    | "detail-edit";
  onClick?: () => void;
  circle?: boolean;
  className?: string;
}

const ICONS = {
  FaPlus,
  FaCheck,
  FaXmark,
} as const;

interface ButtonStyleInfo {
  bg: string;
  text: string;
  label?: string;
  icon?: keyof typeof ICONS;
  image?: string;
}

const ButtonStyles = {
  add: {
    bg: "bg-slate-200",
    text: "text-slate-900",
    label: "추가하기",
    icon: "FaPlus",
  },
  "empty-add": {
    bg: "bg-violet-600",
    text: "text-white",
    label: "추가하기",
    icon: "FaPlus",
  },
  delete: {
    bg: "bg-rose-500",
    text: "text-white",
    label: "삭제하기",
    icon: "FaXmark",
  },
  editing: {
    bg: "bg-slate-200",
    text: "text-slate-900",
    label: "수정 완료",
    icon: "FaCheck",
  },
  "edit-active": {
    bg: "bg-lime-300",
    text: "text-slate-900 ",
    label: "수정 완료",
    icon: "FaCheck",
  },
  "detail-plus": {
    bg: "bg-slate-200",
    text: "text-slate-500",
    icon: "FaPlus",
  },
  "detail-edit": {
    bg: "bg-[#0F172A80]",
    text: "text-white",
    image: "/icons/edit.png",
  },
} satisfies Record<ButtonProps["type"], ButtonStyleInfo>;

const Button = ({ ...props }: ButtonProps) => {
  const { type, onClick, className, circle } = props;
  const styles: ButtonStyleInfo = ButtonStyles[type];
  const IconComponent = styles.icon ? ICONS[styles.icon] : null;
  return (
    <button
      onClick={onClick}
      className={` ${circle ? "w-12 h-12 rounded-full" : "w-42 rounded-3xl px-4 py-2"} 
      ${styles.bg} ${styles.text} flex gap-1 items-center justify-center 
     border-t-2 border-l-2 border-b-4 border-r-4 border-slate-900 font-bold cursor-pointer ${className ?? ""}`}
    >
      {IconComponent && <IconComponent size={circle ? 20 : 16} />}

      {!IconComponent && styles.image && (
        <Image
          src={styles.image}
          alt={styles.label ?? "button"}
          className={circle ? "w-6 h-6" : "w-4 h-4"}
          width={circle ? 24 : 16}
          height={circle ? 24 : 16}
        />
      )}
      {!circle && styles.label}
    </button>
  );
};

export default Button;
