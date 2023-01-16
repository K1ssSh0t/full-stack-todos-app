"use client";

import { useSupabase } from "./supabase-provider";
import { useRouter } from "next/navigation";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import { useState } from "react";

// Supabase auth needs to be triggered client-side
//This is a custom login component, change it at pleasure
export default function Login() {
  const { supabase, session } = useSupabase();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log({ error });
    }
    router.refresh();
  };

  // this `session` is from the root loader - server-side
  // therefore, it can safely be used to conditionally render
  // SSR pages without issues with hydration
  return session ? (
    <div className=" flex flex-auto items-center justify-end bg-purple-500 h-14 shadow-lg shadow-purple-900">
      <p className=" text-lg ">
        {"Hello! "}

        {session.user.user_metadata.full_name}
      </p>

      <button onClick={handleLogout} className="btn btn-sm mx-2 ">
        Logout
      </button>

      <div className=" grid text-center m-2 p-2 place-content-center ">
        <div className=" w-10 h-10  rounded-full  bg-cover bg-center bg-[url('/profile.svg')]">
          <img
            src={session.user.user_metadata.avatar_url}
            alt=""
            className=" w-full rounded-full bg-purple-500"
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-auto items-center justify-end bg-purple-500 h-14">
      <Marquee gradient={false} speed={100}>
        <span className=" font-semibold text-xl">Pls Login</span>
      </Marquee>
    </div>
  );
}
