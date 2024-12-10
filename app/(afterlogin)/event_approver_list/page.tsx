import { cookies } from 'next/headers'
import Table from '@/app/(afterlogin)/event_approver_list/table'
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

type Events = {
  "name": string | null,
  "event_type": string | null,
  "event_name": string | null,
  "event_start_date": string | null,
  "event_end_date": string | null,
  "event_requestor": string | null,
  "owner": string | null,
  "event_venue": string | null,
  "status": string | null,
  "total_estimated_expense": number,
  "brief_status": string | null,
  "current_stage": string | null,
  "level1": string | null,
  "level2": string | null,
  "level3": string | null,
  "level4": string | null,
  "level5": string | null,
  "level6": string | null,
  "level7": string | null,
  "status1": string | null,
  "status2": string | null,
  "status3": string | null,
  "status4": string | null,
  "status5": string | null,
  "status6": string | null,
  "status7": string | null,
  "is_approved": boolean
}
  type Data = {
      "events": Events[]
  }
      
 const fetchTable = async()=>{
  try {
    const cookie = await cookies();
    const Cookie = cookie.toString();
    const tableData = await fetch(
      `${process.env.FRAPPE_URL}/api/method/matsapp.api.event.event.get_pre_activity_list`,
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

  const tableData:Events[] = await fetchTable();
  console.log(tableData,"this is table data")
  return (
    <>
      <Table
      tableData={tableData}
      />
    </>
  );
};

export default Index;
