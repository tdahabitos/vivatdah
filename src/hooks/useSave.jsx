import { supabase } from "@/services/supabase/client";
import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";

export default function useSave(id) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const { user } = useUserStore();

  async function toggle() {
    setIsSaved(!isSaved);

    if (isSaved) {
      await supabase
        .schema("metadata")
        .from("events")
        .delete()
        .eq("event", "save")
        .eq("reference_id", id)
        .eq("user_id", user?.id);
    } else {
      await supabase
        .schema("metadata")
        .from("events")
        .insert({ event: "save", reference_id: id, user_id: user?.id })
        .single();
    }
  }

  async function getData() {
    const { error } = await supabase
      .schema("metadata")
      .from("events")
      .select("*")
      .eq("event", "save")
      .eq("reference_id", id)
      .eq("user_id", user?.id)
      .single();

    if (!error) {
      setIsSaved(true);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    if (!user) return;

    getData();
  }, [user]);

  return {
    isLoading,
    isSaved,
    toggle,
  };
}
