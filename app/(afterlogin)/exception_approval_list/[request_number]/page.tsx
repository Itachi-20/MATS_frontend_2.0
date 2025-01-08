import React from 'react';
import { cookies } from 'next/headers';
import Table from "@/app/(afterlogin)/exception_approval_list/[request_number]/table";

const fetchData = async(names:any)=>{
  try {
    const cookie = await cookies();
    const Cookie = cookie.toString();
    const tableData = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.event.event.get_exception_expense_detail_list?name=${names}`,
      {
        method: "GET",
        headers:{
          "Content-Type": "application/json",
          "Cookie":Cookie
        },
        credentials:'include' 
      }
    );
    if(tableData.ok){
      const data = await tableData.json();
      console.log(data,'data exception')
      return data.data
    }
    
  } catch (error) {
    console.log(error,"something went wrong");
  }
}
const page = async ({params}:any) => {
  const {request_number} = await params; 
  const tableData = await fetchData(request_number);
  return (
    <>
      <Table tableData={tableData} refno = {request_number}/>
    </>
  )
}

export default page