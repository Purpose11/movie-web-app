import Trending from "@/components/Trending";
import Recommended from "@/components/Recommended";
import Search from "@/components/Search";

const page = () => {
  return (
    <main className=" mt-[30px] font-poppins">
      <Search type="movie" text="Movies" />
      <h1 className="lg:text-2xl text-xl mt-[5px] px-[15px] lg:px-0">
        Trending
      </h1>
      <Trending />
      <h1 className="lg:text-2xl text-xl mt-[30px] px-[15px] lg:px-0">
        Recommended for you
      </h1>
      <Recommended />
    </main>
  );
};

export default page;
