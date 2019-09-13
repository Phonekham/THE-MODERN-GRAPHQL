import { getFirstName, isValidPassword } from "../src/utils/user";

test("Should return first name", () => {
  const firstName = getFirstName("Phonekham Keomany");
  expect(firstName).toBe("Phonekham");
});
test("Should return first name when given firsname", () => {
  const firstName = getFirstName("Toh");
  expect(firstName).toBe("Toh");
});

test("Should reject if password less than 8", () => {
  const isValid = isValidPassword("abc123");
  expect(isValid).toBe(false);
});

test("Should reject if password contain password", () => {
  const isValid = isValidPassword("abcPassword343");
  expect(isValid).toBe(false);
});

test("Should correct valid password", () => {
  const isValid = isValidPassword("abc123wewewewe");
  expect(isValid).toBe(true);
});
