import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { LandingSlug } from "./types";

/**
 * Fuera de buscadores e IA: solo se entra con el enlace directo. Va en todas las páginas por sus metadatos;
 * scripts/robots-meta.mjs deja después una sola etiqueta por página en out (la 404 trae además la de Next).
 */
export const ROBOTS = "noindex, nofollow, noarchive, nosnippet, noimageindex";

const META: Record<LandingSlug, { title: string; description: string; image: string; alt: string }> = {
  entrenadores: {
    title: "Fivo para entrenadores personales: el segundo cerebro de tu negocio",
    description:
      "Fivo conecta GoHighLevel, Harbiz y las herramientas de tu equipo en una sola memoria. Pregúntale cómo va cualquier cliente, lead o persona de tu equipo.",
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
    robots: ROBOTS,
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
