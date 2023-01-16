"use client";

import Link from "next/link";
import { useSupabase } from "../components/supabase-provider";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Supabase auth needs to be triggered client-side
//This is a custom login component, change it at pleasure
export default function Login() {
  const { supabase, session } = useSupabase();
  const router = useRouter();

  const handleDiscordLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
    });

    if (error) {
      console.log({ error });
    }
  };
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.log({ error });
    }
  };
  // this `session` is from the root loader - server-side
  // therefore, it can safely be used to conditionally render
  // SSR pages without issues with hydration
  return session ? (
    <></>
  ) : (
    <div className="flex flex-auto justify-center">
      <div className="card w-96 bg-neutral shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Login to access to your Todos!</h2>
          <p>
            Todos App build with Next.JS 13 and supabase using supabase-auth and
            realtime
          </p>
          <div className="card-actions justify-center ">
            <button
              onClick={handleDiscordLogin}
              className=" btn mr-2 btn-accent w-60"
            >
              <Image
                src="/discord-mark-black.svg"
                width={20}
                alt="Discord Logo"
                height={1}
                className=" mr-2"
              />
              <span> Discord Login</span>
            </button>
            <button
              onClick={handleGoogleLogin}
              className=" btn mr-2 btn-accent w-60"
            >
              <Image
                src="/google.svg"
                width={20}
                alt="Discord Logo"
                height={1}
                className=" mr-2"
              />
              <span>Google Login</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
