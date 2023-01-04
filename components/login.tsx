"use client";

import Link from "next/link";
import { useSupabase } from "./supabase-provider";

// Supabase auth needs to be triggered client-side
//This is a custom login component, change it at pleasure
export default function Login() {
  const { supabase, session } = useSupabase();

  const handleEmailLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: "jon@supabase.com",
      password: "password",
    });

    if (error) {
      console.log({ error });
    }
  };

  const handleGitHubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
    });

    if (error) {
      console.log({ error });
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log({ error });
    }
  };

  // this `session` is from the root loader - server-side
  // therefore, it can safely be used to conditionally render
  // SSR pages without issues with hydration
  return session ? (
    <>
      <button onClick={handleLogout}>Logout</button>
      <Link href={"/"}>HOME</Link>
      <img src={session.user.user_metadata.avatar_url} alt="" />
      <p>{session.user.user_metadata.full_name}</p>
    </>
  ) : (
    <>
      <button onClick={handleEmailLogin}>Email Login</button>
      <button onClick={handleGitHubLogin}>GitHub Login</button>
      <Link href={"/"}>HOME</Link>
    </>
  );
}
