import React from "react";

type Props = {};

const loading = (props: Props) => {
  return (
    <div className=" flex flex-col items-center space-y-5 p-4 animate-pulse">
      <progress className=" progress w-[30rem]"></progress>
      <progress className=" progress w-[30rem]"></progress>
      <progress className=" progress w-[30rem]"></progress>
      <progress className=" progress w-[30rem]"></progress>
      <progress className=" progress w-[30rem]"></progress>
      <progress className=" progress w-[30rem]"></progress>
      <progress className=" progress w-[30rem]"></progress>
      <progress className=" progress w-[30rem]"></progress>
      <progress className=" progress w-[30rem]"></progress>
      <progress className=" progress w-[30rem]"></progress>
      <progress className=" progress w-[30rem]"></progress>
      <progress className=" progress w-[30rem]"></progress>
    </div>
  );
};

export default loading;
