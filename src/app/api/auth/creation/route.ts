import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/packages/database/prisma";

export async function GET(request: NextRequest) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.email) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    // Create user if doesn't exist
    if (!existingUser) {
      await prisma.user.create({
        data: {
          email: user.email,
          id: user.id,
          full_name: `${user.given_name ?? ""} ${
            user.family_name ?? ""
          }`.trim(),
        },
      });
    }

    // Redirect to home page
    return NextResponse.redirect(new URL("/", request.url));
  } catch (error) {
    console.error("Error in user creation:", error);
    return NextResponse.json(
      { error: "Failed to process user creation" },
      { status: 500 }
    );
  }
}
