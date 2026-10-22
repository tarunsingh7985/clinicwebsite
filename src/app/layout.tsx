import type { Metadata } from "next";
import { clinic } from "@/config/clinic";
import { MotionEffects } from "@/components/motion-effects";
import "./globals.css";
import "./redesign.css";
import "./physio.css";

export const metadata: Metadata = {
  metadataBase: new URL(clinic.domain),
  title: clinic.seo.title,
  description: clinic.seo.description,
  openGraph: {
    title: clinic.seo.title,
    description: clinic.seo.description,
    url: clinic.domain,
    siteName: clinic.name,
    locale: "en_US",
    type: "website",
    images: [{ url: clinic.doctorPhoto, width: 1200, height: 630, alt: `${clinic.doctorName}, ${clinic.specialization}` }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<MotionEffects /></body></html>;
}
