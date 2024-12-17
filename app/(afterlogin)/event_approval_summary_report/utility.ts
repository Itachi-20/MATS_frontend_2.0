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