import Image from "next/image";

interface EmptyCheckListProps {
  type: "todo" | "done";
}

/**
 * 체크리스트가 비어 있을 때 렌더링되는 UI 컴포넌트
 */
const EmptyCheckList = ({ type }: EmptyCheckListProps) => {
  const isDone = type === "done";

  return (
    <div className=" flex flex-col gap-4 items-center">
      <div className="w-60 h-60">
        <Image
          src={`/images/${isDone ? "doneLarge.png" : "todoLarge.png"}`}
          alt="doneEmpty"
          width={240}
          height={240}
        />
      </div>

      <p className="text-center text-slate-400 font-bold">
        {isDone ? (
          <>
            아직 다 한 일이 없어요. <br />
            해야 할 일을 체크해 보세요!
          </>
        ) : (
          <>
            할 일이 없어요. <br />
            TODO를 새롭게 추가해주세요!
          </>
        )}
      </p>
    </div>
  );
};

export default EmptyCheckList;
