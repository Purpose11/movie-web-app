"use client";

import React from "react";
import { sideBarData } from "@/utils/sideBarData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdMovie } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const NavBar = () => {
  const pathname = usePathname();
  return (
    <nav className="w-[60px] h-[95vh] bg-navBarColor ml-[30px] my-[15px] rounded-xl flex flex-col items-center py-4">
      <MdMovie className="text-[#FE4749] text-2xl" />
      <div className="mt-[50px] flex flex-col gap-5 flex-grow">
        {sideBarData.map((data) => {
          return (
            <Link
              key={data.id}
              href={data.path}
              className={`gap-4 ${
                pathname === data.path ? "text-white" : "text-[#596890]"
              } `}
            >
              {data.icon}
            </Link>
          );
        })}
      </div>
      <div className="avatar">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="h-[24px] w-[24px] rounded-full  ring-white ring-1 ">
                {/* <img
            src="./profile.jpg"
            className="w-full h-full object-cover rounded-full"
          /> */}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Account</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </nav>
  );
};

export default NavBar;
