import "server-only";

import { createServerClient } from "../../utils/supabase-server";
import NewPost from "./newt-post";
import Posts from "./post";

// do not cache this page
export const revalidate = 0;

export default async function Realtime() {
  const supabase = createServerClient();
  const { data } = await supabase.from("images").select("*");

  return (
    <>
      <Posts serverPosts={data || []} />
      <NewPost />
    </>
  );
}
