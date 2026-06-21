const DEFAULT_SITE_URL = "https://www.addspotsai.com"

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL
}

export function getEmailLogoUrl() {
  return `${getSiteUrl()}/ADDSPOT-LOG-LETRAS.png`
}

export const EMAIL_FROM =
  process.env.RESEND_FROM_EMAIL ?? "info@news.addspotsai.com"

export const CONTACT_NOTIFY_EMAIL =
  process.env.CONTACT_NOTIFY_EMAIL ?? "adstrategicbusiness@gmail.com"
