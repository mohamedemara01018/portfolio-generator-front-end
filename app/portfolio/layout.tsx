import "../globals.css";
import Footer from "@/components/templates-components/footer/Footer";
import Header from "@/components/templates-components/header/Header";
import { redirect, RedirectType } from "next/navigation";
import { cookies } from "next/headers";
import { authUser } from "@/functions";
import ProviderStore from "../templates/component/Provider";

export const metadata = {
    title: "Portfolio - Portfolio Generator",
    description: "Browse and preview portfolio",
};

export default async function TemplatesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = cookies();
    const cookieHeader = cookieStore.toString();

    let res = await authUser(cookieHeader)

    return (
        <html>
            <body className="wrapper">
                <ProviderStore>
                    <Header user={res} cookieHeader={cookieHeader} isPortfolio={true} />
                    {children}
                    <Footer />
                </ProviderStore>
            </body>
        </html>

    );
}
