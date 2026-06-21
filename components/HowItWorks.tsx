"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { container, sectionHeader, sectionSubtitle, sectionTag, sectionTitle } from "@/lib/ui-classes"

gsap.registerPlugin(ScrollTrigger)

type Step = { title: string; desc: string; tag: string }

function HowItWorks() {
  const t = useTranslations("howItWorks")
  const steps = t.raw("steps") as Step[]
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-section-header]", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      })
      gsap.from("[data-hiw-step]", {
        opacity: 0,
        y: 50,
        stagger: 0.08,
        duration: 0.8,
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
    <section ref={sectionRef} id="como-funciona" className="bg-brand-surface px-8 py-28 max-md:py-16">
      <div className={container}>
        <div data-section-header className={sectionHeader}>
          <span className={sectionTag}>{t("badge")}</span>
          <h2 className={sectionTitle}>
            {t("title1")}
            <br />
            {t("title2")}
          </h2>
          <p className={sectionSubtitle}>{t("subtitle")}</p>
        </div>

        <div className="relative grid grid-cols-3 gap-8 max-md:grid-cols-1 max-md:gap-10">
          <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-brand-primary/20 max-md:hidden" />
          {steps.map((step, i) => (
            <div key={i} data-hiw-step className="relative ml-4 pl-10">
              <div className="absolute -left-3 flex size-8 items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-white">
                {`0${i + 1}`}
              </div>
              <span className="mb-2 inline-block text-[0.75rem] font-bold tracking-widest text-brand-accent uppercase">
                {step.tag}
              </span>
              <h3 className="mb-3 text-xl font-bold tracking-tight text-brand-dark">{step.title}</h3>
              <p className="text-[0.95rem] leading-relaxed text-brand-muted">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
