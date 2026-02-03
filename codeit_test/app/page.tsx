"use client";
import Button from "@/components/Button";
import Image from "next/image";

export default function Home() {
  const test = () => {
    console.log("dd");
  };
  return (
    <div>
      <section className="flex gap-5">
        <input
          type="text"
          className="w-250 h-14 px-2 py-4 border-t-2 border-l-2 border-b-4 border-r-4 border-slate-900 rounded-3xl"
        />
        <Button onClick={test} />
      </section>
      <section className="my-10 grid grid-cols-2 gap-5">
        <article className="flex flex-col gap-4">
          <Image src="/images/todo.png" alt="todo" width={101} height={36} />
          <div className="flex flex-col gap-4">
            <div className="w-147 h-12.5 px-2 flex items-center gap-4 border-2 border-slate-900 rounded-[27px]">
              <Image
                src="/icons/checkcircle.png"
                alt="check"
                width={32}
                height={32}
              />
              비 타민 챙겨먹기
            </div>
            <div className="w-147 h-12.5 px-2 flex items-center gap-4 border-2 border-slate-900 rounded-[27px]">
              <Image
                src="/icons/checkcircle.png"
                alt="check"
                width={32}
                height={32}
              />
              비 타민 챙겨먹기
            </div>
          </div>
        </article>
        <article>
          <Image src="/images/done.png" alt="done" width={101} height={36} />
        </article>
      </section>
    </div>
  );
}
