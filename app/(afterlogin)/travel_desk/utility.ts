export const getTableData = async(cookie:any)=>{
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


export const travel_desk_data = async(cookie:any,refno:string)=>{
    try {
        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.utils.utils.get_travel_expense_request_data?name=${refno}`,{
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


export const dropdownData = async(cookie:any)=>{
    try {
        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.event.event.get_field_data`,{
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