import { Inter } from "next/font/google";
import "./globals.css";

// Loads Inter 400/700 from Google Fonts to complement the self-hosted
// Inter-Medium.ttf (500) declared in globals.css, exposed as the same
// --font-inter-google variable referenced by --font-body.
const interGoogle = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter-google",
  display: "swap",
});

export const metadata = {
  title: "Umojah Sound System",
  description: "East African foundation sound system.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={interGoogle.variable}>
      <body>{children}</body>
    </html>
  );
}
