import { api } from "@/api/api";
import { TENANT_ID } from "@/utils/constatns";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useImageUpload = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await api.post(`/${TENANT_ID}/images/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
    onError: (error) => console.log("이미지 업로드 실패", error),
  });
};
