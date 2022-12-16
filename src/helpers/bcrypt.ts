import { compare, hash } from 'bcrypt';

export const hashPassword = async (password: string) => {
  const salt = 12;
  return await hash(password, salt);
};

export const comparePassword = async (
  password: string,
  passwordToConfirm: string,
) => {
  return await compare(password, passwordToConfirm);
};
