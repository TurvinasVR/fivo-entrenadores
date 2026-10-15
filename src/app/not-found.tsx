import type { Metadata } from "next";
import { ROBOTS } from "@/content/meta";

// Next añade por su cuenta otra etiqueta "noindex" a la 404: scripts/robots-meta.mjs deja solo esta en out
export const metadata: Metadata = { title: "Página no encontrada | Fivo", robots: ROBOTS };

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60dvh] max-w-[640px] flex-col items-center justify-center px-5 text-center">
      <h1 className="font-display text-3xl font-black">Página no encontrada</h1>
      <a href="/" className="mt-6 text-[15px] font-semibold text-accent underline underline-offset-4">
        Volver al inicio
      </a>
    </main>
  );
}
