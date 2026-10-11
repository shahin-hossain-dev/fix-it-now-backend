import bcrypt from "bcryptjs";
import prisma from "../../libs/prisma";

interface UserRole {
  CUSTOMER: string;
  TECHNICIAN: string;
  ADMIN: string;
}

interface CreateUserPayload {
  name: string;
  age?: number;
  password: string;
  email: string;
  role: UserRole;
  address?: string;
  profileImage?: string;
}

export const createUser = async (payload: CreateUserPayload) => {
  const password = payload.password;

  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password, salt);

  const res = prisma.
};
