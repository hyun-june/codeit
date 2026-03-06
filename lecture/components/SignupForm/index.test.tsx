import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignupForm } from ".";

// test("회원가입 폼 테스트", () => {
//   render(<SignupForm />);

//   const emailLabel = screen.getByLabelText("이메일");
//   expect(emailLabel).toBeInTheDocument();

//   const passwordLabel = screen.getByLabelText("비밀번호");
//   expect(passwordLabel).toBeInTheDocument();

//   const checkPasswordLabel = screen.getByLabelText("비밀번호 확인");
//   expect(checkPasswordLabel).toBeInTheDocument();

//   const passwordType = screen.getByPlaceholderText("비밀번호");
//   expect(passwordType).toHaveAttribute("type", "password");

//   const checkpasswordType = screen.getByPlaceholderText("비밀번호 확인");
//   expect(checkpasswordType).toHaveAttribute("type", "password");

//   const button = screen.getByRole("button", { name: "회원가입" });
//   expect(button).toBeInTheDocument();
// });

test("이메일, 비밀번호, 비밀번호 확인 입력 후 제출 이벤트 테스트", async () => {
  render(<SignupForm />);
  const user = userEvent.setup();

  const emailInput = screen.getByLabelText("이메일");
  await user.type(emailInput, "test@example.com");
  expect(emailInput).toHaveFocus();

  await user.tab();

  const passwordInput = screen.getByLabelText("비밀번호");

  expect(passwordInput).toHaveFocus();
});
