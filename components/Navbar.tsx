"use client"
import React from 'react';
import Image from 'next/image';
import { useAppContext } from '@/app/context/module';
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const {user} = useAppContext();
  const pathname = usePathname();
  return (
    <div className='flex justify-between rounded-tl-[60px] text-black p-3 shadow-md'>
      <h1 className=' text-[#252424] text-[22px] pl-5 pt-2 font-semibold capitalize'>
        {pathname.substring(1).replace(/_/g," ")}
      </h1>
      <div className='flex gap-8'>
        <div className='pt-2'>  
<svg width="40" height="40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="50" height="50" fill="#1E1E1E"/>
<path d="M-7006 -1625H22516V-1645H-7006V-1625ZM22508 -1633V15395H22528V-1633H22508ZM22516 15387H-7006V15407H22516V15387ZM-6998 15395V-1633H-7018V15395H-6998ZM-7006 15387C-7001.58 15387 -6998 15390.6 -6998 15395H-7018C-7018 15401.6 -7012.63 15407 -7006 15407V15387ZM22508 15395C22508 15390.6 22511.6 15387 22516 15387V15407C22522.6 15407 22528 15401.6 22528 15395H22508ZM22516 -1625C22511.6 -1625 22508 -1628.59 22508 -1633H22528C22528 -1639.62 22522.6 -1645 22516 -1645V-1625ZM-7006 -1645C-7012.63 -1645 -7018 -1639.63 -7018 -1633H-6998C-6998 -1628.58 -7001.58 -1625 -7006 -1625V-1645Z" fill="white"/>
<g clipPath="url(#clip0_510_25177)">
<rect width="1728" height="1117" transform="translate(-1384 -42)" fill="#EBEBF6"/>
<path d="M-1034 7.99997C-1034 -19.6143 -1011.61 -42 -984 -42H344V1075H-984C-1011.61 1075 -1034 1052.61 -1034 1025V7.99997Z" fill="white"/>
<path d="M423.785 594.986C457.946 824.474 457.588 1039.21 429.408 1200.88C415.317 1281.72 394.276 1349.25 367.136 1398.72C339.993 1448.2 306.796 1479.53 268.412 1488.12C230.027 1496.71 189.943 1481.77 150.296 1447.24C110.653 1412.72 71.5093 1358.65 35.0374 1289.13C-37.9041 1150.09 -100.109 949.347 -134.269 719.859C-168.43 490.372 -168.072 275.631 -139.892 113.965C-125.801 33.1297 -104.76 -34.407 -77.62 -83.8775C-50.4773 -133.353 -17.2797 -164.684 21.1043 -173.273C59.4884 -181.862 99.5726 -166.929 139.22 -132.399C178.863 -97.872 218.007 -43.8025 254.479 25.7188C327.42 164.757 389.625 365.499 423.785 594.986Z" stroke="#1E1E1E" strokeOpacity="0.15"/>
<path d="M291.688 501.342C363.115 717.554 397.603 928.26 395.635 1094.13C394.65 1177.07 384.552 1248.76 365.418 1304.32C346.284 1359.89 318.14 1399.25 281.097 1417.65C244.053 1436.04 201.501 1431.79 156.222 1408.21C110.945 1384.64 62.998 1341.76 15.2167 1283.04C-80.3431 1165.61 -175.171 984.869 -246.598 768.657C-318.025 552.445 -352.513 341.74 -350.544 175.871C-349.56 92.9342 -339.461 21.2365 -320.328 -34.3256C-301.194 -89.8897 -273.05 -129.25 -236.006 -147.646C-198.962 -166.042 -156.411 -161.789 -111.132 -138.213C-65.8548 -114.637 -17.9075 -71.7654 29.8737 -13.0458C125.434 104.39 220.262 285.13 291.688 501.342Z" stroke="#1E1E1E" strokeOpacity="0.15"/>
<path d="M118.289 594.986C152.449 824.474 152.092 1039.21 123.912 1200.88C109.821 1281.72 88.7795 1349.25 61.6397 1398.72C34.4972 1448.2 1.29955 1479.53 -37.0845 1488.12C-75.4686 1496.71 -115.553 1481.77 -155.2 1447.24C-194.843 1412.72 -233.987 1358.65 -270.459 1289.13C-343.4 1150.09 -405.605 949.347 -439.765 719.859C-473.926 490.372 -473.568 275.631 -445.388 113.965C-431.297 33.1297 -410.256 -34.407 -383.116 -83.8775C-355.973 -133.353 -322.776 -164.684 -284.392 -173.273C-246.008 -181.862 -205.923 -166.929 -166.276 -132.399C-126.633 -97.872 -87.4895 -43.8025 -51.0176 25.7188C21.9239 164.757 84.1285 365.499 118.289 594.986Z" stroke="#1E1E1E" strokeOpacity="0.15"/>
<path d="M-28.1921 518.188C30.3997 738.415 52.4432 950.865 40.7312 1116.31C34.875 1199.04 20.5814 1269.98 -1.78243 1324.26C-24.1471 1378.55 -54.5527 1416.1 -92.6098 1432.18C-130.667 1448.25 -172.891 1441.38 -216.702 1415.06C-260.512 1388.73 -305.853 1342.98 -350.097 1281.42C-438.583 1158.3 -522.618 972.038 -581.209 751.812C-639.801 531.585 -661.845 319.135 -650.133 153.688C-644.277 70.9627 -629.983 0.0180303 -607.619 -54.263C-585.254 -108.546 -554.849 -146.099 -516.792 -162.176C-478.735 -178.253 -436.511 -171.383 -392.699 -145.056C-348.89 -118.73 -303.549 -72.9784 -259.305 -11.4177C-170.819 111.7 -86.784 297.962 -28.1921 518.188Z" stroke="#1E1E1E" strokeOpacity="0.15"/>
<g filter="url(#filter0_d_510_25177)">
<path d="M-1034 8C-1034 -19.6142 -1011.61 -42 -984 -42H344V78H-1034V8Z" fill="white"/>
</g>
<rect width="50" height="50" rx="9.37928" fill="#F5F5F5"/>
<path d="M24.9991 13.5713C20.2652 13.5713 16.4276 17.4088 16.4276 22.1427L16.4276 27.2653L15.4175 28.2754C15.0089 28.684 14.8867 29.2984 15.1078 29.8323C15.3289 30.3661 15.8498 30.7141 16.4276 30.7141L33.5705 30.7141C34.1483 30.7141 34.6692 30.3661 34.8903 29.8323C35.1114 29.2984 34.9892 28.684 34.5806 28.2754L33.5705 27.2653L33.5705 22.1427C33.5705 17.4088 29.7329 13.5713 24.9991 13.5713Z" fill="#111827"/>
<path d="M24.999 36.4284C22.6321 36.4284 20.7133 34.5096 20.7133 32.1427L29.2847 32.1427C29.2847 34.5096 27.366 36.4284 24.999 36.4284Z" fill="#111827"/>
<circle cx="29.8165" cy="15.476" r="4.35303" fill="#FF6B00" stroke="#F5F5F5" strokeWidth="1.56321"/>
</g>
<defs>
<filter id="filter0_d_510_25177" x="-1038" y="-42" width="1386" height="128" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_510_25177"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_510_25177" result="shape"/>
</filter>
<clipPath id="clip0_510_25177">
<rect width="1728" height="1117" fill="white" transform="translate(-1384 -42)"/>
</clipPath>
</defs>
</svg>
</div>
      <div className='flex flex-col pt-3'>
        <h1 className='text-xl font-semibold leading-[10px]'>{user}</h1> 
        <h1 className='text-[#5f5f5f] text-right'>Requester</h1>
        </div>
      <Image className='rounded-full w-12 h-12' src={"/boy.jpg"} alt={""} width={30} height={30}/>
        
    </div>
      </div>
  );
}

export default Navbar;
