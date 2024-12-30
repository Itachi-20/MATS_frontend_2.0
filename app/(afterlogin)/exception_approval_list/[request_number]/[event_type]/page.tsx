import React from 'react';
import Pagess from './pageSecondary'
import { cookies } from 'next/headers';
const page = async ({params}:any) => {
    const refno = await params;
    const eventDataApi = async () => {
    try {
        const cookie = await cookies();
        const Cookie = cookie.toString();
            const response = await fetch(
                `${process.env.FRAPPE_URL}/api/method/matsapp.api.utils.utils.get_post_expense_request_data?name=${refno.request_number}&expense_name=${refno.event_type}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Cookie":Cookie
                    },
                    credentials: 'include',
                    
                }
            );

            if (response.ok) {
                const data = await response.json();            
                return data.data;
            } else {
                console.log("Response not OKAY in Post Expense Request DATA");
            }
        } catch (error) {
            console.error("Error during Post Expense Request Data:", error);
        }
    };
    const dropdownDataApi = async () => {
        const cookie = await cookies();
        const Cookie = cookie.toString();
        try {
            const response = await fetch(
                `${process.env.FRAPPE_URL}/api/method/matsapp.api.utils.utils.get_expense_dropdown_data`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Cookie":Cookie
                    },
                    credentials: 'include',
                }
            );
    
            if (response.ok) {
                const data = await response.json();
                return data.message;
            } else {
                console.log("Response not okay in getting expense dropdown data");
            }
        } catch (error) {
            console.error("Error during getting expense dropdown data:", error);
        }
    };  
    const eventData = await eventDataApi();
    const dropdownData = await dropdownDataApi();
  return (
    <div>
        <Pagess eventDataApi={eventData} dropdownDataApi={dropdownData}/>
    </div>
  )
}

export default page