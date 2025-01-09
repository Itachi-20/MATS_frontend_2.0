'use server'
import React from 'react'
import Table from './detail'
import { cookies } from 'next/headers';
const fetchData = async(ref_no:string)=>{
    try {
      const cookie = await cookies();
      const Cookie = cookie.toString();
     
      const tableData = await fetch(
        `${process.env.FRAPPE_URL}/api/method/matsapp.api.event.event.get_event_data?name=${ref_no}`,
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


  const Page = async ({ searchParams }: { searchParams: { refno?: string } }) => {
    const refno = searchParams?.refno 
    console.log(refno,'refno')
    const tableData = await fetchData(refno);
  
    console.log(tableData, 'this is table data');
    return (
        <>
           <Table tableData={tableData}/>
        </>
    )
}

export default Page;
