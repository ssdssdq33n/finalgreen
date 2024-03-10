import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "/node_modules/primeflex/primeflex.css";
import "primeflex/themes/primeone-light.css";
// import "primeflex/themes/primeone-dark.css";
import "primeflex/primeflex.css";
import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { ScrollTop } from "primereact/scrolltop";
import TopBar from "@/components/topbar/TopBar";
import { PrimeReactProvider } from "primereact/api";
import "./globals.css";
import Component from "@/components/Component/Component";

export const metadata: Metadata = {
  title: "Thời trang công sở nam",
  description: "Generated by tuan anh",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrimeReactProvider>
      <html lang="en">
        <body className="relative">
          <TopBar />
          <Component children={children} />
          <Footer />
          <ScrollTop
            threshold={100}
            className="w-3rem h-3rem bg-primary"
            icon="pi pi-arrow-up text-base"
          />
        </body>
      </html>
    </PrimeReactProvider>
  );
}
