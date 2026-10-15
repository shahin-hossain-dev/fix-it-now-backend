import type { UserRole } from "../../generated/prisma/enums";

export interface CreateUserPayload {
  name: string;
  password: string;
  email: string;
  role: UserRole;
  address?: string;
  profileImage?: string;
}
