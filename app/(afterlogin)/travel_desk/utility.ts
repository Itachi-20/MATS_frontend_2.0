export const getTableData = async(cookie:string)=>{
    try {
        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.event.event.get_travel_expense_list`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                'Cookie':cookie
            },
            credentials:"include"
        })
        if(response.ok){
            const data = await response.json();
            console.log(data,'this is utility data')
            return data.message;
        }
    } catch (error) {
        console.log("server error:- ",error)
    }
}