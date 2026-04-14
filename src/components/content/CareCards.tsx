import { ArrowRight } from "lucide-react";
import { LeafVinePattern } from "@/components/skin/LeafVinePattern";

export interface CareType {
  slug: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  href?: string;
}

interface CareCardsProps {
  heading?: string;
  careTypes?: CareType[];
}

const accentColors = [
  { bar: "bg-primary", tag: "text-primary-light" },
  { bar: "bg-secondary", tag: "text-secondary-light" },
  { bar: "bg-accent", tag: "text-accent-light" },
];

const defaultCareTypes: CareType[] = [
  {
    slug: "independent-living",
    tag: "Active Lifestyle",
    title: "Independent Living",
    description:
      "Spacious apartments, vibrant social life, fitness programs, and the freedom to enjoy every day on your terms.",
    image: "https://images.unsplash.com/photo-1559234938-b60fff04894d?w=800&q=80",
  },
  {
    slug: "assisted-living",
    tag: "Personalized Support",
    title: "Assisted Living",
    description:
      "Compassionate daily support, medication management, and health monitoring — all while honoring independence and dignity.",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&q=80",
  },
  {
    slug: "memory-care",
    tag: "Specialized Care",
    title: "Memory Care",
    description:
      "Expert dementia care in a secure, nurturing environment with structured activities and person-centered approaches.",
    image: "https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?w=800&q=80",
  },
];

export function CareCards({
  heading = "Find the Right Fit for Your Loved One",
  careTypes = defaultCareTypes,
}: CareCardsProps) {
  return (
    <section className="relative bg-white py-20 sm:py-24 overflow-hidden">
      {/* Leaf-vine background texture */}
      <LeafVinePattern opacity={0.07} />

      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text text-center tracking-tight mb-12"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          {heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(careTypes ?? []).map((care, i) => {
            const palette = accentColors[i % accentColors.length];
            return (
              <a
                key={care.slug}
                href={care.href ?? `/living-options/${care.slug}`}
                className="group relative rounded-xl overflow-hidden h-[480px] block focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer"
              >
                {/* Accent bar — top */}
                <span
                  className={`absolute top-0 left-1/2 -translate-x-1/2 h-1.5 w-0 group-hover:w-full z-[3] transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${palette.bar}`}
                  aria-hidden="true"
                />
                {/* Accent bar — bottom */}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1.5 w-0 group-hover:w-full z-[3] transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${palette.bar}`}
                  aria-hidden="true"
                />

                {/* Full-bleed image */}
                <img
                  src={care.image}
                  alt={`${care.title} community`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Gradient overlay — darkens on hover */}
                <div
                  className="absolute inset-0 z-[1] bg-gradient-to-t from-[rgba(50,68,49,0.88)] via-[rgba(44,34,24,0.5)] to-transparent transition-all duration-400 group-hover:from-[rgba(50,68,49,0.92)] group-hover:via-[rgba(44,34,24,0.6)]"
                />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-[2]">
                  <span
                    className={`inline-block text-base font-semibold tracking-[1.5px] uppercase mb-3 ${palette.tag}`}
                  >
                    {care.tag}
                  </span>
                  <h3 className="font-heading text-[26px] font-bold text-white mb-3">
                    {care.title}
                  </h3>
                  <p className="text-white/85 text-base leading-relaxed mb-5">
                    {care.description}
                  </p>
                  <span className="inline-flex items-center gap-2 bg-sand text-primary-dark font-semibold px-6 py-2.5 rounded-md opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 border-2 border-sand hover:bg-white hover:text-primary-dark">
                    Learn More{" "}
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
