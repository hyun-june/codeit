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

/**
 * 공용 버튼 컴포넌트
 * - type: 버튼 종류
 * - circle: 원형 여부
 * - onClick: 클릭 이벤트
 */
const Button = ({ ...props }: ButtonProps) => {
  const { type, onClick, className, circle } = props;
  const styles: ButtonStyleInfo = ButtonStyles[type];
  const IconComponent = styles.icon ? ICONS[styles.icon] : null;
  const isMobileCircle = type === "add" || type === "empty-add";

  const base =
    "shrink-0 flex items-center justify-center border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] font-bold cursor-pointer gap-1";

  const mobile = isMobileCircle && "w-14 h-14 rounded-3xl";

  const desktop = circle
    ? "md:w-12 md:h-12 md:rounded-full"
    : "md:w-42 md:h-auto md:px-4 md:py-2 md:rounded-3xl";

  return (
    <button
      onClick={onClick}
      className={`${base} ${styles.bg} ${styles.text} ${mobile} ${desktop} ${className ?? ""}`}
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
      {styles.label && (
        <span className={isMobileCircle ? "hidden md:inline" : ""}>
          {styles.label}
        </span>
      )}
    </button>
  );
};

export default Button;
