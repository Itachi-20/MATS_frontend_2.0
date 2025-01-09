import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const cookie = req.headers.get("cookie");
    console.log(cookie)
    const body = await req.json();
    console.log("body.name ____________",body.name)
    try {
        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.utils.utils.delete_event_records?name=${body.name}`, {
            method: 'DELETE',
            headers: {
               // 'Content-Type': 'application/json',
               Cookie:`${cookie}` as string
            },
            credentials:'include',
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
    }
}
