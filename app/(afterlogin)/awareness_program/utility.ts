export const dropdown = async ()=>{
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_FRAPPE_URL}/api/method/matsapp.api.event.event.get_field_data`, {
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
    const response = await fetch(`${process.env.FRAPPE_URL}/api/resource/Master Document Type?filters=[["activity_type","=","${activity_type}"],["event_type","=","${event_type}"]]&fields=["name","document_name"]&order_by="document_name"`, {
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
        // console.log(data.data,"this is utility event cost");
        return data.data;
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };