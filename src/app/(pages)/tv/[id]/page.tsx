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
  name: string;
  original_name: string;
  overview: string;
  poster_path: string;
  first_air_date: string;
  runtime: number;
  tagline: string;
  videos: any;

  genre_ids: number[];
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
          `https://api.themoviedb.org/3/tv/${params.id}?api_key=dd90dd41203fce3517619be87037fc63&append_to_response=videos`,
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
    const dateComponents = data?.first_air_date.split("-");
    if (dateComponents) {
      const year = dateComponents[0];
      const month = dateComponents[1];
      const day = dateComponents[2];

      const formattedDate = `${day}/${month}/${year}`;
      return formattedDate;
    }
  };

  // const getRuntime = () => {
  //   const runtimeInMinutes = data?.runtime;

  //   if (runtimeInMinutes) {
  //     const hours = Math.floor(runtimeInMinutes / 60);
  //     const minutes = runtimeInMinutes % 60;

  //     const formattedRuntime = `${hours}h ${minutes}m`;

  //     return formattedRuntime;
  //   }
  // };

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
          <p className=" text-center font-bold text-xl">
            No Trailer is available for this movie
          </p>
        </div>
      );
    }
  };
  return (
    <>
      {loading ? (
        <div className="w-full h-[80vh] flex items-center gap-6 px-9">
          <Skeleton className="w-[250px] h-[400px]  rounded-xl bg-gray-700" />
          <div className="w-[75%] h-[350px]">
            <Skeleton className="w-[50%] h-[36px] bg-gray-700" />
            <Skeleton className="w-[30%] h-[10px] bg-gray-700 mt-5" />
            <div className="-full flex items-center gap-[20px] text-base mt-3">
              <Skeleton className="w-[40px] h-[40px] rounded-full bg-gray-700" />
              <Skeleton className="w-[40px] h-[40px] rounded-full bg-gray-700" />
              <Skeleton className="w-[150px] h-[30px]  bg-gray-700" />
            </div>
            <Skeleton className="w-[30%] h-[25px] bg-gray-700 mt-5" />
            <div className="mt-[30px] flex flex-col gap-4">
              <Skeleton className="w-[30%] h-[20px] bg-gray-700" />
              <Skeleton className="w-full h-[10px] bg-gray-700" />
              <Skeleton className="w-full h-[10px] bg-gray-700" />
              <Skeleton className="w-full h-[10px] bg-gray-700" />
            </div>
          </div>
        </div>
      ) : (
        <>
          {" "}
          <main
            className="w-full h-[80vh] flex items-center gap-6 px-9 relative"
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
                  <h2 className="text-xl">Play Trailer</h2>
                  <button type="button" onClick={() => setIsPlayTrailer(false)}>
                    <MdOutlineClose ClassName="s" />
                  </button>
                </div>
                {playTrailer()}
              </div>
            ) : null}

            <div className="w-[250px] h-[400px]  rounded-xl">
              <img
                src={`https://image.tmdb.org/t/p/w500/${
                  data?.poster_path ? data?.poster_path : data?.backdrop_path
                }`}
                className="object-cover w-full h-[100%] rounded-xl"
              />
            </div>
            {/* details */}
            <div className="w-[75%] h-[350px]">
              <h1 className=" text-4xl font-bold font-sans">{data?.name}</h1>

              {/*movie details */}
              <div className="w-full flex flex-col gap-[5px] text-base mt-3 font-poppins">
                <div className="w-full h-[20px] flex gap-[8px] items-center text-gray-300 text-[12px] pt-2">
                  <p>{data?.first_air_date === "" ? "2023" : formatDate()}</p>
                  <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
                  <div className="flex gap-[2px]">
                    {data?.genres.map((genre, index) => (
                      <React.Fragment key={genre.id}>
                        <p>{genre.name}</p>
                        {index < data.genres.length - 1 && <span>,</span>}
                      </React.Fragment>
                    ))}
                  </div>
                  {/* <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
                  <p>{getRuntime()}</p> */}
                </div>
              </div>

              {/*button section */}
              <div className="w-full flex items-center gap-[20px] text-base  mt-3 font-poppins">
                <div className="w-[40px] h-[40px] rounded-full bg-[#032541] flex justify-center items-center">
                  <FaBookmark className="text-white flex-shrink-0 h-[12px] w-[12px] cursor-pointer" />
                </div>
                <div className="w-[40px] h-[40px] rounded-full bg-[#032541] flex justify-center items-center">
                  <FaHeart className="text-white flex-shrink-0 h-[12px] w-[12px] cursor-pointer" />
                </div>
                <div
                  className="flex items-center gap-2 text-white cursor-pointer hover:text-gray-400  text-base font-sans font-semibold"
                  onClick={() => setIsPlayTrailer(true)}
                >
                  <FaPlay />
                  <p>Play Trailer</p>
                </div>
              </div>
              {/*tagline */}
              <p className="text-gray-400 italic text-sm mt-3">
                {data?.tagline ? data.tagline : ""}
              </p>
              {/*overview */}
              <div className=" mt-3 justify-end">
                <h3 className=" text-xl font-semibold">Overview</h3>
                <p className=" text-base mt-2">{data?.overview}</p>
              </div>
            </div>
          </main>
          <h2 className="text-xl mt-[30px] font-poppins">
            Recommended After Watching {data?.name}
          </h2>
          <Recommended id={params.id} type="tv" />
        </>
      )}
    </>
  );
};

export default page;
