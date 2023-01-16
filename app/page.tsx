import "server-only";

import { createServerClient } from "../utils/supabase-server";
import NewTask from "./new-task";
import Image from "next/image";

import Tasks from "./tasks";

import { Inter } from "@next/font/google";
import Footer from "./footer";
import Login from "./login";

const inter = Inter({ subsets: ["latin"] });

export const revalidate = 0;
export default async function Home() {
  const supabase = createServerClient();

  const { data: user } = await supabase.auth.getUser();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userId = user.user?.id;

  const { data: todos } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", userId);

  return (
    <div className=" p-8">
      <main className=" min-h-[100vh]">
        {session ? (
          <>
            <NewTask />
            <Tasks tasksList={todos || []} />
          </>
        ) : (
          <Login />
        )}
      </main>
      <Footer />
    </div>
  );
}
