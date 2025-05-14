import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { User } from "./types";

export async function getAuthUser(): Promise<User | null> {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return null;
    }

    return user as User;
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
}
