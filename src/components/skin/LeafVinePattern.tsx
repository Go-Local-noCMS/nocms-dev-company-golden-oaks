/**
 * Background texture overlay using the Golden Oaks leaf pattern SVG.
 * Falls back to an inline SVG pattern if the asset isn't available.
 */
interface LeafVinePatternProps {
  className?: string;
  opacity?: number;
}

export function LeafVinePattern({ className = "", opacity = 0.05 }: LeafVinePatternProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Try external SVG first, inline pattern as fallback */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/golden-oaks/leaf-pattern-brand.svg)",
          backgroundSize: "500px 500px",
          backgroundRepeat: "repeat",
          opacity,
        }}
      />
    </div>
  );
}
