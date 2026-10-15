import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { landingMetadata } from "@/content/meta";
import { ACTIVE_LANDING } from "@/lib/activeLanding";
import { AnalyticsLoader } from "@/components/AnalyticsLoader";
import { CookieBanner } from "@/components/CookieBanner";
import { BrandIcons } from "@/components/BrandIcons";
import { VisitorCode } from "@/components/VisitorCode";

// Manrope: toda la interfaz (sistema de diseño de Fivo). Dentro del proyecto, como Satoshi, para que la compilación no
// dependa de Google Fonts. Es el mismo archivo que servía Google (variable, subconjunto latino) declarado solo para los
// pesos que se usan (400 a 700). La fuente de reserva lleva el mismo ajuste que calculaba next/font/google
// ("Manrope Fallback" en globals.css), así que no cambia nada al cargar.
const manrope = localFont({
  src: [{ path: "./fonts/manrope-latin.woff2", weight: "400 700", style: "normal" }],
  display: "swap",
  preload: true,
  adjustFontFallback: false,
  fallback: ["Manrope Fallback"],
  variable: "--font-manrope",
});

// Satoshi Black: la cara que sirve hoy el H1 de fivo.ai (font-satoshi, font-black). Solo titulares.
const satoshi = localFont({
  src: [
    { path: "./fonts/satoshi-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/satoshi-900.woff2", weight: "900", style: "normal" },
  ],
  display: "swap",
  // Con precarga: el titular corto del hero cambiaba de ancho al sustituir la fuente de repuesto (CLS). Precargada,
  // llega antes de pintar: CLS 0 y LCP algo mejor que sin precarga (medido en local, móvil con CPU x4, 9 pasadas).
  preload: true,
  variable: "--font-satoshi",
});

// Metadatos de la landing; noindex en todas las páginas (etiqueta meta: un sitio estático no tiene cabeceras)
export const metadata: Metadata = landingMetadata(ACTIVE_LANDING);

export const viewport: Viewport = {
  themeColor: "#08090B",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${manrope.variable} ${satoshi.variable}`}>
      <body>
        {/* El aviso va el primero en el DOM (es fixed, no cambia dónde se ve) para ser lo primero en el orden de tabulación */}
        {/* Degradado de marca para los iconos (.icon-brand) */}
        <svg aria-hidden width="0" height="0" className="absolute">
          <defs>
            <linearGradient id="fivo-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="var(--color-grad-a)" />
              <stop offset="1" stopColor="var(--color-grad-b)" />
            </linearGradient>
          </defs>
        </svg>
        <CookieBanner />
        {children}
        <AnalyticsLoader />
        <BrandIcons />
        <VisitorCode />
      </body>
    </html>
  );
}
