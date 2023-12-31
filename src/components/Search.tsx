"use client";
import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";

interface Idata {
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

const Search = ({ type, text }: { type: string; text: string }) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<Idata[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [noResultsFound, setNoResultsFound] = useState<boolean>(false);

  const fetchData = async () => {
    if (search.length > 0) {
      setLoading(true); // Set loading to true when starting fetching data

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/${type}?query=${search}&api_key=dd90dd41203fce3517619be87037fc63`,
          { cache: "no-store" }
        );
        const responseData = await res.json();

        if (responseData.results.length === 0) {
          setNoResultsFound(true); // Set the flag if no results are found
        } else {
          setData(responseData.results);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    } else {
      setData([]); // Clear the data if the input is empty
      setNoResultsFound(false); // Reset the flag when input is empty
    }
  };

  useEffect(() => {
    fetchData();
  }, [search]);
  return (
    <>
      <div className="flex items-center gap-4 lg:w-[30%] w-full h-[45px] px-1 relative px-[15px] lg:px-0">
        <FiSearch className="lg:text-xl text-base text-white" />
        <input
          id="myInput"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search for ${text}`}
          className="placeholder-gray-500 lg:text-xl text-base bg-mainBgColor text-white outline-none w-[80%]"
        />

        {search &&
          noResultsFound &&
          !loading && ( // Show only when no results after API call
            <div className="lg:w-[75%] w-full h-[50px] bg-navBarColor text-white absolute top-[45px] left-0 right-0 z-10 flex justify-center items-center">
              <p className="text-white text-base">No results found</p>
            </div>
          )}
        {search &&
          data &&
          data.length > 0 &&
          !loading && ( // Show results if available
            <div className="lg:w-[75%] w-full h-[500px]  bg-navBarColor text-white absolute top-[45px] left-0 right-0 overflow-y-scroll z-10 flex flex-col gap-2 px-5 py-3">
              {data.map((searchData) => (
                <Link
                  href={`/${type}/${searchData.id}`}
                  key={searchData.id}
                  className="text-white text-base cursor-pointer w-full hover:text-gray-400"
                >
                  {searchData.title ? searchData.title : searchData.name}
                </Link>
              ))}
            </div>
          )}
      </div>
    </>
  );
};

export default Search;
