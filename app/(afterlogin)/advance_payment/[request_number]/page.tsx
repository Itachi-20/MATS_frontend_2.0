import React from 'react';
import { cookies } from 'next/headers';
import Table from "@/app/(afterlogin)/advance_payment/[request_number]/table";

const page = async ({params}:any) => {
  const fetchData = async(name:any)=>{
    try {
      const cookie = await cookies();
      const Cookie = cookie.toString();
      const tableData = await fetch(
        `http://10.120.140.7:8000/api/method/matsapp.api.event.event.get_advance_expense_detail_list?name=${name}`,
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
        console.log("data ",data)
        return data.data
      }
      
    } catch (error) {
      console.log(error,"something went wrong");
    }
  }

  const {request_number} = await params; 
  const cookie = await cookies();
  const role = cookie.get("role");
   console.log(role, request_number);
  const tableData = await fetchData(request_number);
  return (
    <>
      <Table tableData={tableData} refno = {request_number} role={role?.value}/>
    </>
  )
}

export default page