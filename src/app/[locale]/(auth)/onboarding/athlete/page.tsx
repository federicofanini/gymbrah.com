import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Athlete } from "../_components/athlete";
import { Cookies } from "@/utils/constants";
import { prisma } from "@/lib/db";
import { saveUser } from "@/actions/athlete/save-user";
import { generateCode } from "@/lib/user-code";

export default async function OnboardingAthletePage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const cookieStore = await cookies();
  const athleteCode = cookieStore.get(Cookies.AthleteCode)?.value;

  if (athleteCode) {
    const athlete = await prisma.athlete.findUnique({
      where: {
        athlete_code: athleteCode,
      },
    });

    if (athlete) {
      // Update athlete with user id and email if different
      await prisma.athlete.update({
        where: {
          athlete_code: athleteCode,
        },
        data: {
          user_id: session.user.id,
          ...(athlete.email !== session.user.email && {
            email: session.user.email,
          }),
        },
      });

      // Save user data
      const result = await saveUser({
        email: session.user.email ?? athlete.email,
        full_name: `${athlete.name} ${athlete.surname}`,
        avatar_url: session.user.user_metadata.avatar_url,
      });

      if (!result?.data?.success) {
        throw new Error("Failed to save user data");
      }

      // Redirect to athlete dashboard since onboarding is complete
      redirect("/athlete");
    }
  } else {
    // Save user data first
    const result = await prisma.user.upsert({
      where: {
        id: session.user.id,
      },
      create: {
        id: session.user.id,
        email: session.user.email ?? "",
        full_name: session.user.user_metadata.full_name ?? "",
        avatar_url: session.user.user_metadata.avatar_url,
        paid: false,
      },
      update: {
        email: session.user.email ?? "",
        full_name: session.user.user_metadata.full_name ?? "",
        avatar_url: session.user.user_metadata.avatar_url,
      },
    });

    if (!result) {
      throw new Error("Failed to save user data");
    }

    // Generate unique athlete code
    let newAthleteCode;
    let isUnique = false;

    while (!isUnique) {
      newAthleteCode = generateCode();
      const existingAthlete = await prisma.athlete.findUnique({
        where: {
          athlete_code: newAthleteCode,
        },
      });
      if (!existingAthlete) {
        isUnique = true;
      }
    }

    // Create new athlete with generated code
    if (!newAthleteCode) {
      throw new Error("Failed to generate unique athlete code");
    }

    const existingAthlete = await prisma.athlete.findFirst({
      where: {
        user_id: session.user.id,
      },
    });

    if (!existingAthlete) {
      await prisma.athlete.create({
        data: {
          athlete_code: newAthleteCode,
          user_id: session.user.id,
          email: session.user.email ?? "",
          name: "", // Will be filled during onboarding
          surname: "", // Will be filled during onboarding
          birth_date: new Date(), // Will be updated during onboarding
          gender: "", // Will be filled during onboarding
          invited_by: "GB",
          phone: "",
        },
      });
    }
  }

  return <Athlete />;
}
