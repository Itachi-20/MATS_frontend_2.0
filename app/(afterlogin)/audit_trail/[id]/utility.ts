export const fetchData = async(cookie:any,refno:any)=>{
    try {
      const Data = await fetch(
        `${process.env.FRAPPE_URL}/api/method/matsapp.api.audit.custom_audit_log.get_audit_logs?doctype=Event Entry&docname=${refno ? refno : ''}&page_no=1`,
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
