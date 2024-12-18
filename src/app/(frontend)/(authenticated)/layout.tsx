import { redirect } from "next/navigation";
import { createClient } from "@/services/supabase/server";
import AuthProvider from "./dashboard/_components/AuthProvider";

export default async function AuthLayout({
  children,
}: { children: React.ReactNode }) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return <AuthProvider user={data.user}>{children}</AuthProvider>;
}
