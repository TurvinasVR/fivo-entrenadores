import type { TestimonialData } from "@/content/types";
import { Reveal } from "../Reveal";
import { TestimonialCard } from "../Testimonial";

/**
 * Testimonios de entrenadores, justo antes del resto de reseñas. Una tarjeta destacada y, al lado, las demás
 * (una o dos). La landing solo lo pinta si `ready.testimonials` está activo y hay testimonios reales (BelowFold).
 */
export function TestimonialsBlock({ testimonials }: { testimonials: TestimonialData[] }) {
  const [main, ...rest] = testimonials;
  if (!main) return null;
  return (
    <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
      <Reveal className={rest.length ? "lg:col-span-7" : "lg:col-span-12"}>
        <TestimonialCard data={main} featured />
      </Reveal>
      {rest.length > 0 && (
        <div className="grid gap-4 lg:col-span-5 lg:gap-5">
          {rest.map((t, i) => (
            <Reveal key={t.name} delay={(i + 1) * 120}>
              <TestimonialCard data={t} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
