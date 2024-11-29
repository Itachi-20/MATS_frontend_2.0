import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
export async function POST(req: Request) {
    try {
        const cookies = req.headers.get("cookie")
        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookies as string 
            },
            credentials:'include'
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const logoutResponse = NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
        logoutResponse.cookies.set("sid", "", { maxAge: 0 })
        return logoutResponse;
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
    }
}
