import { NextApiRequest,NextApiResponse } from 'next';
import frappeAuthMiddleware from '/middleware/frappeAuthMiddleware';

type FrappeAuthRequest = NextApiRequest & {
    user?: string;
};

export default async function handler(req:FrappeAuthRequest, res:NextApiResponse) {
    await frappeAuthMiddleware(req, res, () => {
        // Your protected logic here
        res.status(200).json({ message: 'You are authenticated!', user: req.user });
    });
}
