import { MdLocalMovies } from "react-icons/md";
import { PiTelevisionDuotone } from "react-icons/pi";
import { BsFillBookmarkFill } from "react-icons/bs";
import { BiSolidGridAlt } from "react-icons/bi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const sideBarData = [
  {
    id: 1,
    name: "Home",
    icon: (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            {" "}
            <BiSolidGridAlt className=" text-2xl" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Home</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
    path: "/home",
  },
  {
    id: 2,
    name: "Tv-series",
    icon: (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <PiTelevisionDuotone className=" text-2xl" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Tv Series</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
    path: "/series",
  },
  {
    id: 3,
    name: "Bookmarks",
    icon: (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <BsFillBookmarkFill className=" text-2xl" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Bookmarks</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
    path: "/bookmarks",
  },
];
