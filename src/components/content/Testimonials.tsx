"use client";

import { useEffect, useRef } from "react";
import { Star, Zap, CheckCircle, Heart } from "lucide-react";

export interface Testimonial {
  quote: string;
  name: string;
  relation: string;
  photo: string;
}

interface TestimonialsProps {
  testimonials?: Testimonial[];
  rating?: { score: number; count: string };
  showBadges?: boolean;
}

const defaultTestimonials: Testimonial[] = [
  {
    quote:
      "My mother has blossomed at Golden Oaks. The staff treats her like family, not just a resident. She\u2019s made genuine friendships and stays engaged with activities she loves.",
    name: "Margaret Chen",
    relation: "Daughter of a resident",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  },
  {
    quote:
      "Dad moved into Independent Living last year, and it\u2019s been transformative. He\u2019s exercising regularly, joined the book club, and tells me he feels like a teenager again.",
    name: "James Rodriguez",
    relation: "Son of a resident",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
  },
  {
    quote:
      "The Memory Care team showed us extraordinary patience and compassion with my grandmother. They explained everything and involved us in every care decision along the way.",
    name: "Sarah Williams",
    relation: "Granddaughter",
    photo:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
  },
  {
    quote:
      "We toured five communities before finding Golden Oaks. The transparency, the warmth of the staff, and the quality of the dining program set them apart immediately. Mom loves it here.",
    name: "Linda Patel",
    relation: "Daughter of a resident",
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
  },
  {
    quote:
      "The Assisted Living program gave my husband back his confidence. The care team knows him by name, understands his routines, and treats him with such dignity. I sleep better at night knowing he\u2019s here.",
    name: "Dorothy Huang",
    relation: "Wife of a resident",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80",
  },
  {
    quote:
      "What impressed us most was how they handled the transition. The team made moving day feel like a celebration, not a loss. Two months in, my father says this is the happiest he\u2019s been in years.",
    name: "Robert Kim",
    relation: "Son of a resident",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
  },
];

const cardBgColors = [
  "#F2DDD4", // blush
  "#DDE8DC", // sage
  "#E5CDB5", // toasted cream
  "#E4C0B0", // dusty rose
  "#F5E6C8", // honey
  "#DBBAA8", // light terra
];

const badges = [
  { Icon: Zap, label: "State Licensed", sublabel: "Dept. of Health" },
  { Icon: Star, label: "Best of Senior Living", sublabel: "SeniorAdvisor 2025" },
  { Icon: CheckCircle, label: "CARF Accredited", sublabel: "Continuing Accreditation" },
  { Icon: Heart, label: "Caring Star 2025", sublabel: "Caring.com" },
];

function GoldStars() {
  return (
    <div className="flex gap-[3px] mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="w-4 h-4 fill-accent stroke-accent"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function Testimonials({
  testimonials = defaultTestimonials,
  rating = { score: 4.8, count: "120+" },
  showBadges = true,
}: TestimonialsProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // Duplicate all cards for seamless infinite loop
    const cards = track.innerHTML;
    track.innerHTML = cards + cards;
  }, []);

  return (
    <section className="py-20 sm:py-24 bg-white overflow-hidden">
      <style>{`
        @keyframes shelf-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <h2
          className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text text-center tracking-tight"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          What Families Are Saying
        </h2>

        {/* Rating bar */}
        <div className="flex items-center justify-center gap-3 mt-6 mb-10 flex-wrap">
          <div className="flex gap-[3px]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 fill-accent stroke-accent"
                aria-hidden="true"
              />
            ))}
          </div>
          <span className="text-xl font-bold text-text">{rating.score}</span>
          <span className="text-base text-text/60">
            from {rating.count} reviews
          </span>
        </div>
      </div>

      {/* Shelf track wrapper — full bleed */}
      <div className="relative overflow-hidden pb-2">
        <div
          ref={trackRef}
          className="flex gap-7"
          style={{
            animation: "shelf-scroll 30s linear infinite",
            width: "max-content",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.animationPlayState = "running";
          }}
        >
          {(testimonials ?? []).map((t, i) => (
            <div
              key={i}
              className="min-w-[360px] max-w-[360px] flex-shrink-0 rounded-xl p-8 transition-all duration-[350ms] ease-out hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)]"
              style={{ backgroundColor: cardBgColors[i % cardBgColors.length] }}
            >
              <GoldStars />
              <p className="text-base italic text-text/80 leading-[1.7] mb-6">
                \u201C{t.quote}\u201D
              </p>
              <div className="flex items-center gap-3.5">
                <img
                  src={t.photo}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-secondary-light"
                  loading="lazy"
                />
                <div>
                  <span className="block text-base font-semibold text-text">
                    {t.name}
                  </span>
                  <span className="text-base text-text/60">{t.relation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accreditation badges */}
      {showBadges && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-10 pt-16 pb-2 flex-wrap">
            {badges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-3 opacity-60 transition-opacity duration-300 hover:opacity-100"
              >
                <div className="w-11 h-11 bg-primary-light rounded-full flex items-center justify-center">
                  <badge.Icon
                    className="w-[22px] h-[22px] text-primary-dark"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <span className="block text-base font-semibold text-text/80 leading-tight">
                    {badge.label}
                  </span>
                  <span className="block text-base text-text/50 font-normal">
                    {badge.sublabel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
