"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import { Link, usePathname, useRouter } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { btnLime, localeHash } from "@/lib/ui-classes"

function Navbar() {
  const t = useTranslations("navbar")
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { label: t("features"), href: "/#caracteristicas" },
    { label: t("howItWorks"), href: "/#como-funciona" },
    { label: t("benefits"), href: "/#competencia" },
    { label: t("modules"), href: "/#roles" },
    { label: t("presentation"), href: "/presentacion" },
  ]

  const toggleLanguage = () => {
    router.replace(pathname, { locale: locale === "es" ? "en" : "es" })
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  const handleNavClick = () => setMenuOpen(false)

  return (
    <header
      className={cn(
        "fixed top-0 left-1/2 z-[1000] h-[var(--nav-h)] w-full max-w-full -translate-x-1/2 border border-transparent bg-brand-dark transition-[width,max-width,top,height,border-radius,background-color,border-color,box-shadow] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
        scrolled &&
          "top-5 h-[60px] w-max max-w-[calc(100vw-2rem)] rounded-full border-white/10 bg-brand-dark/85 shadow-[0_20px_40px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-xl"
      )}
    >
      <div
        className={cn(
          "mx-auto flex h-full max-w-[1280px] items-center justify-between gap-8 px-8 transition-[padding,gap] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled && "gap-6 px-5"
        )}
      >
        <div className="shrink-0">
          <Link href="/">
            <Image
              src="/ADDSPOT-LOG-LETRAS.png"
              alt="ADDSPOT Logo"
              width={160}
              height={48}
              className={cn(
                "h-12 w-auto object-contain transition-[height] duration-300",
                scrolled && "h-7"
              )}
              priority
            />
          </Link>
        </div>

        <nav
          className={cn(
            "flex items-center gap-8 transition-[gap] duration-300 max-md:fixed max-md:top-full max-md:left-1/2 max-md:z-[999] max-md:-ml-[50vw] max-md:flex max-md:h-screen max-md:w-screen max-md:-translate-x-0 max-md:translate-x-[100vw] max-md:flex-col max-md:items-center max-md:justify-start max-md:gap-8 max-md:bg-brand-dark max-md:pt-12 max-md:text-[1.3rem] max-md:transition-transform max-md:duration-350 max-md:ease-[cubic-bezier(0.16,1,0.3,1)]",
            menuOpen && "max-md:translate-x-0",
            scrolled && "gap-6"
          )}
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href as any}
              className="text-[0.9rem] font-normal text-white/80 transition-colors hover:text-white"
              onClick={handleNavClick}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={cn(
              btnLime,
              "hidden px-5 py-2.5 text-[1.1rem] max-md:inline-flex"
            )}
            onClick={handleNavClick}
          >
            {t("requestDemo")}
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-4">
          <button
            type="button"
            className="rounded-md border border-white/20 px-2 py-2 text-[0.9rem] font-bold text-white/80 transition-colors hover:text-white"
            onClick={toggleLanguage}
          >
            {locale === "es" ? "EN" : "ES"}
          </button>
          <Link
            href="/contact"
            className={cn(btnLime, "px-5 py-2.5 text-[0.88rem] max-md:hidden")}
          >
            {t("requestDemo")}
          </Link>
          <button
            type="button"
            className={cn(
              "hidden h-7 w-7 flex-col justify-center gap-[5px] p-0 max-md:flex",
              menuOpen &&
                "[&>span:nth-child(1)]:translate-y-[7px] [&>span:nth-child(1)]:rotate-45 [&>span:nth-child(2)]:opacity-0 [&>span:nth-child(3)]:translate-y-[-7px] [&>span:nth-child(3)]:-rotate-45"
            )}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span className="block h-0.5 origin-center rounded-sm bg-white transition-[transform,opacity]" />
            <span className="block h-0.5 origin-center rounded-sm bg-white transition-[transform,opacity]" />
            <span className="block h-0.5 origin-center rounded-sm bg-white transition-[transform,opacity]" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
