"use client"
import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ViewDocument from '@/components/viewDocument';

type DocumentRow = {
    name: string,
    file_name: string;
    createdDate: string;
    createdBy: string;
    file_url: string;
  };

type Props = {
    tabledata:any
    files:any
}

const TravelVendor = ({...Props}:Props) => {
    const [fileData, setFileData] = useState<DocumentRow[] | undefined>();
    const [open, setOpen] = useState(false);
    const handleSetFileData = async (file: any) => {
        setFileData(file);
        setOpen(true)
      };
  return (
    <>
    <div className='p-8'>

    {
        Props?.tabledata?.travel_requests &&
        <>
          <h3 className='text-2xl font-semibold text-black'>Travel Desk</h3>
          <div className="border bg-white h-full p-4 rounded-[18px] my-6">
            <Table className={""}>
              <TableHeader className={"bg-[#E0E9FF]"}>
                <TableRow className={"text-nowrap rounded-r-2xl border-none"}>
                  <TableHead
                    className={
                        "text-center rounded-l-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                    >
                    Event Request Number
                  </TableHead>
                  <TableHead
                    className={
                        "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                    >
                    Vendor Type
                  </TableHead>
                  <TableHead
                    className={
                        "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                    >
                    Vendor Code
                  </TableHead>

                  <TableHead
                    className={
                        "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                    >
                    Vendor Name
                  </TableHead>

                  <TableHead
                    className={
                        "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                    >
                    Actual Amount
                  </TableHead>
                  <TableHead
                    className={
                        "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                    >
                    Total Amount
                  </TableHead>
                  <TableHead
                    className={
                        "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                    >
                    Status
                  </TableHead>
                  {/* <TableHead
                    className={
                        "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                        }
                        >
                        Approval Status
                        </TableHead>
                        <TableHead
                        className={
                            "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                            }
                            >
                            GST
                            </TableHead>

                            <TableHead
                  className={
                    "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                    >
                    Invoice Amount
                    </TableHead>
                    <TableHead
                    className={
                        "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                        }
                        >
                        TDS
                        </TableHead>
                        <TableHead
                        className={
                            "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                            }
                            >
                            Net Amount
                            </TableHead> */}
                  {/* <TableHead
                    className={
                        "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                        }
                        >
                        UTR Number
                        </TableHead>
                        <TableHead
                        className={
                            "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                    }
                    >
                    Payment Date
                    </TableHead> */}
                  <TableHead
                    className={
                        "text-center rounded-r-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat'] sticky right-0 z-20 bg-[#E0E9FF]"
                    }
                    >Action</TableHead>
                </TableRow>
              </TableHeader>
              {
                  Props.tabledata?.travel_requests &&
                  Props.tabledata?.travel_requests.length > 0 ?
                  <TableBody>
                    {Props.tabledata &&
                      Props.tabledata.travel_requests.map((data:any, index:any) => {
                          return (
                              <TableRow key={index} className="text-center text-nowrap text-black">
                            <TableCell>{Props?.tabledata?.name ?? "-"}</TableCell>
                            <TableCell>{data.vendor_type ?? "-"}</TableCell>
                            <TableCell>{data.vendor_code ?? "-"}</TableCell>
                            <TableCell>{data.vendor_name ?? "-"}</TableCell>
                            <TableCell>{data.est_amount ?? "-"}</TableCell>
                            <TableCell>{data.actual_amount ?? "-"}</TableCell>
                            <TableCell>{data.status ?? "-"}</TableCell>
                            {/* <TableCell>{data.brief_status ?? "-"}</TableCell>
                            <TableCell>{data.gst ?? "-"}</TableCell>
                            <TableCell>{data.invoice_amount ?? "-"}</TableCell>
                            <TableCell>{data.tds ?? "-"}</TableCell>
                            <TableCell>{data.net_amount ?? "-"}</TableCell> */}
                            {/* <TableCell>{data.utr_number ?? "-"}</TableCell>
                            <TableCell>{data.payment_date ?? "-"}</TableCell> */}

                            <TableCell className='sticky right-0 z-20 gap-4 w-[120px] bg-white mt-2 flex border-l justify-center mb-2'>
                              <div className='p-0 cursor-pointer hover:opacity-60' onClick={() => handleSetFileData(data?.files)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                  <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                                </svg>
                              </div>
                              {/* <Image src={'/svg/editIcon.svg'} alt='editsvg' width={20} height={18} /> */}
                            </TableCell>
                          </TableRow>
                        );
                    })}
                  </TableBody>
                  :
                  <TableBody>
                    <TableRow className="text-center text-black text-nowrap ">
                      <TableCell colSpan={9}>No Results</TableCell>
                    </TableRow>
                  </TableBody>
              }
            </Table>
          </div>
          {
              open &&
              <div className='text-black'>
        <ViewDocument setClose={setOpen} data={fileData} />
        </div>
      }
        </>
      }
      </div>
      </>
  )
}

export default TravelVendor