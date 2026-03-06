// fetchMock.test.js
const { fetchUserData } = require("./fetchMock");

test("사용자가 데이터를 성공적으로 가져오는 경우 모킹", async () => {
  const mockUserData = { id: 1, name: "철수", email: "abc@naver.com" };
  // 1. fetch API 모킹하기
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(mockUserData),
  });

  // 2. fetchUserData 호출
  const userData = await fetchUserData(1);

  // 3. 결과 검증하기
  expect(userData).toEqual(mockUserData);
});

test("네트워크 오류 발생 시 에러 처리", async () => {
  // 1. fetch가 거부된 Promise를 반환하도록 모킹
  global.fetch = jest.fn().mockRejectedValue(new Error("Network Error"));
  // 2. 최소 1개의 assertion이 필요
  expect.assertions(1);
  // 3. fetchUserData 호출 및 에러 검증
  try {
    await fetchUserData(1);
  } catch (error) {
    // 4. 에러 메시지 검증
    expect(error.message).toBe("Network Error");
  }
});

test("Promise 체이닝 방식으로 변경", () => {
  const mockUserData = { id: 1, name: "철수", email: "abc@naver.com" };
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(mockUserData),
  });
  return fetchUserData(1).then((result) => {
    expect(result).toEqual({
      id: 1,
      name: "철수",
      email: "abc@naver.com",
    });
  });
});

test("Promise 체이닝 방식으로 변경1", () => {
  const mockUserData = { id: 1, name: "철수", email: "abc@naver.com" };
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(mockUserData),
  });

  return expect(fetchUserData(1)).resolves.toEqual(mockUserData);
});

test("Promise 체이닝 네트워크 오류 발생 시 에러 처리", () => {
  global.fetch = jest.fn().mockRejectedValue(new Error("Network Error"));
  return fetchUserData(1).catch((error) => {
    expect(error.message).toBe("Network Error");
  });
});

test("Promise 체이닝 네트워크 오류 발생 시 에러 처리2", () => {
  global.fetch = jest.fn().mockRejectedValue(new Error("Network Error"));
  return expect(fetchUserData(1)).rejects.toThrow("Network Error");
});
