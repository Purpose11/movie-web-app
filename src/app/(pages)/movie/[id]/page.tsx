"use client";
import React, { useEffect, useState } from "react";
import { FaBookmark, FaHeart, FaPlay } from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton";
import { MdOutlineClose } from "react-icons/md";
import YouTube from "react-youtube";
import Recommended from "@/components/RecommendedById";

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

const page = ({ params }: { params: { id: number } }) => {
  const [data, setData] = useState<IMovie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isBookmark, setIsBookmark] = useState<boolean>(false);
  const [isPlayTrailer, setIsPlayTrailer] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&append_to_response=videos`,
          { cache: "no-store" }
        );
        if (res.ok) {
          const responseData = await res.json();
          setData(responseData); // Set the fetched data to the state
          setLoading(false);
          console.log(responseData);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const formatDate = () => {
    const dateComponents = data?.release_date.split("-");
    if (dateComponents) {
      const year = dateComponents[0];
      const month = dateComponents[1];
      const day = dateComponents[2];

      const formattedDate = `${day}/${month}/${year}`;
      return formattedDate;
    }
  };

  const getRuntime = () => {
    const runtimeInMinutes = data?.runtime;

    if (runtimeInMinutes) {
      const hours = Math.floor(runtimeInMinutes / 60);
      const minutes = runtimeInMinutes % 60;

      const formattedRuntime = `${hours}h ${minutes}m`;

      return formattedRuntime;
    }
  };

  const playTrailer = () => {
    if (
      data &&
      data.videos &&
      Array.isArray(data.videos.results) &&
      data.videos.results.length > 0
    ) {
      const trailer = data.videos.results.find(
        (v: IVidoes) => v.name === "Official Trailer"
      );
      const key = trailer ? trailer : data.videos.results[0];
      console.log(trailer);
      return (
        <YouTube
          videoId={`${key.key}`}
          className="w-full h-[90%]"
          opts={{
            width: "100%",
            height: "100%",
            playerVars: {
              autoplay: 1,
            },
          }}
        />
      );
    } else {
      return (
        <div className="w-full h-[90%] bg-black">
          <p className=" text-center font-bold lg:text-xl text-base">
            No Trailer is available for this movie
          </p>
        </div>
      );
    }
  };
  return (
    <>
      {loading ? (
        <div className="w-full lg:h-[80vh] h-fit flex items-center flex-col lg:flex-row gap-6 lg:px-9 py-5 lg:py-0 mt-3 lg:mt-0">
          <Skeleton className="lg:w-[250px] w-[220px]  lg:h-[400px] h-[350px]  rounded-xl bg-gray-700" />
          <div className="w-[75%] h-[350px]">
            <Skeleton className="w-[50%] lg:h-[36px] h-[24px] bg-gray-700" />
            <Skeleton className="w-[30%] lg:h-[10px] h-[7px] bg-gray-700 mt-5" />
            <div className="-full flex items-center gap-[20px] text-base mt-3">
              <Skeleton className="lg:w-[40px] w-[30px] lg:h-[40px] h-[30px] rounded-full bg-gray-700" />
              <Skeleton className="lg:w-[40px] w-[30px] lg:h-[40px] h-[30px] rounded-full bg-gray-700" />
              <Skeleton className="w-[150px] lg:h-[30px] h-[20px] bg-gray-700" />
            </div>
            <Skeleton className="w-[30%] lg:h-[25px] h-[17px] bg-gray-700 mt-5" />
            <div className="mt-[30px] flex flex-col gap-4">
              <Skeleton className="w-[30%] lg:h-[20px] h-[10px] bg-gray-700" />
              <Skeleton className="w-full lg:h-[10px] h-[5px] bg-gray-700" />
              <Skeleton className="w-full lg:h-[10px] h-[5px] bg-gray-700" />
              <Skeleton className="w-full lg:h-[10px] h-[5px] bg-gray-700" />
            </div>
          </div>
        </div>
      ) : (
        <>
          {" "}
          <main
            className="w-full lg:h-[80vh] h-fit flex items-center flex-col lg:flex-row gap-6 lg:px-9 py-5 lg:py-0 mt-3 lg:mt-0 relative"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://image.tmdb.org/t/p/w500/${
                data?.backdrop_path ? data.backdrop_path : data?.poster_path
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {isPlayTrailer ? (
              <div className=" w-[100%] h-[100%] flex flex-col absolute top-0 left-0 right-0 bottom-0">
                <div className=" w-full h-[10%] bg-black flex items-center justify-between text-white px-6 font-semibold">
                  <h2 className="lg:text-xl text-base">Play Trailer</h2>
                  <button type="button" onClick={() => setIsPlayTrailer(false)}>
                    <MdOutlineClose ClassName="lg:text-xl text-base" />
                  </button>
                </div>
                {playTrailer()}
              </div>
            ) : null}

            <div className="lg:w-[250px] w-[220px]  lg:h-[400px] h-[350px] rounded-xl">
              <img
                src={`https://image.tmdb.org/t/p/w500/${
                  data?.poster_path ? data?.poster_path : data?.backdrop_path
                }`}
                className="object-cover w-full h-[100%] rounded-xl"
              />
            </div>
            {/* details */}
            <div className="lg:w-[75%] w-[85%] lg:h-[350px] h-fit">
              <h1 className="lg:text-4xl text-2xl font-bold font-sans">
                {data?.title}
              </h1>

              {/*movie details */}
              <div className="w-full flex flex-col gap-[5px] lg:text-base text-sm mt-3 font-poppins">
                <div className="w-full lg:h-[20px] h-fit flex gap-[8px] items-center text-gray-300 lg:text-[12px] text-[10px] lg:pt-2">
                  <p>{formatDate()}</p>
                  <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
                  <div className="flex gap-[2px]">
                    {data?.genres.map((genre, index) => (
                      <React.Fragment key={genre.id}>
                        <p>{genre.name}</p>
                        {index < data.genres.length - 1 && <span>,</span>}
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
                  <p>{getRuntime()}</p>
                </div>
              </div>

              {/*button section */}
              <div className="w-full flex items-center gap-[20px] text-base  mt-3 font-poppins">
                <div className="lg:w-[40px] w-[30px] lg:h-[40px] h-[30px] rounded-full bg-[#032541] flex justify-center items-center">
                  <FaBookmark className="text-white flex-shrink-0 lg:h-[12px] h-[10px] lg:w-[12px] w-[10px] cursor-pointer" />
                </div>
                <div className="lg:w-[40px] w-[30px] lg:h-[40px] h-[30px] rounded-full bg-[#032541] flex justify-center items-center">
                  <FaHeart className="text-white flex-shrink-0 h-[12px] lg:w-[12px] w-[10px] cursor-pointer" />
                </div>
                <div
                  className="flex items-center gap-2 text-white cursor-pointer hover:text-gray-400  lg:text-base text-sm font-sans font-semibold"
                  onClick={() => setIsPlayTrailer(true)}
                >
                  <FaPlay />
                  <p>Play Trailer</p>
                </div>
              </div>
              {/*tagline */}
              <p className="text-gray-400 italic lg:text-sm text-xs mt-3">
                {data?.tagline ? data.tagline : ""}
              </p>
              {/*overview */}
              <div className=" mt-3 justify-end w-full">
                <h3 className=" lg:text-xl text-base font-semibold">
                  Overview
                </h3>
                <p className=" lg:text-base text-sm mt-2">{data?.overview}</p>
              </div>
            </div>
          </main>
          <h2 className="lg:text-xl text-base px-[15px] lg:px-0 mt-[30px] font-poppins">
            Recommended After Watching {data?.title}
          </h2>
          <Recommended id={params.id} type="movie" />
        </>
      )}
    </>
  );
};

export default page;
