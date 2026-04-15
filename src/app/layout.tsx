import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Trenton's Senior Living | Family-Owned Senior Living in Overland Park, KS",
  description: "Trenton's Senior Living has served Overland Park, KS families for 35 years with compassionate assisted living and memory care. Schedule your tour today.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Open+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-background">
        <Navbar
          logo="Trenton's Senior Living"
          ctaText="Schedule a Tour"
          ctaHref="/schedule-tour"
        />
        <main id="main-content">
          {children}
        </main>
        <Footer
          brandName="Trenton's Senior Living"
          contactInfo={{
            phone: "(913) 555-0192",
            email: "hello@trentonsseniorliving.com",
            address: "8901 Metcalf Avenue, Overland Park, KS 66212",
          }}
        />
      </body>
    </html>
  );
}
