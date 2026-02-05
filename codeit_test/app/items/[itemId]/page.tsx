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
import { useEffect, useRef, useState } from "react";

/**
 * 아이템 상세 페이지
 * - 아이템 정보 조회
 * - 수정 모드 전환
 * - 아이템 이름 / 메모 수정
 * - 완료 상태 변경
 * - 이미지 업로드 및 미리보기
 * - 아이템 수정 및 삭제
 */
const page = () => {
  const router = useRouter();
  const params = useParams();
  const itemId = Number(params.itemId);
  const { data } = useGetDetailItem(itemId);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /** 수정 중인지 여부를 나타내는 상태 */
  const [isEditing, setIsEditing] = useState<boolean>(false);

  /** 아이템 name 수정용 입력값 상태 */
  const [editInput, setEditInput] = useState<string>("");

  /** 아이템 memo 수정용 입력값 상태 */
  const [memo, setMemo] = useState<string>("");

  /** 업로드된 이미지 파일명 */
  const [imageUrl, setImageUrl] = useState<string>("");

  /** 업로드 이미지 미리보기 URL */
  const [previewImg, setPreviewImg] = useState<string>("");

  /** 아이템 완료 상태 수정값 */
  const [editIsCompleted, setEditIsCompleted] = useState<boolean>();

  /** 아이템 삭제 mutation */
  const { mutate: deleteItem } = useDeleteItem();

  /** 아이템 수정 mutation */
  const { mutate: updateItem } = useUpdateItem();

  /**
   * 조회한 아이템 데이터를 수정용 상태로 초기화
   */
  useEffect(() => {
    if (data) {
      setEditInput(data?.name);
      setMemo(data?.memo);
      setEditIsCompleted(data?.isCompleted);
    }
  }, [data]);

  /** 수정 모드 토글 */
  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  /** 아이템 삭제 처리 */
  const handleDelete = () => {
    deleteItem(itemId, {
      onSuccess: () => {
        router.push("/");
      },
    });
  };

  /**
   * 이미지 파일 업로드 처리
   * - 파일 크기 제한 (5MB)
   * - 파일명 영문 제한
   * - 미리보기 URL 생성
   */

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("파일 크기는 5MB 이하만 가능합니다.");
      setPreviewImg("");
      setImageUrl("");
      return;
    }
    const fileName = file.name.split(".")[0];
    const isEnglish = /^[a-zA-Z]*$/.test(fileName);
    if (!isEnglish) {
      alert("파일 이름은 영어만 가능합니다.");
      setPreviewImg("");
      setImageUrl("");
      return;
    }
    const previewImgUrl = URL.createObjectURL(file);

    setPreviewImg(previewImgUrl);
    setImageUrl(file.name);
  };

  /** 완료 상태 토글 (수정 모드에서만 가능) */
  const handleCompleted = () => {
    setEditIsCompleted((prev) => !prev);
  };

  /** 아이템 수정 처리 */
  const handleUpdate = () => {
    updateItem(
      {
        itemId,
        payload: {
          name: editInput,
          memo: memo || "",
          imageUrl: imageUrl,
          isCompleted: editIsCompleted,
        },
      },
      {
        onSuccess: () => {
          setIsEditing(false);
          router.push("/");
        },
      },
    );
  };

  return (
    <div className=" bg-white flex-1 py-8 px-8">
      <section className="h-16 px-2 flex justify-center items-center gap-4 border-2 border-slate-900 rounded-[27px]">
        <Image
          src={
            editIsCompleted ? "/icons/checkdone.png" : "/icons/checktodo.png"
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
      <section className="my-5 flex flex-col gap-5 lg:flex-row">
        <article
          className={`border h-77.75 lg:flex-1 border-slate-300 ${isEditing ? "border-dashed" : "border"} 
          rounded-3xl flex justify-center items-center relative overflow-hidden`}
        >
          <img
            src={previewImg || "/images/img.png"}
            alt="img"
            className={`${previewImg ? "w-full h-full object-contain" : ""}`}
          />

          <Button
            type={isEditing ? "detail-plus" : "detail-edit"}
            circle
            className={`${isEditing ? "border-none" : "border-2!"} absolute bottom-4 right-4 w-14 h-14 rounded-full`}
            onClick={
              isEditing
                ? () => fileInputRef.current?.click()
                : () => setIsEditing(true)
            }
          />
          <input
            type="file"
            name="imgFile"
            id="imgFile"
            className="hidden"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImg}
          />
        </article>
        <article className="relative w-full lg:w-147 h-77.75">
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
                value={memo || ""}
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
      <section className="flex gap-4 justify-center lg:justify-end">
        <Button
          type={isEditing ? "editing" : "edit-active"}
          onClick={isEditing ? handleUpdate : () => handleEdit()}
          className="w-42 h-14 px-4 rounded-3xl"
        />
        <Button
          type="delete"
          onClick={() => handleDelete()}
          className="w-42 h-14 px-4 rounded-3xl"
        />
      </section>
    </div>
  );
};

export default page;
