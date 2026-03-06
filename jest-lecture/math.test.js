const { calculator } = require("./math");

describe("calculator 테스트", () => {
  test("calculator.add 함수 모킹 테스트", () => {
    // Arrange
    calculator.add = jest.fn();

    //  Acc
    calculator.add(10, 20);

    // Assert
    expect(calculator.add).toHaveBeenCalled();
    expect(calculator.add).toHaveBeenCalledWith(10, 20);
  });
  test("calculator.subtract 함수 모킹 테스트", () => {
    calculator.subtract = jest.fn().mockReturnValue(1);

    calculator.subtract(5, 3);

    expect(calculator.subtract).toHaveBeenCalled();
    expect(calculator.subtract(5, 3)).toBe(1);
  });

  test("calculator.multiplay 함수 모킹 테스트", () => {
    const multiplaySpy = jest.spyOn(calculator, "multiply");

    multiplaySpy(2, 3);

    expect(multiplaySpy).toHaveBeenCalled();
    expect(multiplaySpy(2, 3)).toBe(6);
  });
});
