import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://jogadorpro.vercel.app"),
  title: "JogadorPro - Prop Trading pour Paris Sportifs | Compte Financé jusqu'à €50K",
  description: "Plateforme de prop trading leader pour paris sportifs. Passez nos challenges, tradez avec notre capital (€100 à €50K) et gardez 80% des profits. Demo gratuit disponible.",
  keywords: ["prop trading", "paris sportifs", "compte financé", "trading sportif", "challenges trading", "FTMO sports betting", "profit share", "prop firm"],
  authors: [{ name: "JogadorPro" }],
  creator: "JogadorPro",
  publisher: "JogadorPro",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://jogadorpro.vercel.app",
    siteName: "JogadorPro",
    title: "JogadorPro - Prop Trading pour Paris Sportifs",
    description: "Tradez avec notre capital de €100 à €50K. Gardez 80% des profits. Demo gratuit.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "JogadorPro - Prop Trading",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JogadorPro - Prop Trading pour Paris Sportifs",
    description: "Tradez avec notre capital de €100 à €50K. Gardez 80% des profits.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://jogadorpro.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#10b981" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              "name": "JogadorPro",
              "description": "Plateforme de prop trading pour paris sportifs professionnels",
              "url": "https://jogadorpro.vercel.app",
              "logo": "https://jogadorpro.vercel.app/logo.png",
              "image": "https://jogadorpro.vercel.app/og-image.png",
              "priceRange": "€0-€139",
              "areaServed": {
                "@type": "Country",
                "name": "France"
              },
              "offers": [
                {
                  "@type": "Offer",
                  "name": "Demo Challenge",
                  "price": "0",
                  "priceCurrency": "EUR"
                },
                {
                  "@type": "Offer",
                  "name": "Challenge 1K",
                  "price": "49",
                  "priceCurrency": "EUR"
                },
                {
                  "@type": "Offer",
                  "name": "Challenge 5K",
                  "price": "139",
                  "priceCurrency": "EUR"
                }
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
