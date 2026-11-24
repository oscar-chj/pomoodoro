import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { buildWebApplication, buildWebSite } from "./_seo/jsonld";
import JsonLd from "./_seo/JsonLdScript";
import { createMetadata, defaultTitle } from "./_seo/metadata";
import { siteConfig } from "./_seo/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...createMetadata(),
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  applicationName: siteConfig.name,
  category: "productivity",
  authors: [{ name: siteConfig.name }],
  formatDetection: { telephone: false, email: false, address: false },
  appleWebApp: { capable: true, title: siteConfig.name, statusBarStyle: "default" },
};

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: siteConfig.themeColor,
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={[buildWebSite(), buildWebApplication()]} />
        {children}
      </body>
    </html>
  );
}
