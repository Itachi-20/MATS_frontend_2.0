export const eventApprovalSummaryReport = async (cookie:any)=>{
    try {
        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.event.event.get_event_report`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cookie":cookie
            },
            credentials:'include'
        });
  
        if (response.ok) {
          const data = await response.json();
          return data.message;
        } else {
            console.log('Login failed');
        }
    } catch (error) {
        console.error("Error during login:", error);
    }
}

export const fetchEventRequestor = async (cookie:any) => {
    try {
      const Data = await fetch(
       `${process.env.FRAPPE_URL}/api/method/matsapp.api.utils.common.fetch_requestors?activity_type=Pre Activity`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cookie":cookie
          },
          credentials: 'include',
        }
      );
      if (Data.ok) {
        const data = await Data.json();
        return data.message
      } 
    } catch (error) {
      console.log(error, "something went wrong not able fetch requestor");
    }
  };