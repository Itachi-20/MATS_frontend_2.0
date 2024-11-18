import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log(body,"body araha hai")
        const cookies = req.headers.get("cookie")
        console.log("cookies---------", cookies)
        console.log(cookies,"this api cookie")

        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.utils.change_password.change_user_password?user=${body.username}&new_password=${body.password}&logout_all_sessions=1`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `${cookies}` as string 
            },
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
