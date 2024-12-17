export const fetchEventList = async(cookies:any)=>{
try {
    const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.event.event.get_event_list?activity=Pre Activity&limit=5`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Cookie":cookies
        }
    });
    if(response.ok){
        const data = await response.json();
        return data.message;
    }
    
} catch (error) {
    
}
}