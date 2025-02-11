import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  if (token_hash && type) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error && data.user) {
      try {
        // Check if user already exists
        const { data: existingUser, error: checkError } = await supabase
          .from("user")
          .select()
          .eq("email", data.user.email)
          .single();

        if (checkError && checkError.code !== "PGRST116") {
          console.error("Error checking user:", checkError);
          return Response.redirect(new URL("/error", request.url));
        }

        // Skip if user already exists
        if (!existingUser) {
          const now = new Date().toISOString();
          // Create initial user record using Supabase
          const { error: insertError } = await supabase.from("user").insert([
            {
              id: data.user.id,
              email: data.user.email,
              full_name: "", // Will be filled during onboarding
              created_at: now,
              updated_at: now,
            },
          ]);

          if (insertError) {
            console.error("Error creating user:", insertError);
            return Response.redirect(new URL("/error", request.url));
          }
        }

        // redirect user to onboarding to complete profile
        return Response.redirect(new URL("/onboarding", request.url));
      } catch (err) {
        console.error("Error creating user:", err);
        return Response.redirect(new URL("/error", request.url));
      }
    }
  }

  // redirect the user to an error page with some instructions
  return Response.redirect(new URL("/error", request.url));
}
