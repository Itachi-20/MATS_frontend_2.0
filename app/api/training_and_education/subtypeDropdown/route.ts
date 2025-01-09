import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json()

        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.event.event.data_based_on_budget_type?budget=${body.budget}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
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
