"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const STAT_VALUES = [
  { value: 10, suffix: "+" },
  { value: 100, suffix: "%" },
  { value: 99, suffix: "%" },
  { value: 24, suffix: "/7" },
]

type StatsItem = { label: string }

function Stats() {
  const t = useTranslations("stats")
  const items = t.raw("items") as StatsItem[]
  const sectionRef = useRef<HTMLElement>(null)
  const numRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      numRefs.current.forEach((el, i) => {
        if (!el) return
        const target = STAT_VALUES[i].value
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            const obj = { val: 0 }
            gsap.to(obj, {
              val: target,
              duration: 1.6,
              ease: "power2.out",
              onUpdate() {
                el.textContent = String(Math.round(obj.val))
              },
            })
          },
        })
      })

      gsap.from("[data-stats-item]", {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-black/[0.03] bg-gradient-to-b from-brand-surface-secondary to-brand-surface px-8 py-16"
    >
      <p className="mb-12 text-center text-base font-normal tracking-wide text-brand-muted uppercase">
        {t("headline")}
      </p>
      <div className="mx-auto grid max-w-[900px] grid-cols-4 gap-8 text-center max-md:grid-cols-2 max-sm:grid-cols-1">
        {items.map((s, i) => (
          <div
            key={i}
            data-stats-item
            className="border-r border-brand-surface-secondary px-4 py-6 last:border-r-0 max-md:border-r-0 max-md:border-b max-md:odd:border-r max-md:odd:border-brand-surface-secondary max-sm:border-r-0"
          >
            <div className="mb-2 text-[clamp(2.4rem,5vw,3.5rem)] leading-none font-black tracking-[-0.04em] text-brand-dark">
              <span ref={(el) => { numRefs.current[i] = el }}>{STAT_VALUES[i].value}</span>
              {STAT_VALUES[i].suffix}
            </div>
            <div className="text-[0.9rem] font-normal text-brand-muted">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Stats
