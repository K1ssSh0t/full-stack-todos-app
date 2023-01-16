"use client";

import { useState } from "react";
import { useSupabase } from "../components/supabase-provider";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function NewTask() {
  const { supabase, session } = useSupabase();
  const [task, setTask] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const userID = session?.user.id;

    const { error } = await supabase
      .from("todos")
      .insert({ task: task, user_id: userID });
    // no need to refresh, as we are subscribed to db changes in `./realtime-posts.tsx`

    error == null
      ? toast.success("Task Added!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      : toast.warn("Four characters minimum", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

    setTask("");
  };

  return (
    <div>
      <ToastContainer />
      <div className=" flex flex-auto justify-center p-4 ">
        <form onSubmit={handleSubmit}>
          <div className=" flex flex-auto justify-center ">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-secondary w-full max-w-xs"
              name="task"
              minLength={4}
              onChange={(event) => setTask(event.target.value)}
              value={task}
            />
            <button className=" btn ml-3">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
}
