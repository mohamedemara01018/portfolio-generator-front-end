import { Metadata } from 'next'
import styles from './profile.module.css'
import { cookies } from 'next/headers';
import { authUser } from '@/functions';
import { redirect, RedirectType } from 'next/navigation';

// must be dynamic
export const metadata: Metadata = {
    title: 'Profile'
}



async function page() {

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    let res = await authUser(cookieHeader)

    if (!res?.logIn) {
        console.log(res.logIn)
        redirect("/login", RedirectType.replace);
    }

    return (
        <div>progile page</div>
    )
}

export default page