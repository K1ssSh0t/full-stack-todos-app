"use client";

// 'use client' marks this page as a Client Component
// https://beta.nextjs.org/docs/rendering/server-and-client-components

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
    router.push("/");
  }, [error]);

  return (
    <div className=" flex flex-col items-center justify-center align-middle">
      <h1 className=" text-5xl text-error font-bold ">Something went wrong!</h1>
    </div>
  );
}
