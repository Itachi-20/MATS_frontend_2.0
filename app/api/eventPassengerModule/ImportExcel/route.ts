import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const cookie = req.headers.get("cookie");
    console.log(cookie)
    const formData = await req.formData();
    console.log(formData,'formData in api')
    try {
        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.event.passenger.passenger.import_passenger`, {
            method: 'POST',
            headers: {
               // 'Content-Type': 'application/json',
               Cookie:`${cookie}` as string
            },
            credentials:'include',
            body:formData
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
