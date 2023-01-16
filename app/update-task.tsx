"use client";

import React, { useState } from "react";
import { useSupabase } from "../components/supabase-provider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Database } from "../types/supabase";

type Task = Database["public"]["Tables"]["todos"]["Row"];

const Update = ({ task }: { task: Task }) => {
  const { supabase } = useSupabase();
  const id = task.id;
  const taskData = task.task;
  const [completed, setCompleted] = useState<boolean>(true);
  const [taskDescription, setTaskDescription] = useState("");

  const handleOnChangeCheckBox = () => {
    setCompleted(!completed);
  };

  async function updateTask(e: React.SyntheticEvent) {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      task: { value: string };
    };

    const taskText = target.task.value === "" ? taskData : taskDescription;

    const { data, error } = await supabase
      .from("todos")
      .update({ task: taskText, is_complete: completed })
      .eq("id", id);

    error == null
      ? toast.info("Tasks Updated", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      : null;

    setTaskDescription("");
  }

  return (
    <>
      <input type="checkbox" id={`my-modal-${id}`} className="modal-toggle" />
      <div className="modal  ">
        <div className="modal-box w-8/12 sm:w-5/12 lg:w-3/12">
          <label
            htmlFor={`my-modal-${id}`}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form className="form-control w-full max-w-xs" onSubmit={updateTask}>
            <label className="label">
              <span className="label-text">Type your Task</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              minLength={4}
              name="task"
              onChange={(event) => setTaskDescription(event.target.value)}
              value={taskDescription}
            />
            <label className="label">
              <span className="label-text">Select if is Completed</span>
            </label>
            <input
              type="checkbox"
              className="checkbox self-center "
              onChange={handleOnChangeCheckBox}
              checked={completed}
            />
            <input className=" btn ml-3 mt-5" type="submit" value="Send" />
          </form>
        </div>
      </div>
      <label htmlFor={`my-modal-${id}`} className="btn btn-sm btn-square">
        ✍️
      </label>
      <ToastContainer />
    </>
  );
};

export default Update;
