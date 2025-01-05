import { supabase } from "@/services/supabase/client";
import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";

export default function useFavorite(id: string) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const { user } = useUserStore();

  async function toggle() {
    setIsFavorited(!isFavorited);

    if (isFavorited) {
      await supabase
        .schema("metadata")
        .from("events")
        .delete()
        .eq("event", "favorite")
        .eq("reference_id", id)
        .eq("user_id", user?.id);
    } else {
      await supabase
        .schema("metadata")
        .from("events")
        .insert({ event: "favorite", reference_id: id, user_id: user?.id })
        .single();
    }
  }

  async function getData() {
    const { error } = await supabase
      .schema("metadata")
      .from("events")
      .select("*")
      .eq("event", "favorite")
      .eq("reference_id", id)
      .eq("user_id", user?.id)
      .single();

    if (!error) {
      setIsFavorited(true);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    if (!user) return;

    getData();
  }, [user]);

  return {
    isLoading,
    isFavorited,
    toggle,
  };
}
