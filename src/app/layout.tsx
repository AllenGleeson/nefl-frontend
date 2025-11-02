import type { Metadata } from "next";
import "@/styles/globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "NEFL",
  description: "The Official North East Football League Site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <Nav />
        </header>
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}