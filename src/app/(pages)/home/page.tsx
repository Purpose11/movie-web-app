import Trending from "@/components/Trending";
import Recommended from "@/components/Recommended";
import Search from "@/components/Search";

const page = () => {
  return (
    <main className=" mt-[30px] font-poppins">
      <Search type="movie" text="Movies" />
      <h1 className="text-2xl mt-[5px]">Trending</h1>
      <Trending />
      <h1 className="text-2xl mt-[30px]">Recommended for you</h1>
      <Recommended />
    </main>
  );
};

export default page;
