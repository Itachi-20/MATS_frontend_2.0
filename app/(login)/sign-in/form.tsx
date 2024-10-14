import React from 'react'
import Image from 'next/image'
const Form = () => {
  return (
    <div className="md:w-[40%] flex justify-center relative bg-[url('/login_image.jpg')] md:bg-[url('/')] h-screen">
        <div className="flex flex-col justify-between">
          <div className="md:pt-10 flex justify-end">
            <Image
              src={"/login_logo.png"}
              alt=""
              width={100}
              height={100}
            ></Image>
          </div>
          <div className="flex flex-col pb-5">
            <h1 className='text-center text-black text-[50px] font-medium pb-10'>
              MATS
            </h1>
            <input
              className="h-16 bg-[#ebebf6] rounded-full mb-4 p-4"
              type="text"
              placeholder="User Id"
              //size={50}
              required
            />
            <input
              className="h-16 bg-[#ebebf6] rounded-full p-4 my-5"
              type="password"
              placeholder="Password"
             // size={50}
              required
            />
            <h1 className="text-sm text-[#4b4b4b] font-normal pl-2 hover:cursor-pointer">
              Forgot Password ?
            </h1>
          </div>
          <div className="flex justify-center gap-5 pb-4">
            <button className="px-[35px] py-2 border border-[#000000] rounded-[50px]">
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

export default Form
