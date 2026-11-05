import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { RegisterServiceWorker } from "@/components/register-sw";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Everest-quiz",
  description:
    "Tio svåra frågor om Mount Everest, Hillary och Tenzing Norgay och andra kända bestigningar.",
  applicationName: "Everest-quiz",
  appleWebApp: {
    capable: true,
    title: "Everest-quiz",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#071018",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sv" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        {children}
        <RegisterServiceWorker />
      </body>
    </html>
  );
}
