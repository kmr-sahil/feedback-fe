import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
//import { Providers } from "./provider";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import { Providers } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trustflag",
  description:
    "Review collection, management, and display for companies. Seek and submit reviews for users.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="description"
          content="Review collection, management, and display for companies. Seek and submit reviews for users."
        />
        <meta
          name="keywords"
          content="reviews, company reviews, user reviews, review management, review display"
        />
        <meta name="author" content="Trustflag" />
        <meta property="og:title" content="Trustflag" />
        <meta
          property="og:description"
          content="Review collection, management, and display for companies. Seek and submit reviews for users."
        />
        <meta property="og:image" content="/images/favicon.png" />
        <meta property="og:url" content="https://www.trustflag.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Trustflag" />
        <meta
          name="twitter:description"
          content="Review collection, management, and display for companies. Seek and submit reviews for users."
        />
        <meta name="twitter:image" content="/images/favicon.png" />
        <link rel="icon" href="/images/favicon.png" type="image/svg+xml" />
        <title>Trustflag</title>
      </head>
      <body className={inter.className}>
        <Providers>
          <Script
            strategy="afterInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=G-1M0DS4V64D"
          ></Script>
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-1M0DS4V64D');`}
          </Script>
          {children}{" "}
          <Toaster
            toastOptions={{
              style: {
                background: "",
              },
              className: "class",
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
