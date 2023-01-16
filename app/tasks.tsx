"use client";

import React, { useEffect, useState } from "react";

import { useSupabase } from "../components/supabase-provider";
import { Database } from "../types/supabase";
import Delete from "./delete-task";
import Update from "./update-task";

type Task = Database["public"]["Tables"]["todos"]["Row"];

const Tasks = ({ tasksList }: { tasksList: Task[] }) => {
  const [tasks, setTasks] = useState(tasksList);

  const { supabase } = useSupabase();
  useEffect(() => {
    setTasks(tasksList);
  }, [tasksList]);

  useEffect(() => {
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "todos" },
        (payload) => setTasks((tasks) => [...tasks, payload.new as Task])
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "todos" },
        (payload) =>
          setTasks(tasks.filter((task) => task.id !== payload.old.id))
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "todos" },
        (payload) =>
          setTasks(
            tasks.map((task) =>
              task.id === payload.new.id ? { ...task, ...payload.new } : task
            )
          )
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, setTasks, tasks]);

  return (
    <div className=" flex flex-col  items-center ">
      {tasks.map((item) => (
        <div className=" flex items-center " key={item.id}>
          <div className=" rounded-sm w-60  alert shadow-lg bg-base-300 mr-2 border-b-2 border-stone-600 ">
            {item.is_complete ? (
              <p className=" line-through truncate px-2">{item.task} </p>
            ) : (
              <p className=" truncate px-2  ">{item.task} </p>
            )}
          </div>
          <Delete task={item} />
          <Update task={item} />
        </div>
      ))}
    </div>
  );
};

export default Tasks;

/**TODO: MOVE TO THE MAIN PAGE  */
