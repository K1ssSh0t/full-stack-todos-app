import React from "react";
import Image from "next/image";
import "server-only";

type Props = {};

function Footer({}: Props) {
  return (
    <footer className=" flex flex-1 p-8 border-t-[1px] justify-center items-center">
      <a
        href="https://github.com/K1ssSh0t"
        target="_blank"
        rel="noopener noreferrer"
        className=" flex justify-center items-center flex-grow-[1]"
      >
        My Github{" "}
        <span className=" h-[1em] ml-2">
          <Image
            src="/github.svg"
            alt="Git Hub Logo"
            width={20}
            height={1}
            className=" invert"
          />
        </span>
      </a>
    </footer>
  );
}

export default Footer;
