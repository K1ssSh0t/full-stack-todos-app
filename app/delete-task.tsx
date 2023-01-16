"use client";

import React from "react";

import { useSupabase } from "../components/supabase-provider";
import { Database } from "../types/supabase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Task = Database["public"]["Tables"]["todos"]["Row"];

const Delete = ({ task }: { task: Task }) => {
  const { supabase } = useSupabase();
  const id = task.id;

  async function deleteTask(e: React.SyntheticEvent) {
    e.preventDefault();

    const { data, error } = await supabase.from("todos").delete().eq("id", id);
    error == null
      ? toast.warn("Task Deleted!", {
          position: "bottom-left",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      : null;
  }

  return (
    <>
      <button onClick={deleteTask} className=" btn btn-sm btn-square mr-2">
        ❌
      </button>
      <ToastContainer />
    </>
  );
};

export default Delete;
