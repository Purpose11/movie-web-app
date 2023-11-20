import React from "react";
import { FiSearch } from "react-icons/fi";
import Trending from "@/components/Trending";
import Recommended from "@/components/Recommended";

const page = () => {
  return (
    <main className=" mt-[30px] font-poppins">
      <div className="flex items-center gap-4 w-[50%] h-[45px] px-1">
        <FiSearch className="text-xl text-white" />
        <input
          id="myInput"
          type="text"
          placeholder="Search for movies or TV series"
          className="placeholder-gray-500 text-xl bg-mainBgColor text-white outline-none w-[80%]"
        />
      </div>
      <h1 className="text-2xl mt-[5px]">Trending</h1>
      <Trending />
      <h1 className="text-2xl mt-[30px]">Recommended for you</h1>
      <Recommended />
    </main>
  );
};

export default page;
