import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const cookie = req.headers.get("cookie");
    const body = await req.json();
    try {
        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.utils.change_password.change_user_password?user=${body.user}&new_password=${body.new_password}&logout_all_sessions=${body.is_logout_all_session}`, {
            method: 'POST',
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
