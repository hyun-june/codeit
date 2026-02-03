import Image from "next/image";
import Link from "next/link";

interface CheckListProps {
  type: "todo" | "done";
  label: string;
  id: number;
}

const CheckList = ({ type, label, id }: CheckListProps) => {
  const isDone = type === "done";

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
        />
        <span className={isDone ? "line-through" : ""}>{label}</span>
      </div>
    </Link>
  );
};
export default CheckList;
