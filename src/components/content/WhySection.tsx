"use client";

import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LeafVinePattern } from "@/components/skin/LeafVinePattern";

export interface WhySlide {
  title: string;
  description: string;
  cta: string;
  href: string;
  image: string;
  imageAlt: string;
}

interface WhySectionProps {
  heading?: string;
  subtitle?: string;
  slides?: WhySlide[];
}

const defaultSlides: WhySlide[] = [
  {
    title: "A Real Home, Not a Facility",
    description:
      "Our warm, residential design and genuine community atmosphere make Golden Oaks feel like an extension of home, where friendships flourish and memories are made daily.",
    cta: "Tour Our Community \u2192",
    href: "/tour",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    imageAlt: "Warm, homelike living spaces at Golden Oaks",
  },
  {
    title: "Transparent Pricing, No Surprises",
    description:
      "We believe honest conversations about costs build trust. Our upfront pricing has no hidden fees, and we\u2019ll walk you through your options with full transparency.",
    cta: "View Pricing Options \u2192",
    href: "/pricing",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    imageAlt: "Transparent pricing consultation at Golden Oaks",
  },
  {
    title: "Care That Grows With You",
    description:
      "As needs change, your loved one can seamlessly transition between Independent, Assisted, and Memory Care without leaving the community they\u2019ve come to love.",
    cta: "Explore Care Levels \u2192",
    href: "/living-options",
    image:
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&q=80",
    imageAlt: "Continuum of care services at Golden Oaks",
  },
  {
    title: "Family Always Welcome",
    description:
      "We maintain an open-door policy with flexible visiting hours, family events throughout the year, and regular care updates so you stay connected and involved.",
    cta: "Plan Your Visit \u2192",
    href: "/visit",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    imageAlt: "Family visiting and spending time together",
  },
];

export function WhySection({
  heading = "Why Families Choose Golden Oaks",
  subtitle,
  slides = defaultSlides,
}: WhySectionProps) {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  const goTo = useCallback(
    (index: number) => setCurrent(((index % total) + total) % total),
    [total],
  );

  return (
    <section className="relative bg-surface py-20 sm:py-24 overflow-hidden">
      {/* Leaf-vine background texture */}
      <LeafVinePattern opacity={0.1} />

      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2
          className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text text-center tracking-tight"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          {heading}
        </h2>
        {subtitle && (
          <p className="mt-4 text-center text-lg text-text/70 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Carousel */}
        <div className="mt-12">
          <div className="flex items-center gap-6">
            {/* Prev arrow */}
            <button
              onClick={() => goTo(current - 1)}
              aria-label="Previous slide"
              className="hidden lg:flex items-center justify-center w-[44px] h-[44px] min-w-[44px] rounded-full border border-text/15 bg-white transition-colors duration-300 hover:bg-primary-light hover:border-primary"
            >
              <ChevronLeft className="w-[18px] h-[18px] text-text/70" strokeWidth={2} />
            </button>

            {/* Inner grid: image + content */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-w-0">
              {/* Image container — crossfade */}
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
                {slides.map((slide, i) => (
                  <img
                    key={i}
                    src={slide.image}
                    alt={slide.imageAlt}
                    loading="lazy"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[600ms] ease-in-out ${
                      i === current ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </div>

              {/* Slide content */}
              <div className="relative">
                {slides.map((slide, i) => (
                  <div key={i} className={i === current ? "block" : "hidden"}>
                    <h3 className="font-heading text-[24px] font-bold text-text mb-6">
                      {slide.title}
                    </h3>
                    <p className="text-text/70 text-base leading-[1.7] max-w-[480px] mb-6">
                      {slide.description}
                    </p>
                    <a
                      href={slide.href}
                      className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-md transition-colors duration-300 hover:bg-primary-dark"
                    >
                      {slide.cta}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Next arrow */}
            <button
              onClick={() => goTo(current + 1)}
              aria-label="Next slide"
              className="hidden lg:flex items-center justify-center w-[44px] h-[44px] min-w-[44px] rounded-full border border-text/15 bg-white transition-colors duration-300 hover:bg-primary-light hover:border-primary"
            >
              <ChevronRight className="w-[18px] h-[18px] text-text/70" strokeWidth={2} />
            </button>
          </div>

          {/* Dot navigation */}
          <div className="flex justify-center gap-2.5 mt-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 bg-primary"
                    : "w-2 bg-text/20 hover:bg-primary-light"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
