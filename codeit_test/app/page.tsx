"use client";
import Button from "@/components/Button";
import CheckList from "@/components/CheckList";
import EmptyCheckList from "@/components/EmptyCheckList";
import { useCreateItem, useGetItemList } from "@/hooks/useItem";
import Image from "next/image";
import { useState } from "react";

interface ItemList {
  id: number;
  tenantId: string;
  name: string;
  memo?: string;
  imageUrl?: string;
  isCompleted: boolean;
}

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const { mutate: createItem } = useCreateItem();
  const { data } = useGetItemList();

  const todoList = data?.filter((item: ItemList) => !item.isCompleted) || [];
  const doneList = data?.filter((item: ItemList) => item.isCompleted) || [];

  const handleCreateLIst = () => {
    if (!inputValue.trim()) return;
    createItem({ name: inputValue });
    setInputValue("");
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const renderCheckList = (list: ItemList[], type: "todo" | "done") => {
    return list.length > 0 ? (
      list.map((item) => (
        <CheckList
          isCompleted={item.isCompleted}
          name={item.name}
          key={item.id}
          id={item.id}
        />
      ))
    ) : (
      <EmptyCheckList type={type} />
    );
  };

  return (
    <div>
      <section className="flex gap-5">
        <input
          type="text"
          value={inputValue}
          onChange={handleInput}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              handleCreateLIst();
            }
          }}
          className="h-14 w-250 rounded-3xl border-t-2 border-r-4 border-b-4 border-l-2 border-slate-900 px-2 py-4 pl-5"
        />
        <Button
          onClick={handleCreateLIst}
          type={todoList?.length === 0 ? "empty-add" : "add"}
        />
      </section>
      <section className="my-10 grid grid-cols-2 gap-5">
        <article className="flex flex-col gap-4">
          <Image src="/images/todo.png" alt="todo" width={101} height={36} />
          <div className="flex flex-col gap-4">
            {renderCheckList(todoList, "todo")}
          </div>
        </article>
        <article className="flex flex-col gap-4">
          <Image src="/images/done.png" alt="done" width={101} height={36} />
          <div className="flex flex-col gap-4">
            {renderCheckList(doneList, "done")}
          </div>
        </article>
      </section>
    </div>
  );
}
