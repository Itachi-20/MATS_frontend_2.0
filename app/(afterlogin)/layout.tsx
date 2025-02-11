"use client"
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import NextTopLoader from 'nextjs-toploader';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="en">
    //   <body>
    <>
        {/* <NProgress
          color="#29d"
          stopDelayMs={1000}
          height={10}
          /> */}
        <NextTopLoader
        color="#4430bf"
        initialPosition={0.4}
        crawlSpeed={500}
        height={6}
        crawl={true}
        showSpinner={true}
        easing="ease"
        speed={200}
        shadow="0 0 10px ##4430bf,0 0 5px #4430bf"
        zIndex={1600}
        showAtBottom={true}
        />
        <div className="h-screen bg-[#EBEBF6] grid grid-cols-6 relative overflow-hidden">
          <div className="col-span-1 mx-auto max-w-[200px]">
            <Sidebar />
          </div>
          {/* <Image
             className=" w-full absolute z-10 -top-96 -right-[500px] -rotate-6"
             src={"/Lines.png"}
             alt=""
             width={1500}
             height={100}
             ></Image> */}
          <div className="col-span-5 border-2 rounded-l-[60px] w-full h-screen bg-white overflow-scroll overflow-x-hidden">
            <div className="sticky top-0 bg-white z-30">
              <Navbar />
            </div>
            {children}
          </div>
        </div>
        </>
    //   </body>
    // </html>
  );
}