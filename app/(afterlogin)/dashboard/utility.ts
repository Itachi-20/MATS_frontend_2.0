export const fetchEventList = async (cookies: any) => {
    try {
        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.event.event.get_event_list?activity=Pre Activity&page_length=4`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cookie": cookies
            }
        });
        if (response.ok) {
            const data = await response.json();
            return data.message;
        }

    } catch (error) {

    }
}

export const fetchCardData = async (cookies: any) => {
    try {
        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.dashboard.dashboard_contents.get_requestor_dashboard`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cookie": cookies
            }
        });
        if (response.ok) {
            const data = await response.json();
            return data.data;
        }

    } catch (error) {

    }
}

export const fetchEventApproverList = async (cookies: any) => {
    try {
        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.event.event.get_pre_activity_list?page_length=5`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cookie": cookies
            }
        });
        if (response.ok) {
            const data = await response.json();
            return data.data.events;
        }

    } catch (error) {

    }
}

export const fetchApproverCardData = async (cookies: any) => {
    try {
        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.dashboard.dashboard_contents.get_approver_dashboard`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cookie": cookies
            }
        });
        if (response.ok) {
            const data = await response.json();
            return data.data;
        }

    } catch (error) {

    }
}

export const fetchEventFinanceList = async (cookies: any) => {
    try {
        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.event.event.get_advance_expense_list?page_length=5`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cookie": cookies
            }
        });
        if (response.ok) {
            const data = await response.json();
            return data.message;
        }

    } catch (error) {

    }
}

export const fetchFinanceCardData = async (cookies: any) => {
    try {
        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.dashboard.dashboard_contents.get_financer_dashboard`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cookie": cookies
            }
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data,'data--------------==============')
            return data.data;
        }
    } catch (error) {

    }
}

export const fetchEventTravelList = async (cookies: any) => {
    try {
        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.event.event.get_travel_expense_list?page_length=5`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                'Cookie':cookies
            },
            credentials:"include"
        })
        if(response.ok){
            const data = await response.json();
            console.log(data,'data')
            return data.message;
        }
    } catch (error) {
        console.log("server error:- ",error)
    }
}

export const fetchTravelCardData = async (cookies: any) => {
    try {
        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.dashboard.dashboard_contents.get_financer_dashboard`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cookie": cookies
            }
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data,'data--------------==============')
            return data.data;
        }
    } catch (error) {

    }
}