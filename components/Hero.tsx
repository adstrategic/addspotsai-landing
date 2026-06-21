"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import gsap from "gsap"
import { cn } from "@/lib/utils"
import { btnGhost, btnLime, container, localeHash } from "@/lib/ui-classes"

function Hero() {
  const t = useTranslations("hero")
  const locale = useLocale()
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [
    "/hero-addspot-1.jpg",
    "/hero-addspot-2.jpg",
    "/hero-addspot-3.jpg",
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const badgeRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)
  const imgWrapRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgWrapRef.current) return
    const rect = imgWrapRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * 10
    const rotateY = ((x - centerX) / centerX) * -10
    gsap.to(imgWrapRef.current, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000,
    })
  }

  const handleMouseLeave = () => {
    if (imgWrapRef.current)
      gsap.to(imgWrapRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: "power2.out",
      })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tl.from(badgeRef.current, { opacity: 0, y: 24, duration: 0.6 })
        .from(
          titleRef.current,
          { opacity: 0, scale: 0.95, duration: 0.9, ease: "power3.out" },
          "-=0.3"
        )
        .from(
          subtitleRef.current,
          { opacity: 0, scale: 0.95, duration: 0.7, ease: "power3.out" },
          "-=0.4"
        )
        .from(
          ctasRef.current,
          { opacity: 0, scale: 0.95, duration: 0.6, ease: "power3.out" },
          "-=0.35"
        )
        .from(
          visualRef.current,
          { opacity: 0, x: 60, scale: 0.92, duration: 1.1, ease: "power3.out" },
          "-=0.7"
        )
        .from(scrollHintRef.current, { opacity: 0, duration: 0.5 }, "-=0.1")

      gsap.to(scrollHintRef.current, {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "sine.inOut",
        delay: 1.5,
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden bg-brand-bg-dark px-8 pt-[calc(var(--nav-h)+4rem)] pb-20 text-left"
      id="inicio"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        {slides.map((src, index) => (
          <div
            key={src}
            className={cn(
              "absolute inset-0 scale-105 bg-cover bg-center bg-no-repeat opacity-0 transition-[opacity,transform] duration-[1500ms] ease-in-out",
              index === currentSlide &&
                "scale-100 opacity-100 duration-[10000ms]"
            )}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(135deg, rgba(15, 23, 42, 0.72) 0%, rgba(37, 99, 235, 0.65) 100%), radial-gradient(ellipse 80% 60% at 50% 0%, rgba(56, 189, 248, 0.07) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 100% 100%, rgba(15, 23, 42, 0.6) 0%, transparent 70%)",
        }}
      />

      <div
        className={cn(
          container,
          "relative z-[1] flex w-full max-w-[1280px] flex-row items-center justify-between gap-8 max-lg:flex-col max-lg:gap-0 max-lg:text-center"
        )}
      >
        <div className="relative z-[1] w-full max-w-[860px] max-lg:max-w-full">
          <div
            ref={badgeRef}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-brand-accent/30 bg-brand-accent/10 px-4 py-1.5 text-[0.82rem] font-semibold tracking-wide text-brand-accent"
          >
            <span className="size-1.5 animate-pulse-dot rounded-full bg-brand-accent" />
            {t("badge")}
          </div>

          <h1
            ref={titleRef}
            className="mb-6 font-display text-[clamp(2.6rem,6.5vw,5rem)] leading-[1.08] font-black tracking-[-0.04em] text-white drop-shadow-[0_4px_16px_rgba(15,23,42,0.6)] max-md:text-[clamp(2.2rem,8vw,3.5rem)]"
          >
            {t("title1")}
            <br />
            <em className="text-brand-accent not-italic drop-shadow-[0_2px_8px_rgba(15,23,42,0.6),0_0_20px_rgba(56,189,248,0.4)]">
              {t("titleAccent")}
            </em>
            <br />
            {t("title2")}
          </h1>

          <p
            ref={subtitleRef}
            className="mb-10 max-w-[600px] text-[clamp(1rem,2vw,1.2rem)] leading-[1.7] text-white/95 drop-shadow-[0_2px_8px_rgba(15,23,42,0.5)] max-lg:mx-auto"
          >
            {t("subtitle")}
          </p>

          <div
            ref={ctasRef}
            className="flex flex-wrap items-center justify-start gap-4 max-lg:justify-center max-md:w-full max-md:flex-col max-md:items-stretch"
          >
            <Link
              href="/contact"
              className={cn(
                btnLime,
                "max-md:justify-center max-md:text-center"
              )}
            >
              {t("ctaPrimary")}
            </Link>
            <a
              href={localeHash(locale, "/#como-funciona")}
              className={cn(
                btnGhost,
                "max-md:justify-center max-md:text-center"
              )}
            >
              {t("ctaSecondary")}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          <div className="mt-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
            <span className="text-[0.78rem] font-medium tracking-wide text-white/70">
              Product Powered by Adstrategic
            </span>
          </div>
        </div>

        <div
          ref={visualRef}
          className="relative z-[1] flex -translate-y-10 items-start justify-end max-lg:hidden"
        >
          <div
            ref={imgWrapRef}
            className="relative z-[2] will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <Image
              src="/addspot-mockup1.png"
              alt="ADDSPOT App — Live Dashboard"
              width={420}
              height={840}
              className="block h-auto w-full max-w-[420px] drop-shadow-[0_32px_64px_rgba(0,0,0,0.55),0_0_40px_rgba(56,189,248,0.22),0_8px_24px_rgba(15,23,42,0.6)] max-sm:max-w-[260px]"
              priority
            />
            <div className="pointer-events-none absolute -bottom-8 left-1/2 z-[-1] h-10 w-[70%] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(56,189,248,0.35)_0%,transparent_70%)] blur-2xl" />
          </div>
        </div>
      </div>

      <div
        ref={scrollHintRef}
        className="absolute bottom-8 left-1/2 z-[1] -translate-x-1/2 text-white/40"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 5v14M5 12l7 7 7-7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  )
}

export default Hero
