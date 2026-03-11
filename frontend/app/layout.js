import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ShopHub - Premium E-Commerce Platform",
  description: "Discover cutting-edge tech products at unbeatable prices. Shop wireless headphones, smartwatches, gaming gear, and more with free shipping on orders over $50.",
  keywords: "ecommerce, shop, electronics, tech, gadgets, wireless headphones, smartwatch, gaming",
  authors: [{ name: "ShopHub Team" }],
  openGraph: {
    title: "ShopHub - Premium E-Commerce Platform",
    description: "Discover cutting-edge tech products at unbeatable prices",
    type: "website",
    locale: "en_US",
    siteName: "ShopHub",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShopHub - Premium E-Commerce Platform",
    description: "Discover cutting-edge tech products at unbeatable prices",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
