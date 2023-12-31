"use client";
import React, { useEffect, useState } from "react";
import { MdLocalMovies, MdBookmarkBorder } from "react-icons/md";
import { PiTelevisionDuotone } from "react-icons/pi";
import { Skeleton } from "@/components/ui/skeleton";
import { BsFillBookmarkFill } from "react-icons/bs";
import Link from "next/link";

interface IRecommended {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

const nSkeleton = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
  {
    id: 7,
  },
  {
    id: 8,
  },
];

const Recommended = () => {
  const [data, setData] = useState<IRecommended[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isBookmark, setIsBookmark] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
          { cache: "no-store" }
        );
        const data = await res.json();
        setData(data.results);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const getMovieYear = (data: IRecommended) => {
    const releaseDate = data.release_date;
    const year = new Date(releaseDate).getFullYear();
    return year;
  };
  return (
    <div className="mt-[20px] w-full h-fit grid lg:grid-cols-[1fr,1fr,1fr,1fr] grid-cols-[1fr,1fr] lg:gap-[30px] gap-[20px]  lg:pr-[20px] px-[15px] lg:px-0">
      {loading
        ? nSkeleton.map((Skele) => {
            return (
              <div
                key={Skele.id}
                className="h-[250px] rounded-xl flex flex-col gap-[10px]"
              >
                <Skeleton className="h-[70%] rounded-xl w-full bg-gray-700" />
                <Skeleton className="lg:h-[7%] h-[5%] w-[50%] bg-gray-700" />
                <Skeleton className="lg:h-[7%] h-[5%] w-[70%] bg-gray-700" />
              </div>
            );
          })
        : data &&
          data.map((movie) => {
            const movieYear = getMovieYear(movie);
            return (
              <Link
                href={`movie/${movie.id}`}
                key={movie.id}
                className=" h-[250px] rounded-xl shrink-0  cursor-pointer"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${
                    movie.backdrop_path
                      ? movie.backdrop_path
                      : movie.poster_path
                  }`}
                  className="object-cover w-full h-[70%] rounded-xl"
                />
                {/*movie details*/}
                <div className="w-full h-[30%] flex flex-col gap-[5px]">
                  <div className="w-full h-[20px] flex gap-[8px] items-center text-gray-300 lg:text-[12px] text-[10px] pt-2">
                    <p>{movieYear}</p>
                    <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
                    <p className="flex items-center gap-[5px]">
                      <MdLocalMovies className="flex-shrink-0  lg:text-[12px] text-[10px]" />
                      <span>Movie</span>
                    </p>
                    <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
                    <p>{movie.adult === false ? "E" : "PG"}</p>
                  </div>
                  <p className="lg:text-[14px] text-[12px]">{movie.title}</p>
                </div>
              </Link>
            );
          })}
    </div>
  );
};

export default Recommended;
