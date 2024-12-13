import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Montserrat, Poppins } from "next/font/google";
import { AppWrapper } from "./context/module";
import { AuthProvider } from "./context/AuthContext";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const montserrat = Montserrat({
  variable: "--font-Montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "MATS",
  description: "Meril Application ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <AppWrapper>
        <AuthProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased ${poppins.variable} ${montserrat.variable}`}
          >
            {children}
          </body>
        </AuthProvider>
      </AppWrapper>
    </html>
  );
}
