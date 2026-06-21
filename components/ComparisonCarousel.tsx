"use client"

import { useCallback, useEffect, useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { Check, ChevronLeft, ChevronRight, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

type TableRow = string[]

const ComparisonCarousel = () => {
  const t = useTranslations("benefits.table")
  const locale = useLocale()
  const rows = t.raw("rows") as TableRow[]
  const headers = t.raw("headers") as string[]
  const competitorLabel = headers[2] || "Competencia"
  const winnerText = locale === "es" ? "GANADOR" : "WINNER"

  const cards = rows.map((row) => ({
    title: row[0],
    competitorText: row[2],
    addspotText: row[3],
  }))

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]
  )

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on("select", onSelect)
    onSelect()
  }, [emblaApi])

  return (
    <div className="comparison-carousel mb-12">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={cn(
                "min-w-0 flex-[0_0_100%] px-1 sm:flex-[0_0_80%] lg:flex-[0_0_60%]",
                idx === selectedIndex && "comparison-card--active"
              )}
            >
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[8px_8px_24px_rgba(0,0,0,0.4)] transition-[transform,box-shadow] hover:shadow-[0_12px_40px_rgba(56,189,248,0.15)]">
                <h3 className="mb-5 text-lg font-bold text-white">{card.title}</h3>
                <div className="flex flex-col gap-4">
                  <div>
                    <span className="mb-2 block text-[0.72rem] font-bold tracking-widest text-white/50 uppercase">
                      {competitorLabel}
                    </span>
                    <div className="flex items-start gap-3 text-[0.9rem] text-white/70">
                      <Minus size={18} className="mt-0.5 shrink-0 text-red-400" />
                      <p>{card.competitorText}</p>
                    </div>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-[0.72rem] font-bold tracking-widest text-brand-accent uppercase">
                        ADDSPOT
                      </span>
                      <span className="rounded-full bg-brand-accent/20 px-2 py-0.5 text-[0.65rem] font-bold text-brand-accent">
                        {winnerText}
                      </span>
                    </div>
                    <div className="flex items-start gap-3 text-[0.9rem] text-white/90">
                      <Check size={18} className="mt-0.5 shrink-0 text-brand-accent" />
                      <p>{card.addspotText}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <button
          type="button"
          className="flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors hover:bg-white/10"
          onClick={scrollPrev}
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          type="button"
          className="flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors hover:bg-white/10"
          onClick={scrollNext}
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  )
}

export default ComparisonCarousel
