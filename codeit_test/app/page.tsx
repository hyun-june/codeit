"use client";
import Button from "@/components/Button";
import CheckList from "@/components/CheckList";
import EmptyCheckList from "@/components/EmptyCheckList";
import Image from "next/image";

const testCheckTodo = ["비타민", "비타민2"];
const testCheckDone = ["비타민 완료", "비타민 완료2"];

export default function Home() {
  const test = () => {
    console.log("dd");
  };

  const renderCheckList = (list: string[], type: "todo" | "done") =>
    list.length > 0 ? (
      list.map((item, i) => (
        <CheckList type={type} label={item} key={i} id={i} />
      ))
    ) : (
      <EmptyCheckList type={type} />
    );

  return (
    <div>
      <section className="flex gap-5">
        <input
          type="text"
          className="h-14 w-250 rounded-3xl border-t-2 border-r-4 border-b-4 border-l-2 border-slate-900 px-2 py-4"
        />
        <Button
          onClick={test}
          type={testCheckTodo.length === 0 ? "empty-add" : "add"}
        />
      </section>
      <section className="my-10 grid grid-cols-2 gap-5">
        <article className="flex flex-col gap-4">
          <Image src="/images/todo.png" alt="todo" width={101} height={36} />
          <div className="flex flex-col gap-4">
            {renderCheckList(testCheckTodo, "todo")}
          </div>
        </article>
        <article className="flex flex-col gap-4">
          <Image src="/images/done.png" alt="done" width={101} height={36} />
          <div className="flex flex-col gap-4">
            {renderCheckList(testCheckDone, "done")}
          </div>
        </article>
      </section>
    </div>
  );
}
