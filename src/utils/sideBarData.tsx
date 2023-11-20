import { MdLocalMovies } from "react-icons/md";
import { PiTelevisionDuotone } from "react-icons/pi";
import { BsFillBookmarkFill } from "react-icons/bs";
import { BiSolidGridAlt } from "react-icons/bi";

export const sideBarData = [
  {
    id: 1,
    name: "Home",
    icon: <BiSolidGridAlt className=" text-2xl" />,
    path: "/home",
  },
  {
    id: 2,
    name: "Movies",
    icon: <MdLocalMovies className=" text-2xl" />,
    path: "/movies",
  },
  {
    id: 3,
    name: "Tv-series",
    icon: <PiTelevisionDuotone className=" text-2xl" />,
    path: "/tv-series",
  },
  {
    id: 4,
    name: "Bookmarks",
    icon: <BsFillBookmarkFill className=" text-2xl" />,
    path: "/bookmarks",
  },
];
