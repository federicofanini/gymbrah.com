import { prisma } from "./prisma";

interface CreateUserInput {
  email: string;
  full_name: string;
  avatar_url?: string;
  role?: string;
}

export async function createUser(input: CreateUserInput) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: input.email,
      },
    });

    if (existingUser) {
      return existingUser;
    }

    const user = await prisma.user.create({
      data: {
        email: input.email,
        full_name: input.full_name,
        avatar_url: input.avatar_url,
        role: input.role || "user",
      },
    });

    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
