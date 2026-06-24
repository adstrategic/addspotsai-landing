"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { container, sectionSubtitle, sectionTitle } from "@/lib/ui-classes"
import { cn } from "@/lib/utils"

export default function PresentationPage() {
  const t = useTranslations("presentation")
  const [activeTab, setActiveTab] = useState<"easy" | "tech">("easy")

  return (
    <div className="flex min-h-screen flex-col bg-brand-dark">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24 max-md:pt-24 max-md:pb-16">
        <div className={cn(container, "max-w-[1000px] text-center")}>
          <h1 className={cn(sectionTitle, "text-white")}>
            {t("title1")} <span className="text-brand-accent">{t("title2")}</span>
          </h1>
          <p className={cn(sectionSubtitle, "text-white/70")}>{t("subtitle")}</p>

          <div className="mt-10 mb-8 flex justify-center">
            <div className="inline-flex rounded-full bg-white/10 p-1 backdrop-blur-md">
              <button
                type="button"
                onClick={() => setActiveTab("easy")}
                className={cn(
                  "rounded-full px-6 py-2.5 text-[0.95rem] font-semibold transition-colors",
                  activeTab === "easy"
                    ? "bg-brand-accent text-brand-dark shadow-md"
                    : "text-white/70 hover:text-white"
                )}
              >
                {t("tabEasy")}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("tech")}
                className={cn(
                  "rounded-full px-6 py-2.5 text-[0.95rem] font-semibold transition-colors",
                  activeTab === "tech"
                    ? "bg-brand-accent text-brand-dark shadow-md"
                    : "text-white/70 hover:text-white"
                )}
              >
                {t("tabTech")}
              </button>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[900px] overflow-hidden rounded-2xl border border-white/10 bg-black/50 shadow-2xl">
            <div className="relative aspect-video w-full">
              {activeTab === "easy" ? (
                <iframe
                  key="easy"
                  className="absolute top-0 left-0 h-full w-full"
                  src="https://www.youtube.com/embed/KGiMZ2DJ-C8"
                  title="ADDSPOT Executive Summary"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <iframe
                  key="tech"
                  className="absolute top-0 left-0 h-full w-full"
                  src="https://www.youtube.com/embed/1SLLnJHewjk"
                  title="ADDSPOT Technical Detail"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
