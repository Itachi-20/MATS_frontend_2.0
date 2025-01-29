

export const passenger_list_data = async(cookie:any,refno:string)=>{
    try {
        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.event.passenger.passenger.get_event_passenger_list?name=${refno}`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                'Cookie':cookie
            },
            credentials:"include"
        })
        if(response.ok){
            const data = await response.json();
            return data.data;
        }
    } catch (error) {
        console.log("server error:- ",error)
    }
}
