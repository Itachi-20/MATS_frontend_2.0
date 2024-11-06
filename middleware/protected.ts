// pages/protected.js
import frappeAuthMiddleware from '/middleware/frappeAuthMiddleware';
import { GetServerSidePropsContext } from 'next';

export async function getServerSideProps(context:GetServerSidePropsContext) {
    const { req, res } = context;

    // Call the middleware to check authentication
    await frappeAuthMiddleware(req, res, () => {});

    // If the user is not authenticated, redirect to login
    if (!req.user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    // If authenticated, pass user data to the page
    return {
        props: { user: req.user },
    };
}
type Props = {
    user:string
}
export default function ProtectedPage({ ...Props }:Props) {
    return <div>Welcome {Props.user}</div>;
}
