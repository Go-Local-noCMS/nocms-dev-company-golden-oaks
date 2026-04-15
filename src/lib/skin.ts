export interface SkinConfig {
  heroVariant: "video" | "image" | "search" | "simple";
  dividerMotif: "leaf" | "golden-dot" | "line";
  backgroundPattern: "leaf-vine" | "none";
  brandName: string;
  tagline: string;
  phone: string;
  address: string;
  email?: string;
}

export { default as skinConfig } from "@/skin.config";

/**
 * Resolves a skin-specific component variant.
 * Skins can override this to swap in custom visual treatments.
 */
export function resolveSkinComponent<T>(
  componentMap: Record<string, T>,
  variant: string,
  fallback: T
): T {
  return componentMap[variant] ?? fallback;
}
