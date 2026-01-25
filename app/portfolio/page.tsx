import { cookies } from 'next/headers';
import { redirect, RedirectType } from 'next/navigation';
import { authUser } from '@/functions';
import { initialStateTemplate } from '@/types';
import PortfolioComponent from './component/PortfolioComponent';

export default async function Page() {
    const cookieStore = cookies();
    const cookieHeader = cookieStore.toString();

    const res = await authUser(cookieHeader);

    const portfolio = (res?.user?.portfolio ?? undefined) as initialStateTemplate | undefined;

    return <PortfolioComponent portfolio={portfolio} />;
}
