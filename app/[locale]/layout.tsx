import { NextIntlClientProvider } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"
import { hasLocale } from "next-intl"
import { notFound } from "next/navigation"
import { Outfit, Plus_Jakarta_Sans } from "next/font/google"
import { routing } from "@/i18n/routing"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import "../globals.css"

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
})

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn("antialiased", plusJakarta.variable, outfit.variable, "font-sans")}
    >
      <body>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
