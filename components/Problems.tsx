"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { btnLime, container, sectionSubtitle, sectionSubtitleMuted, sectionTagLime, sectionTitle, sectionTitleWhite } from "@/lib/ui-classes"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

function Problems() {
  const t = useTranslations("problems")
  const items = t.raw("items") as string[]
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-problems-header]", {
        opacity: 0,
        x: -40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      })
      gsap.from("[data-problems-item]", {
        opacity: 0,
        x: 30,
        stagger: 0.07,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-brand-dark px-8 py-28 max-md:py-16">
      <div className={cn(container, "grid grid-cols-2 items-start gap-20 max-md:grid-cols-1 max-md:gap-12")}>
        <div
          data-problems-header
          className="sticky top-[calc(var(--nav-h)+2rem)] max-md:static max-md:text-center"
        >
          <span className={sectionTagLime}>{t("badge")}</span>
          <h2 className={cn(sectionTitle, sectionTitleWhite, "text-left max-md:text-center")}>
            {t("title1")}
            <br />
            {t("title2")}
          </h2>
          <p className={cn(sectionSubtitle, sectionSubtitleMuted, "mx-0 mt-4 max-w-none text-left max-md:mx-auto max-md:text-center")}>
            {t("subtitle")}
          </p>
          <Link href="/contact" className={cn(btnLime, "mt-8 inline-flex")}>
            {t("cta")}
          </Link>
        </div>

        <ul className="flex flex-col gap-3.5">
          {items.map((p, i) => (
            <li
              key={i}
              data-problems-item
              className="flex items-start gap-4 rounded-3xl border border-white/[0.03] bg-white/5 p-4 px-5 text-[0.95rem] text-[#F8FAFC] shadow-[8px_8px_24px_rgba(0,0,0,0.4),inset_2px_2px_4px_rgba(255,255,255,0.05)] transition-colors hover:bg-white/[0.08]"
            >
              <span className="mt-0.5 shrink-0 text-base font-bold text-[#ff6b6b]" aria-hidden="true">
                ✕
              </span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Problems
