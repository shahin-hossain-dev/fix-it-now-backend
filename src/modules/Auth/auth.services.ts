import bcrypt from "bcryptjs";

import type { UserRole } from "../../generated/prisma/enums";
import prisma from "../../libs/prisma";

interface CreateUserPayload {
  name: string;
  password: string;
  email: string;
  role: UserRole;
  address?: string;
  profileImage?: string;
}

const createUser = async (payload: CreateUserPayload) => {
  const password = payload?.password;
  const email = payload?.email;

  // const isExist = await prisma.user.findUnique({ where: { email } });
  const isExist = await prisma.user.findUnique({ where: { email: email } });
  console.log(isExist);

  if (isExist) {
    throw new Error("User already exists with this email");
  }

  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password, salt);

  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashPass,
      role: payload.role ?? "CUSTOMER",
      profileImage: payload.profileImage ?? "",
      address: payload.address ?? "",
    },
    select: {
      name: true,
      email: true,
      role: true,
      address: true,
      profileImage: true,
    },
  });

  return user;
};

export const authServices = {
  createUser,
};
