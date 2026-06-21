"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { btnDark, container, sectionSubtitle, sectionTag, sectionTitle } from "@/lib/ui-classes"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

function AppShowcase() {
  const t = useTranslations("showcase")

  const HIGHLIGHTS = [
    { label: t("h1Title"), desc: t("h1Desc") },
    { label: t("h2Title"), desc: t("h2Desc") },
    { label: t("h3Title"), desc: t("h3Desc") },
    { label: t("h4Title"), desc: t("h4Desc") },
    { label: t("h5Title"), desc: t("h5Desc") },
  ]

  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return
    const rect = imageRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -6
    const rotateY = ((x - centerX) / centerX) * 6
    gsap.to(imageRef.current, {
      rotateX,
      rotateY,
      duration: 0.6,
      ease: "power2.out",
      transformPerspective: 1200,
    })
  }

  const handleMouseLeave = () => {
    if (imageRef.current)
      gsap.to(imageRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: "power2.out",
      })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        opacity: 0,
        x: -40,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      })
      gsap.from(imageRef.current, {
        opacity: 0,
        x: 40,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      })
      gsap.from("[data-showcase-highlight]", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%", once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="roles" className="bg-brand-surface px-8 py-28 max-md:py-16">
      <div className={cn(container, "grid grid-cols-2 items-center gap-16 max-lg:grid-cols-1 max-lg:gap-12")}>
        <div ref={textRef}>
          <span className={sectionTag}>{t("badge")}</span>
          <h2 className={sectionTitle}>
            {t("title1")}
            <br />
            {t("title2")}
          </h2>
          <p className={sectionSubtitle}>{t("subtitle")}</p>
          <ul className="mt-8 flex flex-col gap-4">
            {HIGHLIGHTS.map((h, i) => (
              <li key={i} data-showcase-highlight className="flex items-start gap-4">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-accent/15 text-sm font-bold text-brand-accent">
                  ✓
                </span>
                <div>
                  <strong className="block text-[0.95rem] font-bold text-brand-dark">{h.label}</strong>
                  <span className="text-[0.88rem] text-brand-muted">{h.desc}</span>
                </div>
              </li>
            ))}
          </ul>
          <Link href="/contact" className={cn(btnDark, "mt-10 inline-flex")}>
            {t("cta")}
          </Link>
        </div>

        <div
          ref={imageRef}
          className="relative max-lg:order-first"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
        >
          <div className="relative">
            <div className="relative transition-transform hover:-translate-y-1">
              <div className="overflow-hidden rounded-[2rem] border-[10px] border-brand-dark bg-brand-dark shadow-[0_30px_60px_rgba(0,0,0,0.25)]">
                <div className="mx-auto h-2 w-2 rounded-full bg-brand-dark" />
                <div className="overflow-hidden rounded-b-[1.5rem] bg-white">
                  <Image
                    src="/addspot-pantalla-ipad.png"
                    alt="ADDSPOT Dashboard Tablet"
                    width={600}
                    height={400}
                    className="block h-auto w-full"
                  />
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-4 w-[130px] transition-transform hover:-translate-y-1 max-lg:w-[130px]">
              <div className="overflow-hidden rounded-[1.5rem] border-[6px] border-brand-dark bg-brand-dark shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
                <div className="mx-auto mb-1 h-1.5 w-12 rounded-full bg-brand-dark" />
                <div className="aspect-[9/19] overflow-hidden rounded-b-[1rem] bg-white">
                  <Image
                    src="/addspot-pantalla1-iphone.png"
                    alt="ADDSPOT App Mobile"
                    width={130}
                    height={260}
                    className="block h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AppShowcase
