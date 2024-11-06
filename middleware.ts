import { NextResponse,NextRequest } from 'next/server';
import frappeAuthMiddleware from '/middleware/frappeAuthMiddleware';

type Request = NextRequest & {
    user?: string;
};

export async function middleware(req:Request) {
    const response = NextResponse.next();
    await frappeAuthMiddleware(req, response, () => {});
    
    if (!req.user) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
    return response;
}

// Optional: Define route matching
export const config = {
    matcher: ['/protected/*'],
};
