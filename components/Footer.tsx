"use client"

import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { container, localeHash } from "@/lib/ui-classes"

function Footer() {
  const t = useTranslations("footer")
  const locale = useLocale()

  const footerLinks = {
    [t("col1")]: [
      {
        label: t("links.features"),
        href: localeHash(locale, "/#caracteristicas"),
      },
      { label: t("links.modules"), href: localeHash(locale, "/#modulos") },
      {
        label: t("links.howItWorks"),
        href: localeHash(locale, "/#como-funciona"),
      },
      { label: t("links.benefits"), href: localeHash(locale, "/#competencia") },
    ],
    [t("col2")]: [
      { label: t("links.about"), href: "https://addstrategic.com" },
      { label: t("links.contact"), href: "/contact" as const },
      { label: t("links.demo"), href: "/contact" as const },
    ],
    [t("col3")]: [
      { label: t("links.privacy"), href: "#" },
      { label: t("links.terms"), href: "#" },
    ],
  }

  return (
    <footer className="bg-brand-dark pt-20 text-white/70">
      <div
        className={`${container} grid grid-cols-[2fr_3fr] gap-16 border-b border-white/10 pb-16 max-lg:grid-cols-1 max-lg:gap-12`}
      >
        <div>
          <a href="https://addstrategic.com" className="mb-5 inline-block">
            <Image
              src="/addstrategic-blanco.png"
              alt="ADDSPOT by ADDSTRATEGIC"
              width={160}
              height={32}
              className="h-8 w-auto"
            />
          </a>
          <p className="mb-4 max-w-[300px] text-[0.9rem] leading-[1.65]">
            {t("tagline")}
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <a
              href="https://addstrategic.com"
              target="_blank"
              rel="noreferrer"
              className="text-[0.88rem] text-brand-accent transition-opacity hover:opacity-80"
            >
              addstrategic.com
            </a>
            <a
              href="mailto:adstrategicbusiness@gmail.com"
              className="text-[0.88rem] text-brand-accent transition-opacity hover:opacity-80"
            >
              adstrategicbusiness@gmail.com
            </a>
            <a
              href="https://wa.me/17542549069"
              target="_blank"
              rel="noreferrer"
              className="text-[0.88rem] text-brand-accent transition-opacity hover:opacity-80"
            >
              +1 754 254 9069
            </a>
            <a
              href="https://instagram.com/addstrategic"
              target="_blank"
              rel="noreferrer"
              className="text-[0.88rem] text-brand-accent transition-opacity hover:opacity-80"
            >
              Instagram: @addstrategic
            </a>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 max-md:grid-cols-2 max-sm:grid-cols-1">
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="mb-5 text-[0.8rem] font-bold tracking-[0.1em] text-white uppercase">
                {group}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("http") || link.href === "#" ? (
                      <a
                        href={link.href}
                        className="text-[0.88rem] text-white/60 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-[0.88rem] text-white/60 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-black/20 py-6">
        <div
          className={`${container} flex flex-wrap items-center justify-between gap-4 max-md:flex-col max-md:text-center`}
        >
          <p className="text-[0.82rem] text-white/40">
            © {new Date().getFullYear()}{" "}
            <a href="https://addstrategic.com" target="_blank" rel="noreferrer">
              ADDSTRATEGIC LLC
            </a>{" "}
            - {t("copyright1")}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
