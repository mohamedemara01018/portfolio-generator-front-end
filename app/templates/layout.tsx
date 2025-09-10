import "../globals.css"
import Footer from "@/components/templates-components/footer/Footer";
import Header from "@/components/templates-components/header/Header";


export const metadata = {
    title: "Templates - Portfolio Generator",
    description: "Browse and preview portfolio templates",
};

export default function TemplatesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="wrapper">
                <Header />
                <main >
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
