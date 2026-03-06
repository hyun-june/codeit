import { useCounter } from "@/hooks/useCounter";
import { act, renderHook } from "@testing-library/react";

describe("useCounter 테스트", () => {
  test("useCounter 훅의 파라미터 값이 초기값으로 잘 세팅되는지 확인", () => {
    const { result } = renderHook(() => useCounter(3));
    expect(result.current.count).toBe(3);
  });

  test("userCounter 훅의 increment 함수가 1씩 잘 증가 시키는지 확인", () => {
    const { result } = renderHook(() => useCounter(3));
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(4);
  });
  test("userCounter 훅의 decrement 함수가 1씩 잘 감소 시키는지 확인", () => {
    const { result } = renderHook(() => useCounter(5));
    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(4);
  });
  test("userCounter 훅의 reset 함수가 초기값으로 재설정 시키는지 확인", () => {
    const { result } = renderHook(() => useCounter(2));
    act(() => {
      result.current.reset();
    });
    expect(result.current.count).toBe(2);
  });
});
