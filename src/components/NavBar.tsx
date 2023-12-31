"use client";

import React from "react";
import { sideBarData } from "@/utils/sideBarData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdMovie } from "react-icons/md";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <nav className="lg:w-[60px] w-full lg:h-[95vh] h-[50px] bg-navBarColor lg:ml-[30px] lg:my-[15px] lg:rounded-xl flex lg:flex-col flex-row items-center lg:py-4 px-3 fixed justify-between lg:justify-normal z-10">
      <MdMovie className="text-[#FE4749] lg:text-2xl text-xl" />
      <div className="lg:mt-[50px] flex lg:flex-col flex-row gap-5 lg:flex-grow">
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
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger>
              {" "}
              <div className="lg:h-[24px] h-[20px] lg:w-[24px] w-[20px] rounded-full  ring-white ring-1 ">
                <img
                  src="./avatar.jpg"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <div>
                  <h3>John Doe</h3>
                  <p className="text-xs font-normal text-gray-600">
                    test@test.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <AlertDialogTrigger>
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-black text-base">
                  Are you sure you want to log out?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="text-black">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </DropdownMenu>
        </AlertDialog>
      </div>
    </nav>
  );
};

export default NavBar;
