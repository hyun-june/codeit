"use client";
import Button from "@/components/Button";
import Image from "next/image";
import { useState } from "react";

const page = () => {
  const [isEditing, setIsEditing] = useState(false);

  const testSrc =
    "https://img.freepik.com/free-photo/still-life-daisy-flowers_23-2150321434.jpg?semt=ais_hybrid&w=740&q=80";

  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div className="max-w-250 mx-auto">
      <section className="h-16 px-2 flex justify-center items-center gap-4 border-2 border-slate-900 rounded-[27px]">
        <Image
          src={isEditing ? "/icons/checktodo.png" : "/icons/checkdone.png"}
          alt="checklist"
          width={32}
          height={32}
        />
        <span className="underline">비타민 챙겨 먹기</span>
      </section>
      <section className="my-5 flex gap-5">
        <article
          className={`flex-1 border border-slate-300 ${isEditing ? "border-dashed" : "border-0"} rounded-3xl flex justify-center items-center relative overflow-hidden`}
        >
          <img
            src={isEditing ? "/images/img.png" : testSrc}
            alt="img"
            className={`${isEditing ? "" : "w-full h-full object-cover"}`}
          />
          <Button
            type={isEditing ? "detail-plus" : "detail-edit"}
            circle
            className={`${isEditing ? "border-none" : "!border-2"} absolute bottom-4 right-4`}
          />
        </article>
        <article className="relative w-147 h-77.75">
          <Image
            src="/images/memo.png"
            alt="memo"
            fill
            className="rounded-3xl"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <h4 className="absolute top-8 text-amber-800 font-extrabold">
              MEMO
            </h4>
            <p className="mx-4 mt-8 flex flex-1 items-center max-h-[229px] scrollbar-custom">
              내용이 최대로 늘어날 때 다음과 같이 보이며 내부 스크롤이 내용이
            </p>
          </div>
        </article>
      </section>
      <section className="flex gap-4 justify-end">
        <Button
          type={isEditing ? "editing" : "edit-active"}
          onClick={() => handleEdit()}
        />
        <Button type="delete" />
      </section>
    </div>
  );
};

export default page;
