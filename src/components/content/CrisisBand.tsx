import { Heart, Phone } from "lucide-react";
import skinConfig from "@/skin.config";
import { CrisisPulseIcon } from "@/components/skin/CrisisPulseIcon";

interface CrisisBandProps {
  heading?: string;
  description?: string;
  phone?: string;
  ctaText?: string;
}

export function CrisisBand({
  heading = "Need Care for Your Loved One Quickly?",
  description = "You don\u2019t have to figure this out alone. Our admissions team understands the urgency and will walk through your options with care and clarity.",
  phone = skinConfig.phone,
  ctaText = "Get Help Now",
}: CrisisBandProps) {
  return (
    <section className="relative bg-primary-dark overflow-hidden">
      {/* Background image overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=1600&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.08,
        }}
      />

      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto">
          {/* Pulsing icon */}
          <div className="flex justify-center mb-7">
            <CrisisPulseIcon className="w-[80px] h-[80px] rounded-full bg-secondary">
              <Heart
                className="w-9 h-9 text-white"
                strokeWidth={2}
                aria-hidden="true"
              />
            </CrisisPulseIcon>
          </div>

          {/* Heading */}
          <h3 className="font-heading text-[26px] font-bold text-white mb-4">
            {heading}
          </h3>

          {/* Description */}
          <p className="text-white/75 text-base leading-relaxed mb-8 max-w-xl mx-auto">
            {description}
          </p>

          {/* Phone number */}
          <a
            href={`tel:${phone.replace(/[^\d+]/g, "")}`}
            className="inline-flex items-center gap-2.5 font-heading text-2xl lg:text-3xl font-bold text-sand mb-8 transition-colors duration-300 hover:text-white"
          >
            <Phone className="w-6 h-6" strokeWidth={2} aria-hidden="true" />
            {phone}
          </a>

          {/* CTA button */}
          <div>
            <a
              href={`tel:${phone.replace(/[^\d+]/g, "")}`}
              className="inline-block bg-secondary text-white font-semibold px-8 py-4 rounded-md transition-all duration-300 hover:brightness-110 hover:shadow-lg"
            >
              {ctaText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
