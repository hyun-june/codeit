import { render, screen } from "@testing-library/react";
import ProductItem from "./index";

describe("ProductItem 컴포넌트 렌더링 테스트", () => {
  beforeEach(() => {
    render(
      <ProductItem title="현재 상품 타이틀" description="현재 상품 내용" />,
    );
  });
  test("현재 상품의 title과 description에 입력한 내용이 제대로 렌더링이 되는지 확인하기", () => {
    const title = screen.getByText("현재 상품 타이틀");
    const description = screen.getByText("현재 상품 내용");
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  test("증가 버튼과 감소 버튼, 초기 숫자인 1이 존재하는지 확인하기", () => {
    const increaseButton = screen.getByRole("button", { name: "+" });
    expect(increaseButton).toBeInTheDocument();
    const decreaseButton = screen.getByRole("button", { name: "-" });
    expect(decreaseButton).toBeInTheDocument();
    const quantityText = screen.getByText("1");
    expect(quantityText).toBeInTheDocument();
  });

  test("구매하기 버튼이 존재하는지 확인하기", () => {
    const submitButton = screen.getByRole("button", { name: "구매하기" });
    expect(submitButton).toBeInTheDocument();
  });
});

describe("ProductItem 품절 테스트", () => {
  beforeEach(() => {
    render(
      <ProductItem
        title="품절 상품 타이틀"
        description="품절 상품 내용"
        isSoldOut={true}
      />,
    );
  });
  test("상품이 품절 상태(isSoldOut = {true})일 때 품절 텍스트가 렌더링 되는지 확인하기", () => {
    const soldOutText = screen.getByText("품절");
    expect(soldOutText).toBeInTheDocument();
  });

  test("상품이 품절 상태(isSoldOut = {true})일 때 버튼이 비활성화(disabled)되고, CSS 클래스명에 opacity-50과 cursor-not-allowed가 포함되는지 확인하기", () => {
    const submitButton = screen.getByRole("button", { name: "구매하기" });
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveClass("opacity-50");
    expect(submitButton).toHaveClass("cursor-not-allowed");
  });
});
