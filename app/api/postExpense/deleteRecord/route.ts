import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const cookies = req.headers.get("cookie")
        const name = body.name;
        console.log("name in body ",name)
        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.utils.utils.delete_event_records?name=${name}`, {
            // const response = await fetch(`${process.env.FRAPPE_URL}/api/resource/Child Vendor/${name}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookies as string 
            },
            credentials:'include',
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
    }
}
