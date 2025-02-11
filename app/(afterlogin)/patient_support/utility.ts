export const dropdown = async ()=>{
    try {
        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.event.event.get_field_data`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data.data
        } else {
            console.log('error in dropdown api');
        }
    } catch (error) {
        console.error("Error form server:- ", error);
    }
}

export const activityList = async (cokkie: any, activity_type: string, event_type: string) => {
  try {
    const response = await fetch(`${process.env.FRAPPE_URL}/api/resource/Master Document Type?filters=[["activity_type","=","${activity_type}"],["event_type","=","${event_type}"],["is_deleted","=",0]]&fields=["name","document_name"]&order_by="document_name"`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Cookie': cokkie
      },
      // credentials:'include'
    });
    if (response.ok) {
      const data = await response.json();
      return data.data;
    } else {
      console.log('activity list not found');
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
}


export const handleBudgetChange = async (value: string, cookie:any) => {
    try {
      const response = await fetch(
        `${process.env.FRAPPE_URL}/api/method/matsapp.api.event.event.data_based_on_budget_type?budget=${value}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cookie":cookie
          }
        }
      );
      if (response.ok) {
          const data = await response.json();
          return data.data;
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  export const PreviewData = async (refno:string,cookie:any) => {
    try {
      const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.event.event.get_event_data?name=${refno}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Cookie':cookie
        },
        credentials: 'include',
        body: JSON.stringify({
          name :refno
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data.data;
      } else {
        console.log('failed',response.status);
      }
    } catch (error) {
      console.error("Error during fetching:", error);
    }
  };

 export const handleBusinessUnitChange = async (value: string,cookie:any) => {
    try {
      const response = await fetch(
        `${process.env.FRAPPE_URL}/api/method/matsapp.api.event.event.get_division_based_data?division=${value}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cookie":cookie
          },
          body: JSON.stringify({
            division: value,
          }),
        }
      );

      
      if (response.ok) {
        const data = await response.json();
        console.log(data.data,"this is utility event cost");
        return data.data;
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  export const handleStateChange = async (value: string,cookie:any) => {
    console.log("value in server",value)
    try {
      const response = await fetch(
        `${process.env.FRAPPE_URL}/api/resource/City List?filters=[["state", "=", "${value}"]]&fields=["name","city"]`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cookie":cookie
          },
          credentials:'include'
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        console.log('frappe response city',data)
        return data.data;
      } else {
        console.log("Response was not okay in state change ");
      }
    } catch (error) {
      console.error("Error during state  change:", error);
    }
  };
  export const handleReportingChange = async (event_requestor: string,business_unit:string,division_category:string,division_sub_category:string,state:string,cookie:any) => {
    console.log("value in server",event_requestor,business_unit,division_category,division_sub_category,state)
    try {
      const response = await fetch(
        `${process.env.FRAPPE_URL}/api/method/matsapp.api.event.event.get_reporting_head?event_requestor=${event_requestor}&business_unit=${business_unit}&division_category=${division_category}&division_sub_category=${division_sub_category?division_sub_category:''}&state=${state}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cookie":cookie
          },
          credentials:'include'
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        console.log('frappe response city',data)
        return data.data;
      } else {
        console.log("Response was not okay in state change ",response);
      }
    } catch (error) {
      console.error("Error during state  change:", error);
    }
  };
  
  export const handleCityChange = async (value: string,page_no:number,page_length:number,cookie:any) => {
    console.log("value in server handleCityChange",value,page_length,page_no)
    try {
      const response = await fetch(
        `${process.env.FRAPPE_URL}/api/method/matsapp.api.utils.common.search_city?city_name=${value}&page_no=${page_no}&page_length=${page_length}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cookie":cookie
          },
          credentials:'include'
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        console.log('frappe response city',data)
        return data.data;
      } else {
        console.log("Response was not okay in state change ");
      }
    } catch (error) {
      console.error("Error during state  change:", error);
    }
  };
  
  export const handleCityDropdown = async (cookie:any) => {
    try {
      const response = await fetch(
        `${process.env.FRAPPE_URL}/api/method/matsapp.api.utils.common.search_city?city_name=a&page_no=1&page_length=10`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cookie":cookie
          },
          credentials:'include'
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        console.log('frappe response city',data)
        return data.data;
      } else {
        console.log("Response was not okay in city dropdown ");
      }
    } catch (error) {
      console.error("Error during state  change:", error);
    }
  };