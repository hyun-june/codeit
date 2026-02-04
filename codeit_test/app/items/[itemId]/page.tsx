"use client";
import Button from "@/components/Button";
import {
  useDeleteItem,
  useGetDetailItem,
  useUpdateItem,
} from "@/hooks/useItem";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const router = useRouter();
  const params = useParams();
  const itemId = Number(params.itemId);
  const { data } = useGetDetailItem(itemId);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editInput, setEditInput] = useState<string>("");
  const [memo, setMemo] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [editIsCompleted, setEditIsCompleted] = useState<boolean>();

  const { mutate: deleteItem } = useDeleteItem();
  const { mutate: updateItem } = useUpdateItem();

  useEffect(() => {
    if (data) {
      setEditInput(data?.name);
      setMemo(data?.memo);
      setEditIsCompleted(data?.isCompleted);
    }
  }, [data]);

  const testSrc =
    "https://img.freepik.com/free-photo/still-life-daisy-flowers_23-2150321434.jpg?semt=ais_hybrid&w=740&q=80";

  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleDelete = () => {
    deleteItem(itemId, {
      onSuccess: () => {
        router.push("/");
      },
    });
  };

  const handleCompleted = () => {
    setEditIsCompleted((prev) => !prev);
  };

  const handleUpdate = () => {
    updateItem(
      {
        itemId,
        payload: {
          name: editInput,
          memo,
          imageUrl,
          isCompleted: editIsCompleted,
        },
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      },
    );
  };

  return (
    <div className="max-w-250 mx-auto">
      <section className="h-16 px-2 flex justify-center items-center gap-4 border-2 border-slate-900 rounded-[27px]">
        <Image
          src={
            editIsCompleted ? "/icons/checktodo.png" : "/icons/checkdone.png"
          }
          alt="checklist"
          width={32}
          height={32}
          className={isEditing ? "cursor-pointer" : ""}
          onClick={() => {
            if (isEditing) handleCompleted();
          }}
        />
        {isEditing ? (
          <input
            className=" border-b focus:outline-none"
            value={editInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEditInput(e.target.value)
            }
          />
        ) : (
          <span className="underline">{data?.name}</span>
        )}
      </section>
      <section className="my-5 flex gap-5">
        <article
          className={`flex-1 border  border-slate-300 ${isEditing ? "border-dashed  bg-slate-50" : "border-0"} rounded-3xl flex justify-center items-center relative overflow-hidden`}
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
            {isEditing ? (
              <textarea
                className="mx-4 mt-16 w-full resize-none flex text-center justify-center h-[229px] scrollbar-custom focus:outline-none px-4"
                value={memo}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setMemo(e.target.value)
                }
              />
            ) : (
              <p className="mx-4 mt-8 flex flex-1 items-center max-h-[229px] scrollbar-custom px-4">
                {data?.memo ? data.memo : ""}
              </p>
            )}
          </div>
        </article>
      </section>
      <section className="flex gap-4 justify-end">
        <Button
          type={isEditing ? "editing" : "edit-active"}
          onClick={isEditing ? handleUpdate : () => handleEdit()}
        />
        <Button type="delete" onClick={() => handleDelete()} />
      </section>
    </div>
  );
};

export default page;
