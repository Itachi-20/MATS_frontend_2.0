import React from 'react';
import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import Image from 'next/image';

    type DocumentRow = {
        name: string;
        file_name: string;
        file_url: string;
    };

    type ActualVendor = {
        name: string;
        // creation: string;
        // modified: string;
        // modified_by: string;
        // owner: string;
        // docstatus: number;
        // idx: number;
        vendor_type: string;
        actual_amount: number;
        status: string;
        vendor_name: string;
        advance: number;
        // budget_category: string;
        // est_amount: number;
        // gst_included: number;
        gst: string;
        // parent: string;
        // parentfield: string;
        // parenttype: string;
        // occurrence_no: number;
        // attachment: string | null;
        // event_conclusion: string | null;
        // advance_expense_check: number;
        // post_expense_check: number;
        document_no: string | null;
        invoice_date: string | null;
        invoice_amount: number;
        division: string;
        nature: string | null;
        gl_code: string | null;
        zone: string | null;
        // finance_remark: string | null;
        posting_date: string | null;
        basic_amount: number;
        tds: number;
        cost_center: string | null;
        company_name: string;
        utr_number: string | null;
        state: string;
        invoice_number: string | null;
        // finance_gst: string | null;
        net_amount: number;
        // cc_name: string | null;
        // gl_name: string | null;
        payment_date: string | null;
        // city: string | null;
        file: string | null;
        // narration: string | null;
    };

  type Props = {
    expensetabledata: ActualVendor[] | undefined; // Props includes the tableData field
    
  };

const table = ({ ...Props }: Props) => {
  const [fileData, setFileData] = useState<DocumentRow[] | undefined>();
  const [open, setOpen] = useState(false);

    const handleSetFileData = async (file: any) => {
        // console.log(file, 'file in setfile ')
        setFileData(file);
        setOpen(true)
      };
  return (
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
              {/* <TableHead
            className={
              "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
            }
          >
            Vendor Code
          </TableHead> */}

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
                Billable Amount
              </TableHead>
              <TableHead
                className={
                  "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Status
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
              </TableHead>
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
              </TableHead>*/}
              <TableHead
                className={
                  "text-center rounded-r-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat'] sticky right-0 z-20 bg-[#E0E9FF]"
                }
              >Action</TableHead> 
            </TableRow>
          </TableHeader>
          {
            Props.expensetabledata ?
              <TableBody>
                {Props?.expensetabledata &&
                  Props?.expensetabledata?.map((data, index) => {
                    return (
                      <TableRow key={index} className="text-center text-nowrap text-black">
                        <TableCell>{data.name}</TableCell>
                        <TableCell>{data.vendor_type}</TableCell>
                        {/* <TableCell>{data.vendor_code}</TableCell> */}
                        <TableCell>{data.vendor_name}</TableCell>
                        <TableCell>{data.advance}</TableCell>
                        <TableCell>{data.status}</TableCell>
                        <TableCell>{data.gst}</TableCell>
                        <TableCell>{data.invoice_amount}</TableCell>
                        <TableCell>{data.tds}</TableCell>
                        <TableCell>{data.net_amount}</TableCell>
                        {/* <TableCell>{data.utr_number}</TableCell>
                        <TableCell>{data.payment_date}</TableCell> */}
                        <TableCell className='sticky right-0 z-20 gap-3 w-[120px] bg-white mt-2 flex border-l'>
                          <button onClick={() => handleSetFileData(data.file)}><Image src={'/svg/view.svg'} alt='viewsvg' width={24} height={18} /></button>
                          {/* <Image src={'/svg/view.svg'} alt='viewsvg' width={24}  height={18}/> */}
                          <Image src={'/svg/editIcon.svg'} alt='editsvg' width={20} height={18} />
                          <Image src={'/svg/delete.svg'} alt='deletesvg' width={20} height={18} />
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
  )
}

export default table