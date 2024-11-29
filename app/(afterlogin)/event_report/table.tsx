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
type EventTable = {
  request_no: string;
  type_of_activity: string;
  event_name: string;
  hcp_name: string;
  sub_activity: number;
  event_date: string;
  event_end_date: number;
  cost_center: string;
  budget: string;
  therapy: string;
  no_of_engagement: string;
  region: string;
  event_venue: string;
  post_activity_status: string;
  status: string;
  estimated_expense: string;
  requester: string;
  created_by: string;
  business_unit: string,
  reporting_head: string,
  approver_1: string,
  approver_2: string,
  approver_3: string,
  approver_4: string,
  approver_5: string,
  approver_6: string,
  approver_7: string,
}  

const events: EventTable[] = [
  {
    request_no: "REQ001",
    type_of_activity: "Annual Conference",
    event_name: "Conference",
    hcp_name: "2024-10-15",
    sub_activity: 15000,
    event_date: "John Doe",
    event_end_date: 1234567890,
    cost_center: "string",
    budget: "string",
    therapy: "string",
    no_of_engagement: "string",
    region: "string",
    event_venue: "string",
    post_activity_status: "string",
    status: "string",
    estimated_expense: "string",
    requester: "string",
    created_by: "string",
    business_unit: "string",
    reporting_head: "string",
    approver_1: "string",
    approver_2: "string",
    approver_3: "string",
    approver_4: "string",
    approver_5: "string",
    approver_6: "string",
    approver_7: "string",
  },
  {
    request_no: "REQ002",
    type_of_activity: "Product Launch",
    event_name: "Launch",
    hcp_name: "2024-11-20",
    sub_activity: 25000,
    event_date: "Jane Smith",
    event_end_date: 1234567890,
    cost_center: "string",
    budget: "string",
    therapy: "string",
    no_of_engagement: "string",
    region: "string",
    event_venue: "string",
    post_activity_status: "string",
    status: "string",
    estimated_expense: "string",
    requester: "string",
    created_by: "string",
    business_unit: "string",
    reporting_head: "string",
    approver_1: "string",
    approver_2: "string",
    approver_3: "string",
    approver_4: "string",
    approver_5: "string",
    approver_6: "string",
    approver_7: "string",
  },
  {
    request_no: "REQ003",
    type_of_activity: "Team Building Retreat",
    event_name: "Workshop",
    hcp_name: "2024-09-30",
    sub_activity: 8000,
    event_date: "Mike Johnson",
    event_end_date: 1234567890,
    cost_center: "string",
    budget: "string",
    therapy: "string",
    no_of_engagement: "string",
    region: "string",
    event_venue: "string",
    post_activity_status: "string",
    status: "string",
    estimated_expense: "string",
    requester: "string",
    created_by: "string",
    business_unit: "string",
    reporting_head: "string",
    approver_1: "string",
    approver_2: "string",
    approver_3: "string",
    approver_4: "string",
    approver_5: "string",
    approver_6: "string",
    approver_7: "string",

  },
  {
    request_no: "REQ004",
    type_of_activity: "End of Year Gala",
    event_name: "Gala",
    hcp_name: "2024-12-31",
    sub_activity: 40000,
    event_date: "Emily Davis",
    event_end_date: 1234567890,
    cost_center: "string",
    budget: "string",
    therapy: "string",
    no_of_engagement: "string",
    region: "string",
    event_venue: "string",
    post_activity_status: "string",
    status: "string",
    estimated_expense: "string",
    requester: "string",
    created_by: "string",
    business_unit: "string",
    reporting_head: "string",
    approver_1: "string",
    approver_2: "string",
    approver_3: "string",
    approver_4: "string",
    approver_5: "string",
    approver_6: "string",
    approver_7: "string",

  },
  {
    request_no: "REQ005",
    type_of_activity: "Marketing Workshop",
    event_name: "Workshop",
    hcp_name: "2024-10-10",
    sub_activity: 5500,
    event_date: "Alex Brown",
    event_end_date: 1234567890,
    cost_center: "string",
    budget: "string",
    therapy: "string",
    no_of_engagement: "string",
    region: "string",
    event_venue: "string",
    post_activity_status: "string",
    status: "string",
    estimated_expense: "string",
    requester: "string",
    created_by: "string",
    business_unit: "string",
    reporting_head: "string",
    approver_1: "string",
    approver_2: "string",
    approver_3: "string",
    approver_4: "string",
    approver_5: "string",
    approver_6: "string",
    approver_7: "string",
  }
];

type Props = {
  isAddVendor: () => void;
};

const table = ({ ...Props }: Props) => {
  return (
    <div className="border bg-white h-full p-4 rounded-[18px]">
      <Table className={""}>
        <TableHeader className={"bg-[#E0E9FF]"}>
          <TableRow className={"text-nowrap"}>
            <TableHead
              className={
                "text-center rounded-l-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Request No
            </TableHead>
            <TableHead
              className={
                "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Type Of Activity
            </TableHead>
            <TableHead
              className={
                "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Event Name
            </TableHead>

            <TableHead
              className={
                "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              HCP Name
            </TableHead>

            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Sub Activity
            </TableHead>
            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Event Date
            </TableHead>
            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Event End Date
            </TableHead>
            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Cost Center
            </TableHead>
            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Budget
            </TableHead>
            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Therapy
            </TableHead>
            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              No. of Engagement
            </TableHead>
            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Region
            </TableHead>
            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Event Venue
            </TableHead>
            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Post Act. Status
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
              Estimated Expense
            </TableHead>
            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Requester
            </TableHead>
            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Created By
            </TableHead>

            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Business Unit
            </TableHead>

            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Reporting Head
            </TableHead>

            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Approver 1
            </TableHead>
            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Approver 2
            </TableHead>
            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Approver 3
            </TableHead>
            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Approver 4
            </TableHead>
            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Approver 5
            </TableHead>
            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Approver 6
            </TableHead>

            <TableHead
              className={
                "text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              Approver 7
            </TableHead>
            

            <TableHead
              className={
                "sticky right-0 z-50 bg-[#E0E9FF] border-l-2 border-gray-450 shadow-2xl rounded-r-2xl  text-center  text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
              }
            >
              View
            </TableHead>
            

          </TableRow>
        </TableHeader>
        <TableBody>
          {events &&
            events.map((data, index) => {
              return (
                <TableRow key={index} className="text-center text-nowrap">
                  <TableCell>{data.request_no}</TableCell>
                  <TableCell>{data.event_name}</TableCell>
                  <TableCell>{data.type_of_activity}</TableCell>
                  <TableCell>{data.hcp_name}</TableCell>
                  <TableCell>{data.sub_activity}</TableCell>
                  <TableCell>{data.event_date}</TableCell>
                  <TableCell>{data.event_end_date}</TableCell>
                  <TableCell>{data.event_end_date}</TableCell>
                  <TableCell>{data.event_end_date}</TableCell>
                  <TableCell>{data.event_end_date}</TableCell>
                  <TableCell>{data.event_end_date}</TableCell>
                  <TableCell>{data.event_end_date}</TableCell>
                  <TableCell>{data.event_end_date}</TableCell>
                  <TableCell>{data.event_end_date}</TableCell>
                  <TableCell>{data.event_end_date}</TableCell>
                  <TableCell>{data.event_end_date}</TableCell>
                  <TableCell>{data.event_end_date}</TableCell>
                  <TableCell>{data.event_end_date}</TableCell>
                  <TableCell>{data.event_end_date}</TableCell>
                  <TableCell>{data.event_end_date}</TableCell>
                  <TableCell>{data.event_end_date}</TableCell>
                  <TableCell>{data.event_end_date}</TableCell>
                  <TableCell>{data.event_end_date}</TableCell>
                  <TableCell>{data.event_end_date}</TableCell>
                  <TableCell>{data.event_end_date}</TableCell>
                  <TableCell>{data.event_end_date}</TableCell>
                  <TableCell>{data.event_end_date}</TableCell>
                  <TableCell className="flex space-x-6 items-center justify-center sticky right-0 bg-[white] z-50 border-l-2 shadow-2xl">
                    <div className="hover:cursor-pointer" onClick={Props.isAddVendor}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                        <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  )
}

export default table