import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE } from "@/lib/site";

// Loads Inter 400/500/700 from Google Fonts to complement the self-hosted
// Inter-Medium.ttf declared in globals.css, exposed as the same
// --font-inter-google variable referenced by --font-body.
const interGoogle = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter-google",
  display: "swap",
});

// Site-wide metadata defaults. Individual pages override `title` and
// `description`; everything else here is inherited.
//
// metadataBase is what makes relative asset paths resolve to absolute URLs
// in the rendered tags — Open Graph requires absolute URLs, and without
// this Next emits a build warning and the share preview silently fails.
//
// The OG and icon images are picked up automatically from the file
// conventions: app/opengraph-image.png, app/icon.png, app/apple-icon.png.
export const metadata = {
  metadataBase: new URL(SITE.url),

  title: {
    default: `${SITE.name} · Reggae & Dub Sound System, Nairobi`,
    // Page titles render as "About Us · Umojah Sound System"
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "sound system hire Nairobi",
    "reggae sound system Kenya",
    "dub sound system",
    "custom sound system build",
    "PA hire Nairobi",
    "Umojah Sound System",
    "Nairobi Dub Club",
    "festival sound Kenya",
  ],
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,

  alternates: { canonical: "/" },

  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} · Reggae & Dub Sound System, Nairobi`,
    description: SITE.description,
    url: SITE.url,
    locale: "en_KE",
  },

  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} · Reggae & Dub Sound System, Nairobi`,
    description: SITE.description,
    creator: "@umojahsoundsyst",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  category: "music",
  formatDetection: { telephone: true, address: false, email: false },
};

// Matches the bone page ground, so mobile browser chrome doesn't clash
// with the design.
export const viewport = {
  themeColor: "#F2EAD0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={interGoogle.variable}>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
