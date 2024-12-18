"use server";

import { createClient } from "@/services/supabase/server";

export async function register({
  name,
  email,
  password,
  terms,
}: { name: string; email: string; password: string; terms: boolean }) {
  const supabase = await createClient();

  const data = {
    email,
    password,
    options: {
      data: {
        full_name: name,
        terms,
      },
    },
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.log(error);
    throw error.message;
  }

  return true;
}
