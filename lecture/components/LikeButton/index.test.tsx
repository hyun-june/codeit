import { fireEvent, render, screen } from "@testing-library/react";
import { LikeButton } from ".";

test("좋아요 버튼을 누르기 전에는 버튼에 좋아요가 표시되어야 하며, bg-gray-400 클래스가 적용되어야한다", () => {
  render(<LikeButton />);

  const likeBtn = screen.getByRole("button", { name: "좋아요" });
  expect(likeBtn).toBeInTheDocument();
  expect(likeBtn).toHaveClass("bg-gray-400");
});

test("좋아요 버튼을 클릭하면 좋아요 취소로 텍스트가 변경되고, bg-red-400 클래스가 적용된다", () => {
  render(<LikeButton />);
  const likeBtn = screen.getByRole("button", { name: "좋아요" });
  fireEvent.click(likeBtn);

  expect(likeBtn.textContent).toBe("좋아요 취소");
  expect(likeBtn).toHaveClass("bg-red-400");
});

test("좋아요 버튼을 한 번 클릭 후 다시 클릭하면 좋아요 버튼으로 되돌아와야 한다", () => {
  render(<LikeButton />);
  const likeBtn = screen.getByRole("button", { name: "좋아요" });
  fireEvent.click(likeBtn);
  expect(likeBtn.textContent).toBe("좋아요 취소");
  fireEvent.click(likeBtn);
  expect(likeBtn.textContent).toBe("좋아요");
});
