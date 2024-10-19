import Image from "next/image";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="bg-white h-screen md:flex text-black md:justify-between">
      <div className="w-[60%] text-white relative md:block hidden">
        <Image
          className=""
          src={"/login_image.jpg"}
          alt={"error_loading_image"}
          // width={"500"}
          // height={"100"}
          layout="fill"
          ></Image>
        <div className="absolute top-56 left-16 align-middle">
          <h1 className="text-[#6e6e6e] text-6xl font-light font-['Poppins']">
            Enter the Hub of
          </h1>
          <h1
            className="text-white text-[80px]"
            >
            Company Dynamics
          </h1>
        </div>
      </div>
        {children}
        </div>
  );
}
