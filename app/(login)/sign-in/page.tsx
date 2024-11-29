"use client"
import { ChangeEvent, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from "../../context/AuthContext";
import Cookies from "js-cookie";
type formData = {
  user: string,
  pwd: string
}

const Index = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<formData | {}>();
  const { setAuthData } = useAuth();
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {

    try {
      const response = await fetch("/api/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include"
      });
      console.log('response login', response)
      if (response.ok) {
        const savedRole = Cookies.get("role");
        const savedName = Cookies.get("full_name");
        const savedid = Cookies.get("user_id");
console.log(savedRole,savedName,savedid,'savedid')
        setAuthData(savedRole, savedName, savedid);
        router.push("/dashboard");
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  return (
    <div className=" w-full relative bg-[url('/login_image.jpg')] md:bg-[url('/')] h-screen">
      <div className="flex flex-col justify-between">
        <div className="md:pt-10 flex justify-end pr-7">
          <Image
            src={"/login_logo.png"}
            alt=""
            width={100}
            height={100}
          ></Image>
        </div>
        <div className="flex flex-col pb-5 justify-center items-center w-full px-20">
          <h1 className='text-center text-black text-[50px] font-medium pb-10'>
            MATS
          </h1>
          <input
            className="h-16 bg-[#ebebf6] rounded-full mb-4 p-4 w-full"
            type="text"
            placeholder="User Id"
            name="user"
            //size={50}
            required
            onChange={(e) => { handleOnChange(e) }}
          />
          <input
            className="h-16 bg-[#ebebf6] rounded-full p-4 my-5 w-full"
            type="password"
            placeholder="Password"
            name="pwd"
            // size={50}
            onChange={(e) => { handleOnChange(e) }}
            required
          />
          <h1 className="text-sm text-[#4b4b4b] font-normal pl-2 hover:cursor-pointer">
            Forgot Password ?
          </h1>
        </div>
        <div className="flex justify-center gap-5 pb-4">
          <button className="px-[35px] py-2 border border-[#000000] rounded-[50px]" onClick={handleSubmit}>
            Login
          </button>
          <button className="px-[35px] py-2  rounded-[50px] bg-black text-white">
            Sign Up
          </button>
        </div>
        <div>
          <div className='text-center text-[#848484] text-xs font-normal font-montserrat pb-[12px]'>
            Privacy Policy | Contact
          </div>
          <div className='text-center text-[#848484] text-xs font-normal font-montserrat mb-5'>
            <span className="font-bold">&#169; </span>2024 Meril Life Sciences
            Private Limited. All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
