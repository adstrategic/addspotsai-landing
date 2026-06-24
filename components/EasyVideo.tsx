import { useTranslations } from "next-intl"
import { container, sectionSubtitle, sectionTagLime, sectionTitle } from "@/lib/ui-classes"
import { cn } from "@/lib/utils"

export default function EasyVideo() {
  const t = useTranslations("easyVideo")

  return (
    <section className="bg-brand-surface px-8 py-24 max-md:py-16">
      <div className={cn(container, "max-w-[1000px] text-center")}>
        <span className={sectionTagLime}>{t("badge")}</span>
        <h2 className={sectionTitle}>{t("title")}</h2>
        <p className={sectionSubtitle}>{t("subtitle")}</p>

        <div className="mt-12 overflow-hidden rounded-2xl border border-brand-accent/20 bg-brand-dark shadow-2xl">
          <div className="relative aspect-video w-full">
            <iframe
              className="absolute top-0 left-0 h-full w-full"
              src="https://www.youtube.com/embed/KGiMZ2DJ-C8"
              title="ADDSPOT Explainer Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
