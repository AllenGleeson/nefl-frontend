import type { Metadata } from "next";
import "@/styles/globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { assetUrl } from "@/utils/assetUrl";

export const metadata: Metadata = {
  title: "NEFL",
  description: "The Official North East Football League Site",
  icons: {
    icon: assetUrl("/images/nefl-logo.webp"),
    shortcut: assetUrl("/images/nefl-logo.webp"),
    apple: assetUrl("/images/nefl-logo.webp"),
  },
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