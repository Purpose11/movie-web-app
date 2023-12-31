import NavBar from "@/components/NavBar";
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex gap-[20px] w-full flex-col lg:flex-row">
      <NavBar />
      <div className="flex-1 max-w-full overflow-hidden lg:pl-[120px] mt-[40px] lg:mt-0">
        {children}
      </div>
    </main>
  );
};

export default layout;
