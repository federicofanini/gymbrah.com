import { createClient } from "./server";

export async function getSession() {
  const supabase = await createClient();

  return supabase.auth.getSession();
}
