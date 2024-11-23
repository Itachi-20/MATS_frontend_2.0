'use client'
import React,{useState} from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type Data = {
name: string;
occurence: Occurence[];
}

type Occurence = {
occurence_no: number,
event_type: string,
advance_request: AdvanceRequest[];
}

type AdvanceRequest = {
  "name": string,
  "vendor_name": string,
  "vendor_type": string,
  "advance": number,
  "est_amount":number,
  "status": string,
  "owner": string,
  "level1": string,
  "level2": string,
  "level3": null,
  "level4": null,
  "level5": null,
  "level6": null,
  "level7": null,
  "status1": null,
  "status2": null,
  "status3": null,
  "status4": null,
  "status5": null,
  "status6": null,
  "status7": null,
  "is_approved": boolean
}

type EventTable = {
  request_number: string;
  event_name: string;
  event_type: string;
  event_date: string;
  total_expense: number;
  event_requestor: string;
};

const events: EventTable[] = [
  {
    request_number: 'REQ001',
    event_name: 'Annual Conference',
    event_type: 'Conference',
    event_date: '2024-10-15',
    total_expense: 15000,
    event_requestor: 'John Doe',
  },
  {
    request_number: 'REQ002',
    event_name: 'Product Launch',
    event_type: 'Launch',
    event_date: '2024-11-20',
    total_expense: 25000,
    event_requestor: 'Jane Smith',
  },
  {
    request_number: 'REQ003',
    event_name: 'Team Building Retreat',
    event_type: 'Workshop',
    event_date: '2024-09-30',
    total_expense: 8000,
    event_requestor: 'Mike Johnson',
  },
  {
    request_number: 'REQ004',
    event_name: 'End of Year Gala',
    event_type: 'Gala',
    event_date: '2024-12-31',
    total_expense: 40000,
    event_requestor: 'Emily Davis',
  },
  {
    request_number: 'REQ005',
    event_name: 'Marketing Workshop',
    event_type: 'Workshop',
    event_date: '2024-10-10',
    total_expense: 5500,
    event_requestor: 'Alex Brown',
  },
  {
    request_number: 'REQ006',
    event_name: 'Client Appreciation Event',
    event_type: 'Social',
    event_date: '2024-09-15',
    total_expense: 12000,
    event_requestor: 'Sara Miller',
  },
];

type TableData = {
  name: string;
  event_date: string;
  cost_center: string;
  cost_code: string;
  cost_desc: string;
  cost_hod: string;
  business_unit: string;
  event_name: string | null;
  sub_type_of_activity: string | null;
  event_requestor: string;
  total_compensation_expense: number;
  event_conclusion: string;
  actual_vendors: Array<any>; // Replace `any` with a specific type if needed
};

type Props = {
  tableData: Data; // Props includes the tableData field
  refno: string;
  role: string | undefined;
};

const TableComponent = ({ ...Props }: Props) => {
  const router = useRouter();
  // const [data, setData] = useState<Data>();
  // const [occurence, setOccurence] = useState<Occurence[]>();
  // const [postExpense, setPostExpense] = useState<AdvanceRequest[]>();
  console.log("Reffffffffffffffffnooooooooooooo", Props.tableData);


  return (
    <div className='p-7 w-full relative z-20 text-black'>
      <div className="flex justify-between pb-5">
          <Input
            className="w-[40%] rounded-[50px] bg-[#ecf2ff]"
            placeholder="Search"
          />
          <div className="flex gap-5">
            <Select>
              <SelectTrigger className="dropdown rounded-[25px] gap-4">
                <SelectValue placeholder="Export" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="dropdown rounded-[25px] gap-4">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <Button className="text-black text-md font-normal bg-white hover:bg-white border rounded-[25px] px-8 py-5 shadow" onClick={()=>router.push(`/post_expense_approval`)}>
              Back
            </Button>
            <div className="">
              <svg
                width="45"
                height="45"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Group 1707480146">
                  <path
                    id="Vector"
                    d="M25 0C21.717 0 18.4661 0.646644 15.4329 1.90301C12.3998 3.15938 9.6438 5.00087 7.32233 7.32233C2.63392 12.0107 0 18.3696 0 25C0 31.6304 2.63392 37.9893 7.32233 42.6777C9.6438 44.9991 12.3998 46.8406 15.4329 48.097C18.4661 49.3534 21.717 50 25 50C31.6304 50 37.9893 47.3661 42.6777 42.6777C47.3661 37.9893 50 31.6304 50 25C50 21.717 49.3534 18.4661 48.097 15.4329C46.8406 12.3998 44.9991 9.6438 42.6777 7.32233C40.3562 5.00087 37.6002 3.15938 34.5671 1.90301C31.5339 0.646644 28.283 0 25 0Z"
                    fill="#ECF2FF"
                  />
                  <rect
                    id="Rectangle 3959"
                    x="22"
                    y="22"
                    width="6"
                    height="16"
                    rx="2"
                    fill="#4430BF"
                  />
                  <rect
                    id="Rectangle 3960"
                    x="22"
                    y="12"
                    width="6"
                    height="6"
                    rx="3"
                    fill="#4430BF"
                  />
                </g>
              </svg>
            </div>
          </div>
      </div>
      <div className="border bg-white h-full p-4 rounded-[18px]">
        <Table className="">
          <TableHeader className="bg-[#E0E9FF]">
            <TableRow className="text-nowrap rounded-r-2xl border-none mb-2">
              {/* <TableHead className="text-center  rounded-l-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat']">
                Event Name
              </TableHead>
              <TableHead className="text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']">
                Event Date
              </TableHead> */}
              <TableHead className="text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']">
                Vendor Name
              </TableHead>
              <TableHead className="text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']">
                Vendor Type
              </TableHead>
              <TableHead className="text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']">
                Advance Request
              </TableHead>
              <TableHead className="text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']">
                Total Expense
              </TableHead>
              <TableHead className="text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']">
                Level 1
              </TableHead>
              <TableHead className="text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']">
                Level 2
              </TableHead>
              <TableHead className="text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']">
                Level 3
              </TableHead>
              <TableHead className="text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']">
                Level 4
              </TableHead>
              <TableHead className="text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']">
                Level 5
              </TableHead>
              <TableHead className="text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']">
                Level 6
              </TableHead>
              <TableHead className="text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']">
                Level 7
              </TableHead>
              <TableHead
                className="text-center rounded-r-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat'] sticky right-0 z-50 bg-[#E0E9FF]"
              >
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Props.tableData?.occurence.map((data, index) => (
              <React.Fragment key={index}>
                {/* Subheading Row every two data rows */}
                  <TableRow className="bg-[#F8F8F8] border-none p-8">
                    <TableCell colSpan={4} className="text-left border-r p-3 rounded-l-2xl text-[#333] ">
                      Occurence Number:<span className='font-semibold'>{data.occurence_no ?? ""}</span> 
                    </TableCell>
                    <TableCell colSpan={8} className="text-right p-3 rounded-r-2xl text-[#333]">
                      Event Type:<span className='font-semibold'>{" "}{data.event_type ?? ""}</span>
                    </TableCell>
                  </TableRow>
                  
              
                {/* Data Row */}
                
                {data?.advance_request.map((data, index) => (
                <TableRow className="text-center text-nowrap border-b">
                  {/* <TableCell className=''>{data.name}</TableCell>
                  <TableCell>{data.advance}</TableCell> */}
                  <TableCell>{data.vendor_name}</TableCell>
                  <TableCell>{data.vendor_type}</TableCell>
                  <TableCell>{data.advance}</TableCell>
                  <TableCell className='border-r'>{data.est_amount}</TableCell>
                  <TableCell>
                    <div className="flex flex-col items-center">
                        {data.level1}
                        {
                            data.level1 != null && (data.status1 == "Approved" ? 
                                <span className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                                    A
                                </span>
                                : data.status1 == "Pending" ?
                                    <span className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                                        W
                                    </span>
                                    :
                                    <span className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                                        RJ
                                    </span>
                        )}
                        {
                          data.level1 == null && <span>N/A</span> 
                        }

                    </div>

                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col items-center">
                        {data.level2}
                        {
                          data.level2 != null && (
                            data.status2 == "Approved" ?
                              <span className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                                  A
                              </span>
                              : data.status2 == "Pending" ?
                                  <span className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                                      W
                                  </span>
                                  :
                                  <span className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                                      RJ
                                  </span>
                            
                        )}
                        {
                          data.level2 == null && <span>N/A</span> 
                        }
                    </div>

                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col items-center">
                        {data.level3}
                        {
                          data.level3 != null && (
                            data.status3 == "Approved" ?
                              <span className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                                  A
                              </span>
                              : data.status3 == "Pending" ?
                                  <span className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                                      W
                                  </span>
                                  :
                                  <span className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                                      RJ
                                  </span>
                            
                        )}
                        {
                          data.level3 == null && <span>N/A</span> 
                        }
                    </div>

                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col items-center">
                        {data.level4}
                        {
                          data.level4 != null && (
                            data.status4 == "Approved" ?
                              <span className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                                  A
                              </span>
                              : data.status4 == "Pending" ?
                                  <span className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                                      W
                                  </span>
                                  :
                                  <span className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                                      RJ
                                  </span>
                            
                        )}
                        {
                          data.level4 == null && <span>N/A</span> 
                        }
                    </div>

                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col items-center">
                        {data.level5}
                        {
                          data.level5 != null && 
                            (data.status5 == "Approved" ?
                              <span className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                                  A
                              </span>
                              : data.status5 == "Pending" ?
                                  <span className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                                      W
                                  </span>
                                  :
                                  <span className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                                      RJ
                                  </span>
                            
                        )}
                        {
                          data.level5 == null && <span>N/A</span> 
                        }
                    </div>

                  </TableCell>
                  
                  <TableCell>
                    <div className="flex flex-col items-center">
                        {data.level6}
                        {
                          data.level6 != null &&
                            (data.status6 == "Approved" ?
                              <span className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                                  A
                              </span>
                              : data.status6 == "Pending" ?
                                  <span className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                                      W
                                  </span>
                                  :
                                  <span className="w-6 7ounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                                      RJ
                                  </span>
                            
                          )}
                        {
                          data.level6 == null && <span>N/A</span> 
                        }
                    </div>

                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col items-center">
                        {data.level7}
                        {
                          data.level7 != null &&
                            (data.status7 == "Approved" ?
                              <span className="w-6 rounded-md bg-[#a9fdbc] text-[#074f18] text-[15px] font-semibold">
                                  A
                              </span>
                              : data.status7 == "Pending" ?
                                  <span className="w-6 rounded-md bg-[#fae8a8] text-[#937818] text-[15px] font-semibold">
                                      W
                                  </span>
                                  :
                                  <span className="w-6 rounded-md bg-[#feadad] text-[#9c0000] text-[15px] font-semibold">
                                      RJ
                                  </span>
                            
                          )}
                        {
                          data.level7 == null && <span>N/A</span> 
                        }
                    </div>

                  </TableCell>

                  <TableCell className="sticky right-0 bg-[white] z-50 ">
                    {data.is_approved}
                    <div className="">
                    {
                      data?.is_approved == true ? (
                        data.status == "Post Expense Approved" && Props.role == "Event%20Finance" ?  
                        <button className="border rounded-full px-4 py-1 border-[#0e4154] text-[#0e4154]" onClick={() => router.push(`/post_expense_approval/update_utr/${Props.refno}/${data.name}`)}>update utr</button>
                        :
                        <button className="border rounded-full px-4 py-1 border-[#0e4154] text-[#0e4154]" onClick={() => router.push(`/post_expense_approval/${Props.refno}/${data.name}?view=view`)}>view</button>
                      )
                     :
                      ( Props.role != "Event%20Requestor" ?
                       <button className="border rounded-full px-4 py-1 border-black text-black" onClick={() => router.push(`/post_expense_approval/${Props.refno}/${data.name}`)}>take action</button>
                       :
                       <button className="border rounded-full px-4 py-1 border-[#0e4154] text-[#0e4154]" onClick={() => router.push(`/post_expense_approval/${Props.refno}/${data.name}?view=view`)}>view</button>
                      )
                    }
                    </div>
                  </TableCell>
                </TableRow>
                ))}
                
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TableComponent;
