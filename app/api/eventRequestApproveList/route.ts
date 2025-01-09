import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const body = await req.json();
        const cookies = req.headers.get("cookie")
        console.log(cookies,"this is cookie")
        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.event.event.get_event_list?activity=Post Activity`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie':cookies as string
            },
            body:JSON.stringify(body),
            credentials:'include'
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        
        console.log(Response,"this is server api")
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
    }
}
