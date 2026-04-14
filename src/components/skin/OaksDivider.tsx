interface OaksDividerProps {
  className?: string;
}

export function OaksDivider({ className = "" }: OaksDividerProps) {
  return (
    <div className={`flex items-center justify-center gap-3 py-3 ${className}`} aria-hidden="true">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/30" />
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary/40" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 Q18 8 18 14 Q18 20 12 22 Q6 20 6 14 Q6 8 12 3 M12 8 Q14 10 15 12 M12 12 Q10 14 9 16" />
      </svg>
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/30" />
    </div>
  );
}
