"use client";
import React, { useEffect, useState } from "react";
import { MdLocalMovies, MdBookmarkBorder } from "react-icons/md";
import { PiTelevisionDuotone } from "react-icons/pi";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { BsFillBookmarkFill } from "react-icons/bs";

interface Itrending {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  name: string;
  media_type: string;
  original_language: string;
  original_name: string;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  first_air_date: string;
}
const Trending = () => {
  const [data, setData] = useState<Itrending[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isBookmark, setIsBookmark] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/trending/all/day?api_key=dd90dd41203fce3517619be87037fc63",
          { cache: "no-store" }
        );
        const data = await res.json();
        setData(data.results);
        setLoading(false);
        console.log(data.results);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getMovieYear = (data: Itrending) => {
    const releaseDate = data.release_date
      ? data.release_date
      : data.first_air_date;
    const year = new Date(releaseDate).getFullYear();
    if (isNaN(year) || !releaseDate) {
      return 2023; // Return 2023 for invalid or missing date
    }

    return year;
  };

  return (
    <div className="flex items-center gap-[30px] h-fit w-full overflow-x-auto mt-[20px] trending">
      {loading ? (
        <>
          <Skeleton className="w-[450px] h-[220px] rounded-xl flex-shrink-0 flex flex-col justify-end bg-gray-700" />
          <Skeleton className="w-[450px] h-[220px] rounded-xl flex-shrink-0 flex flex-col justify-end bg-gray-700" />
          <Skeleton className="w-[450px] h-[220px] rounded-xl flex-shrink-0 flex flex-col justify-end bg-gray-700" />
        </>
      ) : (
        data &&
        data.map((trendData) => {
          const movieYear = getMovieYear(trendData);
          return (
            <Link
              href={` ${
                trendData.media_type === "movie"
                  ? `/movie/${trendData.id}`
                  : `/tv/${trendData.id}`
              }`}
              key={trendData.id}
              className="w-[450px] h-[220px] rounded-xl flex-shrink-0 flex flex-col justify-end relative"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/w500/${trendData.backdrop_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="w-[70%] h-[100px]  ml-[20px] mb-[7px]">
                <div className="w-full h-[30px] flex gap-[8px] items-center text-gray-300 text-[12px]">
                  <p>{movieYear}</p>
                  <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
                  <p className="flex items-center gap-[5px]">
                    {trendData.media_type === "movie" ? (
                      <MdLocalMovies className="flex-shrink-0  text-[12px]" />
                    ) : (
                      <PiTelevisionDuotone className="flex-shrink-0 text-[12px]" />
                    )}
                    <span>
                      {trendData.media_type === "movie" ? "Movie" : "Tv series"}
                    </span>
                  </p>
                  <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
                  <p>{trendData.adult === false ? "E" : "PG"}</p>
                </div>
                <h1 className="text-xl font-[600]">
                  {trendData.name ? trendData.name : trendData.title}
                </h1>
              </div>
              <div className="bg-black/40 rounded-full h-[30px] w-[30px] flex items-center justify-center absolute top-[10px] right-[10px]">
                <MdBookmarkBorder
                  className={`flex-shrink-0 h-[16px] w-[16px] cursor-pointer ${
                    isBookmark ? "text-white" : " text-gray-500"
                  }`}
                  onClick={() => setIsBookmark(!isBookmark)}
                />
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default Trending;
