// src/hooks/useInputs.test.ts

import { act, renderHook } from "@testing-library/react";
import { useInputs } from "./useInputs";

describe("useInputs 테스트", () => {
  test("초기값이 올바르게 설정되는지 확인", () => {
    const { result } = renderHook(() => useInputs({ name: "", nickname: "" }));
    expect(result.current.values).toEqual({ name: "", nickname: "" });
  });

  test("handleChange 함수가 값을 올바르게 업데이트하는지 확인", () => {
    const { result } = renderHook(() => useInputs({ name: "", nickname: "" }));

    const event = {
      target: {
        name: "email",
        value: "이메일 테스트",
      },
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleChange(event);
    });

    expect(result.current.values.email).toBe("이메일 테스트");
  });

  test("handleDelete 함수가 값을 올바르게 삭제하는지 확인", () => {
    const { result } = renderHook(() =>
      useInputs({ name: "뭐", nickname: "어쩌구" }),
    );

    act(() => {
      result.current.handleDelete("name");
    });
    expect(result.current.values.name).toBe("");
    expect(result.current.values.nickname).toBe("어쩌구");
  });
});
