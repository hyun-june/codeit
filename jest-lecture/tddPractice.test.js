const { calculatePrice } = require("./tddPractice.js");

describe("calculatePrice 함수 테스트", () => {
  describe("상품 가격에 따른 금액 할인", () => {
    test("5만원 이상 5% 할인", () => {
      const price = 50000;

      const result = calculatePrice({ price });

      expect(result).toBe(47500);
    });

    test("10만원 이상 10%할인", () => {
      const price = 100000;

      const result = calculatePrice({ price });

      expect(result).toBe(90000);
    });

    test("20만원 이상 20%할인", () => {
      const price = 200000;

      const result = calculatePrice({ price });

      expect(result).toBe(160000);
    });
  });

  describe("회원 등급에 따른 추가 할인", () => {
    test("일반 회원은 추가 할인 없음", () => {
      const price = 50000;

      const result = calculatePrice({ price });

      expect(result).toBe(47500);
    });

    test("실버 회원은 추가 2% 할인", () => {
      const price = 50000;
      const userType = "silver";

      const result = calculatePrice({ price, userType });

      expect(result).toBe(46550);
    });
    test("골드 회원은 추가 5% 할인", () => {
      const price = 40000;
      const userType = "gold";

      const result = calculatePrice({ price, userType });

      expect(result).toBe(38000);
    });
  });

  describe("쿠폰 할인", () => {
    test("정액 쿠폰은 고정 금액 할인", () => {
      const price = 10000;
      const coupon = { type: "fixed", value: 3000 };

      const result = calculatePrice({ price, coupon });

      expect(result).toBe(7000);
    });

    test("비율 쿠폰은 일정 비율이 할인된다", () => {
      const price = 10000;
      const coupon = { type: "per", value: 10 };

      const result = calculatePrice({ price, coupon });

      expect(result).toBe(9000);
    });
  });

  describe("쿠폰 적용 순서 확인", () => {
    test("price 50000원 , userType = vip, coupon은 10퍼 일때", () => {
      const price = 50000;
      const userType = "vip";
      const coupon = { type: "per", value: 10 };

      const result = calculatePrice({ price, userType, coupon });

      expect(result).toBe(38475);
    });
  });
  test("최종 가격이 원래 가격의 50% 이하인 경우 에러 발생", () => {
    const price = 10000;
    const userType = "silver";
    const coupon = { type: "fixed", value: 5000 };

    const result = calculatePrice({ price, userType, coupon });

    expect(result).toBe(5000);
  });
});
