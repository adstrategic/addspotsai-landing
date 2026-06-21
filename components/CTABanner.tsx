"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { btnLg, btnLime, btnOutline, container } from "@/lib/ui-classes"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

function CTABanner() {
  const t = useTranslations("ctaBanner")
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-cta-animate]", {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="relative overflow-hidden bg-brand-dark px-8 py-28 text-center max-md:py-16"
    >
      <div className="pointer-events-none absolute -top-1/2 -left-[10%] h-[200%] w-1/2 rotate-[30deg] bg-white/10" />
      <div className={cn(container, "relative mx-auto flex max-w-[720px] flex-col items-center")}>
        <p
          data-cta-animate
          className="mb-4 text-[0.82rem] font-bold tracking-[0.12em] text-brand-accent uppercase"
        >
          {t("eyebrow")}
        </p>
        <h2
          data-cta-animate
          className="mb-5 text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.12] font-black tracking-[-0.04em] text-white"
        >
          {t("title1")}
          <br />
          {t("title2")}
        </h2>
        <p data-cta-animate className="mb-10 text-[1.05rem] leading-[1.7] text-white/70">
          {t("subtitle")}
        </p>
        <div data-cta-animate className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/contact" className={cn(btnLime, btnLg)}>
            {t("ctaPrimary")}
          </Link>
          <a
            href="https://wa.me/17542549069"
            className={cn(btnOutline, btnLg)}
            target="_blank"
            rel="noopener noreferrer"
          >
            +1 (754) 254-9069
          </a>
        </div>
        <p data-cta-animate className="mt-6 text-[0.84rem] text-white/50">
          <a
            href="https://addstrategic.com"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            addstrategic.com
          </a>
          {" • "}
          <a
            href="https://instagram.com/addstrategic"
            target="_blank"
            rel="noreferrer"
            className="ml-2.5 underline"
          >
            @addstrategic
          </a>
        </p>
      </div>
    </section>
  )
}

export default CTABanner
