import { cn } from "@/lib/utils"

export const container = "mx-auto w-full max-w-[1280px] px-8"

export const btnBase =
  "inline-flex items-center gap-2 whitespace-nowrap rounded-full px-7 py-3.5 text-[0.95rem] font-semibold tracking-tight transition-[transform,box-shadow,background,color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5"

export const btnLime = cn(
  btnBase,
  "bg-brand-accent text-brand-dark shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),0_6px_16px_rgba(56,189,248,0.3)] hover:bg-brand-accent hover:shadow-[0_6px_20px_rgba(56,189,248,0.35)]"
)

export const btnGhost = cn(
  btnBase,
  "border border-white/20 bg-white/5 text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.2)] backdrop-blur-md hover:bg-white/[0.08]"
)

export const btnDark = cn(
  btnBase,
  "bg-brand-dark text-white shadow-[0_4px_14px_rgba(15,23,42,0.25)] hover:bg-brand-dark/90"
)

export const btnOutline = cn(
  btnBase,
  "border border-white/30 bg-transparent text-white hover:bg-white/10"
)

export const btnLg = "px-8 py-4 text-[1.05rem]"

export const sectionHeader = "mb-12 text-center"

export const sectionTag =
  "mb-4 inline-block rounded-full bg-brand-primary/10 px-4 py-1.5 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-brand-primary"

export const sectionTagLime =
  "mb-4 inline-block rounded-full border border-brand-accent/30 bg-brand-accent/10 px-4 py-1.5 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-brand-accent"

export const sectionTitle =
  "font-display text-[clamp(2rem,4vw,3rem)] font-black leading-[1.12] tracking-[-0.04em] text-brand-text"

export const sectionTitleWhite = "text-white"

export const sectionSubtitle =
  "mx-auto mt-4 max-w-[640px] text-[1.05rem] leading-relaxed text-brand-muted"

export const sectionSubtitleMuted = "text-white/65"

export function localeHash(locale: string, hash: string) {
  return locale === "es" ? `/es${hash}` : hash
}

export function localePath(locale: string, path: string) {
  return locale === "es" ? `/es${path}` : path
}
