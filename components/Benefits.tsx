"use client"

import { useRef, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import ComparisonCarousel from "./ComparisonCarousel"
import {
  btnLg,
  btnLime,
  container,
  sectionHeader,
  sectionSubtitle,
  sectionSubtitleMuted,
  sectionTagLime,
  sectionTitle,
  sectionTitleWhite,
} from "@/lib/ui-classes"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

type ContrastItem = { title: string; problem: string; solution: string }

function Benefits() {
  const t = useTranslations("benefits")
  const contrast = t.raw("contrast") as ContrastItem[]
  const sectionRef = useRef<HTMLElement>(null)
  const contrastRef = useRef<HTMLDivElement>(null)
  const isInteracting = useRef(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-section-header]", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      })
      gsap.from(".comparison-carousel", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: { trigger: ".comparison-carousel", start: "top 75%", once: true },
      })
      gsap.from("[data-contrast-item]", {
        opacity: 0,
        y: 40,
        clipPath: "inset(0 0 100% 0)",
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-contrast-grid]", start: "top 80%", once: true },
      })
      gsap.from("[data-comp-cta]", {
        opacity: 0,
        scale: 0.95,
        y: 20,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: { trigger: "[data-comp-cta]", start: "top 90%", once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const autoScroll = setInterval(() => {
      if (window.innerWidth > 900 || isInteracting.current) return
      const ref = contrastRef.current
      if (!ref) return
      const { scrollLeft, scrollWidth, clientWidth } = ref
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        ref.scrollTo({ left: 0, behavior: "smooth" })
      } else {
        ref.scrollBy({ left: clientWidth * 0.75, behavior: "smooth" })
      }
    }, 3500)
    return () => clearInterval(autoScroll)
  }, [])

  const pauseAutoScroll = () => {
    isInteracting.current = true
  }
  const resumeAutoScroll = () => {
    isInteracting.current = false
  }

  return (
    <section ref={sectionRef} id="competencia" className="bg-brand-dark px-8 py-28 max-md:py-16">
      <div className={container}>
        <div data-section-header className={sectionHeader}>
          <span className={sectionTagLime}>{t("badge")}</span>
          <h2 className={cn(sectionTitle, sectionTitleWhite)}>
            {t("title1")}
            <br />
            {t("title2")}
          </h2>
          <p className={cn(sectionSubtitle, sectionSubtitleMuted)}>{t("subtitle")}</p>
          <p className="mt-2 text-[0.9rem] text-[#94A3B8]">Desliza para descubrir por qué lideramos la industria</p>
        </div>

        <ComparisonCarousel />

        <div
          data-contrast-grid
          ref={contrastRef}
          className="mb-12 flex gap-6 overflow-x-auto pb-4 max-md:snap-x max-md:snap-mandatory"
          onTouchStart={pauseAutoScroll}
          onTouchEnd={resumeAutoScroll}
          onMouseEnter={pauseAutoScroll}
          onMouseLeave={resumeAutoScroll}
        >
          {contrast.map((item, idx) => (
            <div
              key={idx}
              data-contrast-item
              className="min-w-[300px] flex-1 snap-start rounded-3xl border border-white/10 bg-white/5 p-6 max-md:min-w-[85vw]"
            >
              <h3 className="mb-4 text-base font-bold text-white">{item.title}</h3>
              <div className="mb-4 flex items-start gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-sm font-bold text-red-400">
                  ✕
                </span>
                <p className="text-[0.88rem] leading-relaxed text-white/65">{item.problem}</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-accent/20 text-sm font-bold text-brand-accent">
                  ✓
                </span>
                <p className="text-[0.88rem] leading-relaxed text-white/85">{item.solution}</p>
              </div>
            </div>
          ))}
        </div>

        <div data-comp-cta className="text-center">
          <p className="mx-auto mb-6 max-w-[720px] text-[1.05rem] leading-relaxed text-white/70">
            {t("ctaText")}
          </p>
          <Link href="/contact" className={cn(btnLime, btnLg, "inline-flex")}>
            {t("ctaButton")}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Benefits
