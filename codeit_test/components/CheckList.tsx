"use client";
import { useUpdateItem } from "@/hooks/useItem";
import Image from "next/image";
import Link from "next/link";

interface CheckListProps {
  name: string;
  id: number;
  isCompleted: boolean;
}
/** 체크리스트 아이템 공용 컴포넌트
 * type으로
 *
 *
 */
const CheckList = ({ isCompleted, name, id }: CheckListProps) => {
  const { mutate: updateItem } = useUpdateItem();

  const handleComplete = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    updateItem({
      itemId: id,
      payload: {
        isCompleted: !isCompleted,
      },
    });
  };

  return (
    <Link href={`/items/${id}`}>
      <div
        className={`w-147 h-12.5 px-2 flex items-center gap-4 border-2 border-slate-900 rounded-[27px] ${isCompleted ? "bg-violet-100" : ""}`}
      >
        <Image
          src={isCompleted ? "/icons/checkdone.png" : "/icons/checktodo.png"}
          alt="checklist"
          width={32}
          height={32}
          onClick={handleComplete}
        />
        <span className={isCompleted ? "line-through" : ""}>{name}</span>
      </div>
    </Link>
  );
};
export default CheckList;
