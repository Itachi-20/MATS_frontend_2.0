import { cookies } from 'next/headers'
import Table from '@/app/(afterlogin)/post_activity_document_approval_list/table'

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
 
  return (
    <>
      <Table
      tableData={tableData}
      />
    </>
  );
};

export default Index;
