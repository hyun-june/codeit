import { fireEvent, render, screen } from "@testing-library/react";
import { LoginForm } from ".";

test("로그인 폼의 이메일과 비밀번호 미입력 시 로그인 버튼 비활성화되는지 확인", () => {
  render(<LoginForm />);

  const loginButton = screen.getByRole("button", { name: "로그인" });
  const emailInput = screen.getByLabelText("이메일");
  const passwordInput = screen.getByLabelText("비밀번호");

  // 입력 필드 값이 비어있는지 확인
  expect(emailInput).toHaveValue("");
  expect(passwordInput).toHaveValue("");

  // 로그인 버튼이 비활성화되어 있는지 확인
  expect(loginButton).toBeDisabled();
});

test("이메일, 비밀번호 입력 시 로그인 버튼 활성화되는지 확인", () => {
  render(<LoginForm />);
  const loginButton = screen.getByRole("button", { name: "로그인" });
  const emailInput = screen.getByLabelText("이메일");
  const passwordInput = screen.getByLabelText("비밀번호");

  // 이메일과 비밀번호 입력
  fireEvent.change(emailInput, { target: { value: "test" } });
  fireEvent.change(passwordInput, { target: { value: "test" } });

  // 로그인 버튼이 활성화되었는지 확인
  expect(loginButton).toBeEnabled();
});

test("이메일 잘못 입력 시 '올바른 이메일 형식이 아닙니다.'라는 에러 메시지가 표시되는지 확인", () => {
  render(<LoginForm />);
  const emailInput = screen.getByLabelText("이메일");

  fireEvent.change(emailInput, { target: { value: "test" } });

  const errorMessage = screen.getByText("올바른 이메일 형식이 아닙니다.");
  expect(errorMessage).toBeInTheDocument();
});
