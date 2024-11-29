export const fetchData = async(cookie:any)=>{
    try {
      const Data = await fetch(
        `${process.env.FRAPPE_URL}/api/method/matsapp.api.audit.get_audit_log.get_audit_logs?doctype=Event Entry&limit_start=10`,
        {
          method: "GET",
          headers:{
            "Content-Type": "application/json",
            "cookie":cookie
          },
          credentials:'include'
        }
      );
      if(Data.ok){
        const data = await Data.json();
        return data.message;
      }
      
    } catch (error) {
      console.log(error,"something went wrong");
    }
  }
