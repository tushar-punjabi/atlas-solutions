import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = "https://atlasolutions.cl";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Atlas Solutions | Software, Datos y Automatización en Chile",
    template: "%s | Atlas Solutions",
  },

  description:
    "Atlas Solutions desarrolla software, automatizaciones, integraciones y soluciones de datos para empresas y organizaciones en Chile.",

  applicationName: "Atlas Solutions",

  authors: [
    {
      name: "Atlas Solutions",
      url: siteUrl,
    },
  ],

  creator: "Atlas Solutions",
  publisher: "Atlas Solutions",

  keywords: [
    "desarrollo de software Chile",
    "ingeniería de datos Chile",
    "automatización de procesos Chile",
    "integración de APIs Chile",
    "empresa de software Iquique",
    "software empresarial Chile",
    "data engineering Chile",
    "pipelines de datos Chile",
    "automatización empresarial",
    "Atlas Solutions",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "es_CL",
    url: siteUrl,
    siteName: "Atlas Solutions",
    title: "Atlas Solutions | Software, Datos y Automatización en Chile",
    description:
      "Construimos software, automatizaciones y sistemas de datos para organizaciones que necesitan tecnología confiable.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Atlas Solutions | Software, Datos y Automatización",
    description:
      "Software, automatización, datos e integración de sistemas para empresas en Chile.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://atlasolutions.cl/#organization",

  name: "Atlas Solutions",
  url: "https://atlasolutions.cl",

  logo: {
    "@type": "ImageObject",
    url: "https://atlasolutions.cl/android-chrome-512x512.png",
  },

  description:
    "Empresa tecnológica chilena enfocada en desarrollo de software, ingeniería de datos, automatización e integración de sistemas.",

  areaServed: [
    {
      "@type": "Country",
      name: "Chile",
    },
    {
      "@type": "City",
      name: "Iquique",
    },
    {
      "@type": "City",
      name: "Santiago",
    },
  ],

  knowsAbout: [
    "Desarrollo de software",
    "Ingeniería de datos",
    "Automatización de procesos",
    "Integración de APIs",
    "Infraestructura tecnológica",
    "Inteligencia artificial",
    "Data Engineering",
  ],

  sameAs: [
    "https://github.com/tushar-punjabi/atlas-solutions",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Outfit:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        {children}

        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "yqg0sg8d49");`}
        </Script>
      </body>
    </html>
  );
}
