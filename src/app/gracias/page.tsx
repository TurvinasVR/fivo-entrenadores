import type { Metadata } from "next";
import { ThanksPage } from "@/components/landing/ThanksPage";
import { LANDING } from "@/content/index";
import { ROBOTS } from "@/content/meta";

export const metadata: Metadata = {
  title: "Tu llamada está agendada | Fivo",
  robots: ROBOTS,
};

// La página de gracias de la landing de entrenadores
export default function Gracias() {
  return <ThanksPage content={LANDING} />;
}
