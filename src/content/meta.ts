import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { LandingSlug } from "./types";

const META: Record<LandingSlug, { title: string; description: string; image: string; alt: string }> = {
  entrenadores: {
    title: "Fivo para entrenadores personales: GoHighLevel, Harbiz y tus llamadas en un solo sitio",
    description:
      "Fivo une tu CRM, tus clientes, tus llamadas de venta y tus check-ins en un grafo de contexto, y lo conecta a Claude o ChatGPT.",
    image: "/og-entrenadores.png",
    alt: "Fivo para entrenadores personales",
  },
};

/** Metadatos de cada landing. Siempre noindex: son landings de tráfico de pago (no hay cabeceras en un sitio estático). */
export function landingMetadata(slug: LandingSlug): Metadata {
  const m = META[slug];
  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: m.title,
    description: m.description,
    robots: { index: false, follow: false },
    openGraph: {
      title: m.title,
      description: m.description,
      type: "website",
      locale: "es_ES",
      siteName: "Fivo",
      images: [{ url: m.image, width: 1200, height: 630, alt: m.alt }],
    },
    twitter: { card: "summary_large_image", title: m.title, description: m.description, images: [m.image] },
    icons: { icon: "/logos/fivo-mark.svg" },
  };
}
