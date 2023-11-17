import { hash, compare } from 'bcryptjs';

// 비밀번호 해싱 함수
export const hashPassword = async password => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};

// 비밀번호 일치 확인 함수
export const verifyPassword = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};
