"use client";
import { useUpdateItem } from "@/hooks/useItem";
import Image from "next/image";
import Link from "next/link";

interface CheckListProps {
  type: "todo" | "done";
  name: string;
  id: number;
}

const CheckList = ({ type, name, id }: CheckListProps) => {
  const isDone = type === "done";

  const { mutate: updateItem } = useUpdateItem();

  const handleComplete = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    updateItem({
      itemId: id,
      payload: {
        isCompleted: !isDone,
      },
    });
  };

  return (
    <Link href={`/items/${id}`}>
      <div
        className={`w-147 h-12.5 px-2 flex items-center gap-4 border-2 border-slate-900 rounded-[27px] ${isDone ? "bg-violet-100" : ""}`}
      >
        <Image
          src={isDone ? "/icons/checkdone.png" : "/icons/checktodo.png"}
          alt="checklist"
          width={32}
          height={32}
          onClick={handleComplete}
        />
        <span className={isDone ? "line-through" : ""}>{name}</span>
      </div>
    </Link>
  );
};
export default CheckList;
