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

/**
 * 메인 페이지
 * - 아이템 생성
 * - 아이템 목록 조회
 * - TODO / DONE 리스트 분리 렌더링
 */
export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const { mutate: createItem } = useCreateItem();
  const { data } = useGetItemList();
  /** 완료 여부에 따라 TODO / DONE 리스트 분리 */
  const todoList = data?.filter((item: ItemList) => !item.isCompleted) || [];
  const doneList = data?.filter((item: ItemList) => item.isCompleted) || [];

  /** 아이템 생성 핸들러 */
  const handleCreateLIst = () => {
    if (!inputValue.trim()) return;
    createItem({ name: inputValue });
    setInputValue("");
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  /**
   * 체크리스트 렌더링 함수
   * - 리스트가 있을 경우 CheckList 렌더링
   * - 비어 있을 경우 EmptyCheckList 렌더링
   */
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
      <section className="flex gap-3 md:gap-5 py-8">
        <input
          type="text"
          value={inputValue}
          onChange={handleInput}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              handleCreateLIst();
            }
          }}
          className="h-14 max-w-250 w-full rounded-3xl border-t-2 border-r-4 border-b-4 border-l-2 border-slate-900 px-2 py-4 pl-5"
        />
        <Button
          onClick={handleCreateLIst}
          type={todoList?.length === 0 ? "empty-add" : "add"}
        />
      </section>
      <section className="my-10 grid grid-rows-2 gap-5 lg:grid-cols-2">
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
