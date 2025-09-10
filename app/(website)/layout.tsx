import type { Metadata } from "next";
import "../globals.css"
import Header from "@/components/website-components/header/Header";
import Footer from "@/components/website-components/footer/Footer";
import ThemeProvider from "@/RTK/slices/theme/themeProvider";
import StoreProvider from "@/RTK/slices/theme/storeProvider";





export const metadata: Metadata = {
  title: {
    default: "Portfolio Generator",
    template: "%s - Portfolio Generator",
  },
  description: "portfolio generator helps you create and customize your own professional portfolio easily using ready-made templates. choose, edit, and publish your portfolio in minutes."
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <StoreProvider>
      <ThemeProvider >
        <body className="wrapper">
          <Header />
          <div className="container">
            {children}
          </div>
          <Footer />
        </body>
      </ThemeProvider>
    </StoreProvider >

  );
}
