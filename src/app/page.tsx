"use client";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginBtnClicked, setIsLogInBtnClicked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = () => {
    setIsLogInBtnClicked(true);
    if (email === "test@test.com" && password === "password") {
      toast({ description: "You are now signed in" });
      router.push("/home");
    } else {
      toast({
        variant: "destructive",
        description: "Invalid Email or Password",
      });
    }
  };
  return (
    <main
      className="w-full h-screen"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/bg.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="lg:text-5xl text-3xl font-BebasNeue pt-[20px] pl-[40px] text-[#E50914]">
        TrailerFlix
      </h1>
      <div className="lg:w-[30%] w-[80%] mx-auto h-fit bg-black/70 px-[20px] py-[20px] lg:mt-[20px] mt-[50px]">
        <div className="w-[80%] mx-auto lg:mt-8 mt-5">
          <h2 className="lg:text-2xl text-xl">Sign In</h2>
          <input
            type="email"
            value={email}
            placeholder="Email or phone number"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[50px] rounded-sm outline-none bg-[#333333] placeholder:text-[#6D6B6B] lg:text-base text-sm p-4 text-white mt-5"
          />
          {isLoginBtnClicked && email === "" && (
            <p className="lg:text-xs text-[10px] text-red-500">
              Email is required
            </p>
          )}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[50px] rounded-sm outline-none bg-[#333333] placeholder:text-[#6D6B6B] lg:text-base text-base p-4 text-white mt-5 pr-[25px]"
            />

            {showPassword ? (
              <AiOutlineEyeInvisible
                className=" absolute lg:bottom-[15px] bottom-[17px] right-[7px] shrink-0 lg:w-[16px] lg:h-[16px] w-[14px] h-[14px] cursor-pointer text-[#6D6B6B]"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <AiOutlineEye
                className=" absolute lg:bottom-[15px] bottom-[17px] right-[7px] shrink-0 lg:w-[16px] lg:h-[16px] w-[14px] h-[14px] cursor-pointer text-[#6D6B6B]"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
          {isLoginBtnClicked && password === "" && (
            <p className="lg:text-xs text-[10px] text-red-500">
              Password is required
            </p>
          )}
          <button
            type="submit"
            className="flex items-center justify-center h-[50px] w-full rounded-sm bg-[#E50914] mt-9 font-semibold lg:text-base text-sm "
            onClick={handleLogin}
          >
            {" "}
            Sign In
          </button>
          <div className="w-full flex justify-between items-center mt-4">
            <div className="flex items-center gap-1">
              <Checkbox id="terms" className="border-white" />
              <label
                htmlFor="terms"
                className="lg:text-sm text-xs text-[#8E9689] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>
            <p className="lg:text-sm text-xs text-[#8E9689]">Need help?</p>
          </div>
          <div className="mt-8">
            <p className="lg:text-base text-sm text-[#656565]">
              New to Trailerflix?{" "}
              <span className="cursor-pointer text-[#F5F3F2] font-semibold">
                Sign up now
              </span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
