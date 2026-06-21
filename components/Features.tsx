"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { container, sectionHeader, sectionSubtitle, sectionTitle } from "@/lib/ui-classes"

gsap.registerPlugin(ScrollTrigger)

function Features() {
  const t = useTranslations("features")
  const sectionRef = useRef<HTMLElement>(null)

  const FEATURES = [
    {
      title: t("f1Title"),
      desc: t("f1Desc"),
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
        </svg>
      ),
    },
    {
      title: t("f2Title"),
      desc: t("f2Desc"),
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
    },
    {
      title: t("f3Title"),
      desc: t("f3Desc"),
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
      ),
    },
    {
      title: t("f4Title"),
      desc: t("f4Desc"),
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      ),
    },
    {
      title: t("f5Title"),
      desc: t("f5Desc"),
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: t("f6Title"),
      desc: t("f6Desc"),
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-feature-card]", {
        opacity: 0,
        y: 40,
        stagger: 0.04,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      })
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
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="caracteristicas"
      className="bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.05)_0%,var(--brand-surface)_60%)] px-8 py-28 max-md:py-16"
    >
      <div className={container}>
        <div data-section-header className={sectionHeader}>
          <h2 className={sectionTitle}>
            {t("title1")}
            <br />
            {t("title2")}
          </h2>
          <p className={sectionSubtitle}>{t("subtitle")}</p>
        </div>

        <div className="mt-0 grid grid-cols-3 gap-6 max-md:grid-cols-1" id="modulos">
          {FEATURES.map((f, i) => (
            <article
              key={i}
              data-feature-card
              className="rounded-3xl border-none bg-gradient-to-br from-white to-brand-surface-secondary p-9 shadow-[8px_8px_16px_rgba(56,189,248,0.08),-8px_-8px_16px_rgba(255,255,255,0.8),inset_2px_2px_4px_rgba(255,255,255,1)] transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.13)]"
            >
              <div className="mb-5 size-[52px] text-brand-dark [&_svg]:size-full">{f.icon}</div>
              <h3 className="mb-2.5 text-[1.1rem] font-bold tracking-tight text-brand-dark">{f.title}</h3>
              <p className="text-[0.95rem] font-light leading-[1.65] text-brand-muted">{f.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
