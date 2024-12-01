import React from 'react';
import Pagess from './pageSecondary'
import { cookies } from 'next/headers';
const page = async ({params}:any) => {
    const refno = await params;
    console.log(refno, "refnoooooooooooooo")
    const eventDataApi = async () => {
    try {
        const cookie = await cookies();
        const Cookie = cookie.toString();
            const response = await fetch(
                `http://10.120.140.7:8001/api/method/matsapp.api.utils.utils.get_post_expense_request_data?name=${refno.request_number}&expense_name=${refno.event_type}`,
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
                console.log(data, "in api")
            
                return data.data;
                

            } else {
                console.log("Login failed");
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };
    const dropdownDataApi = async () => {
        console.log("inside dropdowndataapi Data");
        const cookie = await cookies();
        const Cookie = cookie.toString();
        try {
            const response = await fetch(
                `http://10.120.140.7:8001/api/method/matsapp.api.utils.utils.get_expense_dropdown_data`,
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
                console.log("Login failed");
            }
        } catch (error) {
            console.error("Error during login:", error);
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