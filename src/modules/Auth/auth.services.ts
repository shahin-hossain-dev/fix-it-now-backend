import bcrypt from "bcryptjs";
import prisma from "../../libs/prisma";
import { createToken } from "../../utils/jwt";
import type { CreateUserPayload } from "./auth.interface";

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
      id: true,
      name: true,
      email: true,
      role: true,
      address: true,
      profileImage: true,
    },
  });

  const tokenPayload = { id: user.id, email: user.email, role: user.role };

  const token = createToken(tokenPayload);

  return { token, user };
};

interface loginPayload {
  email: string;
  password: string;
}

const userLogin = async (payload: loginPayload) => {
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
    omit: { password: true },
  });
  const tokenPayload = {
    id: user?.id as number,
    email: user?.email as string,
    role: user?.role as string,
  };
  const token = createToken(tokenPayload);

  return {
    token,
    user,
  };
};

export const authServices = {
  createUser,
  userLogin,
};
