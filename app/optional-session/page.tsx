import "server-only";

import { createServerClient } from "../../utils/supabase-server";

// do not cache this page
export const revalidate = 0;

export default async function ServerComponent() {
  const supabase = createServerClient();
  const { data } = await supabase.from("images").select("*").order("id");

  return <pre>{JSON.stringify({ data }, null, 2)}</pre>;
}
