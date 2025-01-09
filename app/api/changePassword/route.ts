import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const cookie = req.headers.get("cookie");
    const body = await req.json();
    console.log("body in change passowrd",body)
    try {
        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.utils.change_password.change_user_password`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               Cookie:`${cookie}` as string
            },
            body:JSON.stringify(body),
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
