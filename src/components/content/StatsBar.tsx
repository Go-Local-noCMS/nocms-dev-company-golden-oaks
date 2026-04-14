"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Users, ClipboardList, ShieldCheck, Clock } from "lucide-react";

export interface Stat {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  description: string;
  icon: "users" | "clipboard" | "shield" | "clock";
}

interface StatsBarProps {
  heading?: string;
  stats?: Stat[];
  showTeamCallout?: boolean;
}

const defaultStats: Stat[] = [
  {
    target: 24,
    suffix: "/7",
    label: "Trained Staff On-Site",
    description:
      "Licensed caregivers and nurses available around the clock for emergencies and support.",
    icon: "users",
  },
  {
    target: 6,
    prefix: "1:",
    label: "Staff-to-Resident Ratio",
    description:
      "Industry-leading staffing ratios ensure personalized attention and prompt response times.",
    icon: "clipboard",
  },
  {
    target: 100,
    suffix: "%",
    label: "State Licensed & Accredited",
    description:
      "Full licensure and accreditation from state health departments and industry bodies.",
    icon: "shield",
  },
  {
    target: 15,
    suffix: "+",
    label: "Years Serving Families",
    description:
      "Established track record of excellence, trust, and compassionate care in senior living.",
    icon: "clock",
  },
];

const iconMap = {
  users: Users,
  clipboard: ClipboardList,
  shield: ShieldCheck,
  clock: Clock,
} as const;

/**
 * Per-stat color scheme matching the Golden Oaks reference:
 *  - iconBg: circular icon container background tint
 *  - iconStroke: icon stroke color
 *  - number: animated number color
 *  - accentBar: top hover bar color
 */
const palette = [
  { iconBg: "bg-sand/[0.12]", iconStroke: "text-sand", number: "text-sand", accentBar: "bg-sand" },
  { iconBg: "bg-secondary/[0.15]", iconStroke: "text-secondary", number: "text-secondary-light", accentBar: "bg-secondary" },
  { iconBg: "bg-accent/[0.15]", iconStroke: "text-accent", number: "text-accent-light", accentBar: "bg-accent" },
  { iconBg: "bg-white/[0.10]", iconStroke: "text-white", number: "text-cream", accentBar: "bg-cream" },
];

function useCountUp(target: number, duration = 1600, shouldAnimate: boolean) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!shouldAnimate) {
      setValue(0);
      return;
    }

    const startTime = performance.now();

    function update(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(update);
      }
    }

    rafRef.current = requestAnimationFrame(update);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, shouldAnimate]);

  return value;
}

function StatNumber({
  target,
  prefix = "",
  suffix = "",
  shouldAnimate,
  className,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  shouldAnimate: boolean;
  className?: string;
}) {
  const value = useCountUp(target, 1600, shouldAnimate);
  return (
    <div className={`font-heading text-4xl font-bold mb-2 ${className ?? ""}`}>
      {prefix}
      {value}
      {suffix}
    </div>
  );
}

export function StatsBar({
  heading = "Your Family\u2019s Safety Is Our Promise",
  stats = defaultStats,
  showTeamCallout = true,
}: StatsBarProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-primary-dark text-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center tracking-tight"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          {heading}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 mt-16">
          {(stats ?? []).map((stat, i) => {
            const colors = palette[i % palette.length];
            const Icon = iconMap[stat.icon] ?? Users;
            return (
              <div
                key={stat.label}
                className="group relative bg-white/[0.08] border border-white/[0.12] rounded-xl px-7 py-9 text-center overflow-hidden transition-all duration-[350ms] ease-out hover:-translate-y-1 hover:bg-white/[0.12] hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)]"
              >
                {/* Top accent bar — grows on hover */}
                <span
                  className={`absolute top-0 left-1/2 -translate-x-1/2 h-1 w-0 group-hover:w-full transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${colors.accentBar}`}
                  aria-hidden="true"
                />

                {/* Icon circle */}
                <div
                  className={`mx-auto mb-5 flex items-center justify-center w-[72px] h-[72px] rounded-full ${colors.iconBg}`}
                >
                  <Icon
                    className={`w-9 h-9 ${colors.iconStroke}`}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>

                {/* Animated number */}
                <StatNumber
                  target={stat.target}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  shouldAnimate={animated}
                  className={colors.number}
                />

                {/* Label */}
                <div className="text-lg font-semibold text-white mb-3">
                  {stat.label}
                </div>

                {/* Description */}
                <p className="text-base text-white/75 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Team callout */}
        {showTeamCallout && (
          <div className="mt-12 pt-10 border-t border-white/10 text-center">
            <p className="text-lg leading-relaxed max-w-[600px] mx-auto mb-6 text-white/75">
              The heart of Golden Oaks is our people. Get to know the caregivers,
              nurses, and staff who make our community feel like family.
            </p>
            <a
              href="/about/team"
              className="group/btn inline-flex items-center gap-2 px-7 py-3 bg-sand text-primary-dark text-base font-semibold rounded-lg border-2 border-sand transition-all duration-300 hover:bg-white hover:text-primary-dark"
            >
              Meet Our Team
              <span
                className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1"
                aria-hidden="true"
              >
                \u2192
              </span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
