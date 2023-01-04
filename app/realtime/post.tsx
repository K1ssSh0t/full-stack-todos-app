"use client";

import { useEffect, useState } from "react";
import { Database } from "../../types/supabase";
import { useSupabase } from "../../components/supabase-provider";

type Post = Database["public"]["Tables"]["images"]["Row"];

export default function Posts({ serverPosts }: { serverPosts: Post[] }) {
  const [posts, setPosts] = useState(serverPosts);

  const { supabase } = useSupabase();

  useEffect(() => {
    setPosts(serverPosts);
  }, [serverPosts]);

  useEffect(() => {
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "images" },
        (payload) => setPosts((posts) => [...posts, payload.new as Post])
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [serverPosts]);

  return <pre>{JSON.stringify(posts, null, 2)}</pre>;
}
