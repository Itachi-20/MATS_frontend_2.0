import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'nextjs-toploader/app';
import { Toaster, toast } from 'sonner'
import { Button } from '@/components/ui/button';
import { Loader2 } from "lucide-react";
type EventTable = {
  name: string;
  vendor_type: string;
  vendor_name: string;
  remark: string;
  pan_number: string;
  vendor_code: string;
  email: string;
  contact_number: string;
  status: string;

}[];

type particularVendorData = {
  name: string;
  vendor_type: string;
  vendor_name: string;
  remark: string;
  pan_number: string;
  vendor_code: string;
  email: string;
  contact_number: string;
  status: string;
}

type Props = {
  vendorData: EventTable | undefined;
  handleDeleteVendor: (value: string) => void;
  isViewDocument: React.Dispatch<React.SetStateAction<boolean>>
};
const table = ({ ...Props }: Props) => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (Props?.vendorData) {
      setLoading(false)
    }else{
      setLoading(false);
    }
  }, []);
  return (
    <div className="border bg-white h-full p-4 rounded-[18px]">
      <Table className={""}>
        <TableHeader className={"bg-[#E0E9FF]"}>
          <TableRow className={"text-nowrap text-[#625d5d] text-[15px] font-normal font-['Montserrat']"}>
            <TableHead
              className={
                "text-center rounded-l-2xl"
              }
            >
              Vendor Type
            </TableHead>
            <TableHead
              className={
                "text-center"
              }
            >
              Vendor Name
            </TableHead>
            <TableHead
              className={
                "text-center"
              }
            >
              Vendor Code
            </TableHead>

            <TableHead
              className={
                "text-center "
              }
            >
              PAN Number
            </TableHead>
            <TableHead
              className={
                "text-center "
              }
            >
              Email
            </TableHead>
            <TableHead
              className={
                "text-center "
              }
            >
              Contact
            </TableHead>
            <TableHead
              className={
                "text-center"
              }
            >
              Remark
            </TableHead>
            <TableHead
              className={
                "text-center "
              }
            >
              Status
            </TableHead>
            <TableHead
              className={
                "text-center rounded-r-2xl sticky right-0 z-30 bg-[#E0E9FF]"
              }
            >
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        {
          loading ? <TableBody><TableRow ><TableCell colSpan={9} ><>
            <div className='flex items-center justify-center'>
              <Loader2 className=" mr-2 h-4 w-4 animate-spin" />
              Loading...
            </div>
          </></TableCell></TableRow></TableBody> :
             Props?.vendorData ?
              <TableBody>
                {Props &&
                  Props.vendorData?.map((data, index) => {
                    return (
                      <TableRow key={index} className="text-center text-nowrap">
                        <TableCell>{data.vendor_type}</TableCell>
                        <TableCell>{data.vendor_name}</TableCell>
                        <TableCell>{data.vendor_code}</TableCell>
                        <TableCell>{data.pan_number}</TableCell>
                        <TableCell>{data.email}</TableCell>
                        <TableCell>{data.contact_number}</TableCell>
                        <TableCell>{data.remark}</TableCell>
                        <TableCell>{data.status}
                          {/* {data.status == "Approved" ? data.status :<Button className="bg-[#F0EDFF] w-[75px] text-[#4430BF] text-sm  rounded-md font-semibold hover:underline capitalize" onClick={() => router.push(`/add_vendor?refno=${data.name}`)}>Approve</Button>} */}
                        </TableCell>

                        <TableCell className="flex space-x-6 items-center justify-center border-l-2 sticky right-0 bg-[white] z-30">
                          {/* <div className="hover:cursor-pointer" onClick={() => router.push(`/add_vendor?refno=${data.name}&view=view`)}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                        <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                      </svg>
                    </div> */}
                          <div className="hover:cursor-pointer" onClick={() => router.push(`/add_vendor?refno=${data.name}`)}>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g id="Group">
                                <g id="Vector">
                                  <mask
                                    id="path-1-inside-1_600_27491"
                                    fill="white"
                                  >
                                    <path d="M3.52929 4.70557H2.35286C1.72884 4.70557 1.13038 4.95346 0.689136 5.3947C0.24789 5.83595 0 6.43441 0 7.05842V17.6463C0 18.2703 0.24789 18.8688 0.689136 19.31C1.13038 19.7512 1.72884 19.9991 2.35286 19.9991H12.9407C13.5647 19.9991 14.1632 19.7512 14.6044 19.31C15.0457 18.8688 15.2936 18.2703 15.2936 17.6463V16.4699" />
                                  </mask>
                                  <path
                                    d="M2.35286 4.70557V3.70557V4.70557ZM0 7.05842H-1H0ZM0 17.6463H-1H0ZM3.52929 3.70557H2.35286V5.70557H3.52929V3.70557ZM2.35286 3.70557C1.46362 3.70557 0.610812 4.05881 -0.0179709 4.6876L1.39624 6.10181C1.64995 5.8481 1.99406 5.70557 2.35286 5.70557V3.70557ZM-0.0179709 4.6876C-0.646754 5.31638 -1 6.16919 -1 7.05842H1C1 6.69962 1.14253 6.35552 1.39624 6.10181L-0.0179709 4.6876ZM-1 7.05842V17.6463H1V7.05842H-1ZM-1 17.6463C-1 18.5355 -0.646754 19.3883 -0.0179709 20.0171L1.39624 18.6029C1.14253 18.3492 1 18.0051 1 17.6463H-1ZM-0.0179709 20.0171C0.610811 20.6459 1.46362 20.9991 2.35286 20.9991V18.9991C1.99406 18.9991 1.64995 18.8566 1.39624 18.6029L-0.0179709 20.0171ZM2.35286 20.9991H12.9407V18.9991H2.35286V20.9991ZM12.9407 20.9991C13.8299 20.9991 14.6828 20.6459 15.3115 20.0171L13.8973 18.6029C13.6436 18.8566 13.2995 18.9991 12.9407 18.9991V20.9991ZM15.3115 20.0171C15.9403 19.3883 16.2936 18.5355 16.2936 17.6463H14.2936C14.2936 18.0051 14.151 18.3492 13.8973 18.6029L15.3115 20.0171ZM16.2936 17.6463V16.4699H14.2936V17.6463H16.2936Z"
                                    fill="#636363"
                                    mask="url(#path-1-inside-1_600_27491)"
                                  />
                                </g>
                                <path
                                  id="Vector_2"
                                  d="M19.2765 4.21762C19.7398 3.75429 20.0001 3.12588 20.0001 2.47063C20.0001 1.81538 19.7398 1.18696 19.2765 0.72363C18.8131 0.260297 18.1847 8.45587e-09 17.5295 0C16.8742 -8.45587e-09 16.2458 0.260297 15.7825 0.72363L6.61636 9.85705C6.14677 10.325 5.88281 10.9606 5.88281 11.6235C5.88281 13.0008 6.9993 14.1173 8.37655 14.1173C9.03947 14.1173 9.67511 13.8533 10.143 13.3837L19.2765 4.21762ZM14.1178 2.35298L17.6471 5.88227L14.1178 2.35298Z"
                                  fill="black"
                                />
                              </g>
                            </svg>
                          </div>
                          {/* <Image src={"/svg/delete.svg"} width={20} height={20} alt='view-document' className='cursor-pointer' onClick={() => Props.handleDeleteVendor(data.name)} /> */}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>

              :
                <TableBody>
                <TableRow className="text-center text-nowrap">
                <TableCell className="" colSpan={9}>No Result</TableCell>
                </TableRow>
                
                </TableBody>
              }
      </Table>
      <Toaster richColors position="top-right" />
    </div>
  )
}

export default table