"use client"

import { useState, useRef, useEffect } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { container, sectionHeader, sectionSubtitle, sectionTagLime, sectionTitle } from "@/lib/ui-classes"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

type FAQItemData = { question: string; answer: string }

function FAQItem({ question, answer }: FAQItemData) {
  const [isOpen, setIsOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return
    if (isOpen) {
      gsap.to(contentRef.current, {
        height: "auto",
        duration: 0.25,
        ease: "cubic-bezier(0.32, 0.72, 0, 1)",
      })
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        duration: 0.25,
        ease: "cubic-bezier(0.32, 0.72, 0, 1)",
      })
    }
  }, [isOpen])

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-black/[0.06] bg-white transition-[border-color,box-shadow] hover:border-brand-primary/20 hover:shadow-[0_4px_20px_rgba(37,99,235,0.08)]",
        isOpen && "border-brand-primary/30 shadow-[0_4px_20px_rgba(37,99,235,0.1)]"
      )}
    >
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-[1rem] font-semibold text-brand-dark"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="shrink-0 text-brand-muted transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div ref={contentRef} className="overflow-hidden" style={{ height: 0 }}>
        <div className="px-6 pb-5 text-[0.95rem] leading-relaxed text-brand-muted">{answer}</div>
      </div>
    </div>
  )
}

function FAQ() {
  const t = useTranslations("faq")
  const items = t.raw("items") as FAQItemData[]
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-section-header]", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      })
      gsap.from("[data-faq-item]", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="faq" className="bg-brand-surface-secondary px-8 py-28 max-md:py-16">
      <div className={container}>
        <div data-section-header className={sectionHeader}>
          <span className={sectionTagLime}>{t("badge")}</span>
          <h2 className={sectionTitle}>
            {t("title1")} <br /> {t("title2")}
          </h2>
          <p className={sectionSubtitle}>{t("subtitle")}</p>
        </div>

        <div className="mx-auto flex max-w-[800px] flex-col gap-4">
          {items.map((item, index) => (
            <div key={index} data-faq-item>
              <FAQItem question={item.question} answer={item.answer} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
