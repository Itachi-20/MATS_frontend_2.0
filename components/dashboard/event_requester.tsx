'use client'
import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../app/context/AuthContext";
import { tableData } from "@/app/(afterlogin)/dashboard/page"
import { useRouter } from 'nextjs-toploader/app';
import { FormatDate } from '@/app/utility/dateFormatter';
type CardData = {
  total_count: number,
  preactivity_approved_count: number,
  postactivity_approved_count: number,
  draft_count: number,
}
type Props = {
  tableData: tableData[]
  carddata: CardData
}

const details = ({ ...Props }: Props) => {
  const { role, name, userid, clearAuthData } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  if (isLoading == true) {
    return (
      <>
        <div>loading please wait....</div>
      </>
    )
  }

  useEffect(() => {
    if (role != undefined) {
      setIsLoading(false);
    }
  }, [role])

  return (
    <div className="px-7 pb-7 pt-4 w-full relative z-20 flex flex-col justify-stretch">
      <div className="flex justify-between pb-6">
        <div className="">
          <h1 className="text-black text-[20px] font-semibold pb-4 pl-1">
            Request Summary
          </h1>
          <div className="grid grid-cols-4 gap-5 text-black">
            <div className="flex flex-col col-span-1 bg-[#fee4cb] py-5 pl-5 pr-20 rounded-2xl">
              <div className="pb-2">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Icon">
                    <circle
                      id="Ellipse 3"
                      cx="20"
                      cy="20"
                      r="20"
                      fill="black"
                    />
                    <g id="Sales Icon">
                      <g id="Group 916">
                        <path
                          id="Subtract"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13 11C11.8954 11 11 11.8954 11 13V27C11 28.1046 11.8954 29 13 29H27C28.1046 29 29 28.1046 29 27V13C29 11.8954 28.1046 11 27 11H13ZM16 21C16 20.4477 15.5523 20 15 20C14.4477 20 14 20.4477 14 21V25C14 25.5523 14.4477 26 15 26C15.5523 26 16 25.5523 16 25V21ZM20 17C20.5523 17 21 17.4477 21 18V25C21 25.5523 20.5523 26 20 26C19.4477 26 19 25.5523 19 25V18C19 17.4477 19.4477 17 20 17ZM26 15C26 14.4477 25.5523 14 25 14C24.4477 14 24 14.4477 24 15V25C24 25.5523 24.4477 26 25 26C25.5523 26 26 25.5523 26 25V15Z"
                          fill="white"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <h1 className="text-[#151d48] text-xl font-semibold">{Props.carddata?.total_count}</h1>
              <h1 className="text-[#415165] text-base font-semibold pt-2">
                Total Events
              </h1>
              {/* <h1 className="text-[#4078ec] text-xs font-medium">
                    +8% from yesterday
                  </h1> */}
            </div>
            <div className="flex flex-col col-span-1 bg-[#dbf6fd] py-5 pl-5 pr-20 rounded-2xl">
              <div className="pb-2">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Icon">
                    <circle
                      id="Ellipse 3"
                      cx="20"
                      cy="20"
                      r="20"
                      fill="black"
                    />
                    <path
                      id="Arrow 2"
                      d="M21.0607 21.0607C21.6464 20.4749 21.6464 19.5251 21.0607 18.9393L11.5147 9.3934C10.9289 8.80761 9.97919 8.80761 9.3934 9.3934C8.80761 9.97919 8.80761 10.9289 9.3934 11.5147L17.8787 20L9.3934 28.4853C8.80761 29.0711 8.80761 30.0208 9.3934 30.6066C9.97919 31.1924 10.9289 31.1924 11.5147 30.6066L21.0607 21.0607ZM0 21.5H20V18.5H0V21.5Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </div>
              <h1 className="text-[#151d48] text-xl font-semibold">{Props.carddata?.preactivity_approved_count}</h1>
              <h1 className="text-[#415165] text-base font-semibold pt-2">
                Total  Pre-activity
              </h1>
              {/* <h1 className="text-[#4078ec] text-xs font-medium">
                    +8% from yesterday
                  </h1> */}
            </div>
            <div className="flex flex-col col-span-1 bg-[#ffd3e2] py-5 pl-5 pr-20 rounded-2xl">
              <div className="pb-2">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Icon">
                    <circle
                      id="Ellipse 3"
                      cx="20"
                      cy="20"
                      r="20"
                      fill="black"
                    />
                    <path
                      id="Subtract"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20 32C26.6274 32 32 26.6274 32 20C32 13.3726 26.6274 8 20 8C13.3726 8 8 13.3726 8 20C8 26.6274 13.3726 32 20 32ZM21.9599 23.3739C22.3504 23.7644 22.9836 23.7644 23.3741 23.3739C23.7646 22.9833 23.7646 22.3502 23.3741 21.9596L21.4142 19.9998L23.3734 18.0405C23.764 17.65 23.764 17.0168 23.3734 16.6263C22.9829 16.2358 22.3498 16.2358 21.9592 16.6263L20 18.5855L18.0408 16.6263C17.6502 16.2358 17.0171 16.2358 16.6266 16.6263C16.236 17.0168 16.236 17.65 16.6266 18.0405L18.5858 19.9998L16.6259 21.9596C16.2354 22.3502 16.2354 22.9833 16.6259 23.3739C17.0164 23.7644 17.6496 23.7644 18.0401 23.3739L20 21.414L21.9599 23.3739ZM23.4442 11.6851C21.5205 10.8883 19.38 10.7831 17.3874 11.3875C15.3949 11.992 13.6736 13.2686 12.5168 14.9999C11.36 16.7311 10.8392 18.81 11.0433 20.8822C11.2474 22.9543 12.1637 24.8916 13.636 26.364C14.0266 26.7545 14.6597 26.7545 15.0503 26.364C15.4408 25.9734 15.4408 25.3403 15.0503 24.9497C13.9051 23.8046 13.1924 22.2978 13.0337 20.6861C12.875 19.0744 13.28 17.4576 14.1797 16.111C15.0795 14.7645 16.4183 13.7715 17.968 13.3014C19.5178 12.8313 21.1826 12.9131 22.6788 13.5328C24.175 14.1526 25.41 15.272 26.1735 16.7002C26.9369 18.1285 27.1814 19.7773 26.8655 21.3656C26.5495 22.954 25.6926 24.3837 24.4408 25.4111C23.1889 26.4385 21.6195 27 20 27C19.4477 27 19 27.4477 19 28C19 28.5523 19.4477 29 20 29C22.0822 29 24.1 28.278 25.7095 26.9571C27.3191 25.6362 28.4209 23.798 28.8271 21.7558C29.2333 19.7136 28.9188 17.5938 27.9373 15.7574C26.9558 13.9211 25.3679 12.4819 23.4442 11.6851Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </div>
              <h1 className="text-[#151d48] text-xl font-semibold">{Props.carddata?.postactivity_approved_count}</h1>
              <h1 className="text-[#415165] text-base font-semibold pt-2">
                Total Post-activity
              </h1>
              {/* <h1 className="text-[#4078ec] text-xs font-medium">
                    +8% from yesterday
                  </h1> */}
            </div>
            <div className="flex flex-col col-span-1 bg-[#B5D9FF] py-5 pl-5 pr-20 rounded-2xl">
              <div className="pb-2">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Icon">
                    <circle
                      id="Ellipse 3"
                      cx="20"
                      cy="20"
                      r="20"
                      fill="black"
                    />
                    <path
                      id="Subtract"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20 32C26.6274 32 32 26.6274 32 20C32 13.3726 26.6274 8 20 8C13.3726 8 8 13.3726 8 20C8 26.6274 13.3726 32 20 32ZM21.9599 23.3739C22.3504 23.7644 22.9836 23.7644 23.3741 23.3739C23.7646 22.9833 23.7646 22.3502 23.3741 21.9596L21.4142 19.9998L23.3734 18.0405C23.764 17.65 23.764 17.0168 23.3734 16.6263C22.9829 16.2358 22.3498 16.2358 21.9592 16.6263L20 18.5855L18.0408 16.6263C17.6502 16.2358 17.0171 16.2358 16.6266 16.6263C16.236 17.0168 16.236 17.65 16.6266 18.0405L18.5858 19.9998L16.6259 21.9596C16.2354 22.3502 16.2354 22.9833 16.6259 23.3739C17.0164 23.7644 17.6496 23.7644 18.0401 23.3739L20 21.414L21.9599 23.3739ZM23.4442 11.6851C21.5205 10.8883 19.38 10.7831 17.3874 11.3875C15.3949 11.992 13.6736 13.2686 12.5168 14.9999C11.36 16.7311 10.8392 18.81 11.0433 20.8822C11.2474 22.9543 12.1637 24.8916 13.636 26.364C14.0266 26.7545 14.6597 26.7545 15.0503 26.364C15.4408 25.9734 15.4408 25.3403 15.0503 24.9497C13.9051 23.8046 13.1924 22.2978 13.0337 20.6861C12.875 19.0744 13.28 17.4576 14.1797 16.111C15.0795 14.7645 16.4183 13.7715 17.968 13.3014C19.5178 12.8313 21.1826 12.9131 22.6788 13.5328C24.175 14.1526 25.41 15.272 26.1735 16.7002C26.9369 18.1285 27.1814 19.7773 26.8655 21.3656C26.5495 22.954 25.6926 24.3837 24.4408 25.4111C23.1889 26.4385 21.6195 27 20 27C19.4477 27 19 27.4477 19 28C19 28.5523 19.4477 29 20 29C22.0822 29 24.1 28.278 25.7095 26.9571C27.3191 25.6362 28.4209 23.798 28.8271 21.7558C29.2333 19.7136 28.9188 17.5938 27.9373 15.7574C26.9558 13.9211 25.3679 12.4819 23.4442 11.6851Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </div>
              <h1 className="text-[#151d48] text-xl font-semibold">{Props.carddata?.draft_count}</h1>
              <h1 className="text-[#415165] text-base font-semibold pt-2">
                Events Save as Draft
              </h1>
              {/* <h1 className="text-[#4078ec] text-xs font-medium">
                    +8% from yesterday
                  </h1> */}
            </div>
          </div>
        </div>
        <div className="text-black"></div>
      </div>
      <div className="flex justify-between">
        <div className="border border-[#848484] p-7 rounded-[50px] w-full mr-4  bg-white">
          <h1 className="text-[#05004e] flex justify-between items-center text-xl font-semibold">
            All Request
            <Button className='text-[#625d5d] bg-[#E0E9FF] rounded-xl hover:underline' onClick={() => { router.push('/event_list') }}>Event List</Button>
          </h1>
          <div className="flex justify-between pb-5 gap-40">
            {/* <div className="relative">
              <Input
                className="bg-[#ecf2ff] rounded-full text-black pr-10 focus-visible:outline-none focus-visible:border-none focus:outline-none focus:border-none"
                placeholder="Search"
                size={40}
              ></Input>
              <svg
                className="absolute right-3 top-3"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Group 1707479612">
                  <path
                    id="Vector"
                    d="M6.10129 0.961067C7.11792 0.96014 8.11199 1.26043 8.95774 1.82394C9.80349 2.38745 10.4629 3.18887 10.8526 4.12681C11.2423 5.06476 11.3447 6.09708 11.147 7.09319C10.9492 8.0893 10.4601 9.00445 9.74158 9.72285C9.02305 10.4413 8.10734 10.9306 7.11032 11.1291C6.11329 11.3276 5.07973 11.2262 4.1404 10.8378C3.20107 10.4494 2.39816 9.79138 1.83326 8.94708C1.26835 8.10278 0.966823 7.11008 0.966823 6.09457C0.972986 4.73579 1.51577 3.43434 2.4772 2.47309C3.43864 1.51184 4.74102 0.968465 6.10129 0.961067ZM6.10129 4.51938e-10C4.89457 3.62551e-10 3.71495 0.35744 2.7116 1.02712C1.70825 1.6968 0.926228 2.64864 0.464436 3.76228C0.00264368 4.87592 -0.118182 6.10133 0.117237 7.28357C0.352657 8.4658 0.933749 9.55175 1.78703 10.4041C2.64031 11.2564 3.72746 11.8369 4.91099 12.072C6.09453 12.3072 7.32129 12.1865 8.43616 11.7252C9.55102 11.2639 10.5039 10.4828 11.1743 9.48054C11.8448 8.47829 12.2026 7.29996 12.2026 6.09457C12.2026 4.47819 11.5598 2.92801 10.4156 1.78506C9.27134 0.642105 7.71946 5.71801e-10 6.10129 4.51938e-10Z"
                    fill="black"
                  />
                  <path
                    id="Vector_2"
                    d="M14.8637 14.2L11.4047 10.7214L10.7383 11.3825L14.1972 14.8611C14.2407 14.9048 14.2923 14.9395 14.3492 14.9633C14.4061 14.9871 14.4671 14.9994 14.5288 14.9996C14.5905 14.9998 14.6516 14.9879 14.7086 14.9645C14.7657 14.9412 14.8176 14.9068 14.8613 14.8634C14.9051 14.82 14.9399 14.7684 14.9637 14.7116C14.9875 14.6548 14.9998 14.5938 15.0001 14.5322C15.0003 14.4706 14.9883 14.4096 14.9649 14.3526C14.9416 14.2956 14.9071 14.2437 14.8637 14.2Z"
                    fill="black"
                  />
                </g>
              </svg>
            </div> */}

          </div>
          <div className=' h-[250px] text-black'>
            <Table className=''>
              <TableHeader className={"bg-[#E0E9FF]"}>
                <TableRow className={""}>
                  <TableHead
                    className={
                      "text-center rounded-tl-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                  >
                    Request Number
                  </TableHead>
                  <TableHead
                    className={
                      "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                  >
                    Event Type
                  </TableHead>

                  <TableHead
                    className={
                      "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                  >
                    Event Start Date
                  </TableHead>
                  <TableHead
                    className={
                      "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                  >
                    Event End Date
                  </TableHead>
                  {/* <TableHead
                    className={
                      "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                  >
                    Event  Status
                  </TableHead> */}
                  <TableHead  
                    className={
                      "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                  >
                    Status
                  </TableHead>
                  <TableHead
                    className={
                      "text-center rounded-tr-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                  ></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='text-center'>
                {
                  Props && role == "Event Requestor" && Props.tableData?.map((item, index) => {
                    return (
                      <TableRow>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.event_type}</TableCell>

                        <TableCell>{FormatDate(item.event_start_date) ?? "-"}</TableCell>
                        <TableCell>{FormatDate(item.event_end_date) ?? "-"} </TableCell>
                        {/* <TableCell>{item.status}</TableCell> */}
                        <TableCell>{item.brief_status}</TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default details