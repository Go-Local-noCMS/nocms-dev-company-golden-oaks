'use client';

export function CrisisPulseIcon({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {children}
      <span
        className="absolute inset-[-6px] rounded-full border-2 border-secondary animate-[crisis-pulse_2.5s_ease-out_infinite]"
        aria-hidden="true"
      />
      <style>{`
        @keyframes crisis-pulse {
          0% { transform: scale(0.95); opacity: 0.6; }
          70% { transform: scale(1.15); opacity: 0; }
          100% { transform: scale(1.15); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
