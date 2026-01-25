import "../globals.css";
import Footer from "@/components/templates-components/footer/Footer";
import Header from "@/components/templates-components/header/Header";
import ProviderStore from "./component/Provider";
import { baseUrl } from "@/constant";
import { redirect, RedirectType } from "next/navigation";
import { cookies } from "next/headers";
import { authUser } from "@/functions";

export const metadata = {
    title: "Templates - Portfolio Generator",
    description: "Browse and preview portfolio templates",
};

export default async function TemplatesLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    let res = await authUser(cookieHeader)

    if (!res?.logIn) {
        return redirect("/login", RedirectType.replace);
    }




    return (
        <html lang="en">
            <body className="wrapper">

                <ProviderStore>
                    <Header user={res} cookieHeader={cookieHeader} />
                    {children}
                    <Footer />
                </ProviderStore>

            </body>
        </html>
    );
}
