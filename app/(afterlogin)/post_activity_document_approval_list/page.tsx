import { cookies } from 'next/headers'
import Table from '@/app/(afterlogin)/post_activity_document_approval_list/table'
// type EventTable = {
//   name: string;
//   event_name: string;
//   event_type: string;
//   event_start_date: string;
//   event_end_date: string;
//   event_requestor: string;
//   event_venue:string;
//   current_stage:string;
//   preactivity_approvers:{
//     level_1: preactivity_approvers;
//     level_2: preactivity_approvers;
//     level_3: preactivity_approvers;
//     level_4: preactivity_approvers;
//     level_5: preactivity_approvers;
//     level_6: preactivity_approvers;
//   }[]
// };

type level = "Approved" | "Rejected" | "Pending";
type preactivity_approvers = {
  level:string,
  name:string
}
 const fetchTable = async()=>{
  try {
    const cookie = await cookies();
    const Cookie = cookie.toString();
    const tableData = await fetch(
      `${process.env.FRAPPE_URL}/api/method/matsapp.api.event.event.get_post_activity_list`,
      {
        method: "GET",
        headers:{
          "Content-Type": "application/json",
          "Cookie":Cookie
        },
      }
    );
    if(tableData.ok){
      const data = await tableData.json();
      return data.data.events
    }
    
  } catch (error) {
    console.log(error,"something went wrong");
  }
}



const Index = async() => {

  const tableData = await fetchTable();
  console.log(tableData,"this is table data")
  // const [tableData, setTableData] = useState<any[]>([]);
  // const events: EventTable[] = [
  //   {
  //     request_number: "REQ001",
  //     event_name: "Annual Conference",
  //     event_type: "Conference",
  //     event_date: "2024-10-15",
  //     total_expense: 15000,
  //     event_requestor: "John Doe",
  //     level_1: "Approved",
  //     level_2: "Pending",
  //     level_3: "Approved",
  //     level_4: "Rejected",
  //     level_5: "Approved",
  //     level_6: "Pending"
  //   },
  //   {
  //     request_number: "REQ002",
  //     event_name: "Product Launch",
  //     event_type: "Launch",
  //     event_date: "2024-11-20",
  //     total_expense: 25000,
  //     event_requestor: "Jane Smith",
  //     level_1: "Pending",
  //     level_2: "Approved",
  //     level_3: "Approved",
  //     level_4: "Pending",
  //     level_5: "Rejected",
  //     level_6: "Approved"
  //   },
  //   {
  //     request_number: "REQ003",
  //     event_name: "Team Building Retreat",
  //     event_type: "Workshop",
  //     event_date: "2024-09-30",
  //     total_expense: 8000,
  //     event_requestor: "Mike Johnson",
  //     level_1: "Approved",
  //     level_2: "Approved",
  //     level_3: "Pending",
  //     level_4: "Approved",
  //     level_5: "Rejected",
  //     level_6: "Approved"
  //   },
  //   {
  //     request_number: "REQ004",
  //     event_name: "End of Year Gala",
  //     event_type: "Gala",
  //     event_date: "2024-12-31",
  //     total_expense: 40000,
  //     event_requestor: "Emily Davis",
  //     level_1: "Rejected",
  //     level_2: "Rejected",
  //     level_3: "Pending",
  //     level_4: "Approved",
  //     level_5: "Approved",
  //     level_6: "Pending"
  //   },
  //   {
  //     request_number: "REQ005",
  //     event_name: "Marketing Workshop",
  //     event_type: "Workshop",
  //     event_date: "2024-10-10",
  //     total_expense: 5500,
  //     event_requestor: "Alex Brown",
  //     level_1: "Pending",
  //     level_2: "Approved",
  //     level_3: "Rejected",
  //     level_4: "Approved",
  //     level_5: "Pending",
  //     level_6: "Approved"
  //   },
  //   {
  //     request_number: "REQ006",
  //     event_name: "Client Appreciation Event",
  //     event_type: "Social",
  //     event_date: "2024-09-15",
  //     total_expense: 12000,
  //     event_requestor: "Sara Miller",
  //     level_1: "Approved",
  //     level_2: "Approved",
  //     level_3: "Approved",
  //     level_4: "Pending",
  //     level_5: "Rejected",
  //     level_6: "Approved"
  //   }
  // ];

  return (
    <>
      <Table
      tableData={tableData}
      />
    </>
  );
};

export default Index;
