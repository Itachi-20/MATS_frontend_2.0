import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const cookies = req.headers.get("cookie")
        // console.log(body,"------------------------------------");
        const formData = new FormData();
        formData.append("name", body.name);
        // console.log(formData,"%%%%%%%%%%%%%%%%");
        // formData.append("vendor_name", body.vendor_name);
        // formData.append("vendor_code", body.vendor_code);
        // formData.append("vendor_type", body.vendor_type);

        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.event.event.close_event`, {
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json',
                'Cookie': cookies as string 
            },
            body:formData,
            credentials:'include'
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
    }
}
