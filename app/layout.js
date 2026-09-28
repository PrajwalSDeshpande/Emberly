import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Emberly - Fuel the people who make things",
    template: "%s | Emberly",
  },
  description:
    "Emberly gives creators a page where fans can back their work with a small payment and a message.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} font-sans antialiased`}>
        <SessionWrapper>
          <Navbar />

          <div className="ember-bg min-h-[87vh]">{children}</div>

          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}