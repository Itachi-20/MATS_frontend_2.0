'use server'
import React from 'react'
import Table from './table'
import { cookies } from 'next/headers'
const fetchData = async(name:any)=>{
    console.log("name",name)
    try {
      const cookie = await cookies();
      const Cookie = cookie.toString();
      const tableData = await fetch(
        `${process.env.FRAPPE_URL}/api/method/matsapp.api.utils.utils.get_advance_request_data?name=${name}`,
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
        return data.data
      }
      
    } catch (error) {
      console.log(error,"something went wrong");
    }
  }


  const Page = async ({params}:any) => {
    const refno = await params
    const tableData = await fetchData(refno.refno);
    return (
        <>
           <Table tableData={tableData} />
        </>
    )
}

export default Page
