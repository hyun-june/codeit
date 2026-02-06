import { api } from "@/api/api";
import { TENANT_ID } from "@/utils/constatns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface UpdateItemInput {
  itemId: number;
  payload: {
    name?: string;
    memo?: string | null;
    imageUrl?: string | null;
    isCompleted?: boolean;
  };
}

/** 아이템 목록을 조회하는 훅 */
export const useGetItemList = () => {
  return useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const res = await api.get(`/${TENANT_ID}/items`);
      return res.data;
    },
  });
};

/** 아이템 상세 정보를 조회하는 훅 */
export const useGetDetailItem = (itemId: number) => {
  return useQuery({
    queryKey: ["detail-item", itemId],
    queryFn: async () => {
      try {
        const res = await api.get(`/${TENANT_ID}/items/${itemId}`);
        return res.data;
      } catch (error) {
        console.log("세부 아이템 정보 가져오기 오류..", error);
      }
    },
    enabled: !!itemId,
  });
};

/** 아이템을 생성하는 훅 */
export const useCreateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newItem: { name: string }) =>
      api.post(`/${TENANT_ID}/items`, {
        name: newItem.name,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      console.log("아이템 생성 성공!!");
    },
    onError: (error) => console.log("아이템 생성 실패..", error),
  });
};

/** 아이템을 삭제하는 훅 */
export const useDeleteItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (itemId: number) => api.delete(`/${TENANT_ID}/items/${itemId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      console.log("아이템 삭제 성공!!");
    },
    onError: (error) => console.log("아이템 삭제 실패..", error),
  });
};

/** 아이템 정보를 수정하는 훅 */
export const useUpdateItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ itemId, payload }: UpdateItemInput) =>
      api.patch(`/${TENANT_ID}/items/${itemId}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      console.log("아이템 수정 성공!!");
    },
    onError: (error) => {
      console.log("아이템 수정 실패..", error);
    },
  });
};
