"use client";
import { useUpdateItem } from "@/hooks/useItem";
import Image from "next/image";
import Link from "next/link";

interface CheckListProps {
  name: string;
  id: number;
  isCompleted: boolean;
}
/**
 * 체크리스트 아이템을 렌더링하는 공용 컴포넌트
 * 완료 여부에 따라 UI 상태가 변경된다.
 * isCompleted: 완료 여부 (체크 상태)
 * name: 체크리스트 항목 이름
 * id: 체크리스트 아이템 고유 id
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
    <Link href={`/items/${id}`} className="w-full">
      <div
        className={`w-full h-12.5 px-2 flex items-center gap-4 border-2 border-slate-900 rounded-[27px] ${isCompleted ? "bg-violet-100" : ""}`}
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
