import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import PresentationPage from "../../../components/PresentationPage"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "seo" })

  return {
    title: `Presentación | ${t("homeTitle")}`,
    description: t("homeDesc"),
  }
}

export default async function Presentacion({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <PresentationPage />
}
