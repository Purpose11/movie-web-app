import NavBar from "@/components/NavBar";
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex gap-[20px] w-full">
      <NavBar />
      <div className="flex-1 max-w-full overflow-hidden">{children}</div>
    </main>
  );
};

export default layout;
