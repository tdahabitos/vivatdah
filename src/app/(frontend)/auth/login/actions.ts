"use server";

import { createClient } from "@/services/supabase/server";

export async function login({
  email,
  password,
}: { email: string; password: string }) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error.message;
  }

  return data.user;
}
