"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genres: { id: number; name: string }[];
  id: number;
  original_language: string;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  tagline: string;
  videos: any;
}

interface IVidoes {
  id: string;
  key: string;
  name: string;
}

const nSkeleton = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
const Recommended = ({ id }: { id: number }) => {
  const [data, setData] = useState<IMovie[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isBookmark, setIsBookmark] = useState<boolean>(false);
  const [isPlayTrailer, setIsPlayTrailer] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=dd90dd41203fce3517619be87037fc63`,
          { cache: "no-store" }
        );
        if (res.ok) {
          const responseData = await res.json();
          setData(responseData.results); // Set the fetched data to the state
          setLoading(false);
          console.log(responseData.results);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);
  return (
    <>
      {loading ? (
        <div className="w-[80%] h-fit mx-auto grid grid-cols-[1fr,1fr,1fr,1fr] gap-[30px] mt-[30px] ">
          {nSkeleton.map((skel) => {
            return (
              <div
                className="h-[450px] rounded-xl flex flex-col gap-[10px] "
                key={skel.id}
              >
                <Skeleton className="w-full h-[90%] bg-gray-700" />
                <Skeleton className="w-full h-[10%] bg-gray-700" />
              </div>
            );
          })}
        </div>
      ) : (
        <main>
          {data && data.length > 0 ? (
            <div className="w-[80%] h-fit mx-auto grid grid-cols-[1fr,1fr,1fr,1fr] gap-[30px] mt-[30px] ">
              {data.map((movie) => {
                if (movie.poster_path || movie.backdrop_path) {
                  return (
                    <Link
                      href={`/movie/${movie.id}`}
                      className="h-[450px] rounded-xl flex flex-col gap-[10px]  cursor-pointer"
                      key={movie.id}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${
                          movie.poster_path
                            ? movie.poster_path
                            : movie.backdrop_path
                        }`}
                        className="object-cover w-full h-[90%] rounded-xl"
                      />
                      <div className="w-full h-[10%]">
                        <p className="text-[14px] font-poppins hover:text-gray-400">
                          {movie.title}
                        </p>
                      </div>
                    </Link>
                  );
                } else {
                  return null; // Do not render movies without poster_path and backdrop_path
                }
              })}
            </div>
          ) : (
            <h2 className="text-xl font-poppins text-center mt-2 capitalize text-gray-400">
              No recommendations available!
            </h2>
          )}
        </main>
      )}
    </>
  );
};

export default Recommended;
