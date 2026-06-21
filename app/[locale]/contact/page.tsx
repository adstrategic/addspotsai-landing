import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import ContactPage from "../../../components/ContactPage"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "seo" })

  return {
    title: t("contactTitle"),
    description: t("contactDesc"),
    openGraph: {
      title: t("contactTitle"),
      description: t("contactDesc"),
      images: ["/og-image.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: t("contactTitle"),
      description: t("contactDesc"),
      images: ["/og-image.jpg"],
    },
  }
}

export default async function Contact({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <ContactPage />
}
