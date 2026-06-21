"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMemo, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useTranslations } from "next-intl"

import { LandingButton } from "@/components/landing-button"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Link } from "@/i18n/navigation"
import {
  createContactSchema,
  type ContactFormValues,
} from "@/lib/contact-schema"
import { container, sectionTitle } from "@/lib/ui-classes"
import { cn } from "@/lib/utils"

const fieldInputClassName =
  "h-auto w-full rounded-3xl border-black/10 bg-brand-surface-secondary px-4 py-3.5 font-[inherit] text-[0.95rem] text-brand-text shadow-none transition-[border-color,box-shadow,background] focus-visible:border-brand-primary focus-visible:bg-brand-surface focus-visible:shadow-[0_0_0_3px_rgba(37,99,235,0.15)] focus-visible:ring-0"

const fieldLabelClassName =
  "mb-2 block text-[0.88rem] font-semibold text-brand-text"

export default function ContactPage() {
  const t = useTranslations("contact")
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const contactSchema = useMemo(
    () =>
      createContactSchema({
        name: t("errors.name"),
        company: t("errors.company"),
        email: t("errors.email"),
        phone: t("errors.phone"),
      }),
    [t]
  )

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      message: "",
    },
  })

  const isSubmitting = form.formState.isSubmitting

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitError("")

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error("Request failed")
      }

      setIsSuccess(true)
    } catch {
      setSubmitError(t("errors.submit"))
    }
  }

  return (
    <div id="page-wrapper">
      <Navbar />
      <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.05)_0%,var(--brand-surface)_70%)] px-8 pt-[calc(var(--nav-h)+4rem)] pb-28">
        <div
          className={cn(
            container,
            "grid max-w-[1100px] grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20"
          )}
        >
          <div>
            <Link
              href="/"
              className="mb-8 inline-block text-[0.9rem] font-semibold text-brand-muted transition-colors hover:text-brand-primary"
            >
              {t("back")}
            </Link>
            <h1 className={sectionTitle}>
              {t("title1")}
              <br />
              {t("title2")}
            </h1>
            <p className="mt-6 mb-12 max-w-[90%] text-[1.1rem] leading-[1.7] text-brand-muted">
              {t("desc")}
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <strong className="text-[0.85rem] tracking-[0.05em] text-brand-muted uppercase">
                  Email
                </strong>
                <a
                  href="mailto:adstrategicbusiness@gmail.com"
                  className="text-[1.1rem] font-semibold text-brand-dark transition-colors hover:text-brand-primary"
                >
                  adstrategicbusiness@gmail.com
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <strong className="text-[0.85rem] tracking-[0.05em] text-brand-muted uppercase">
                  WhatsApp
                </strong>
                <a
                  href="https://wa.me/17542549069"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[1.1rem] font-semibold text-brand-dark transition-colors hover:text-brand-primary"
                >
                  +1 (754) 254-9069
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-black/[0.06] bg-brand-surface p-8 shadow-[0_20px_40px_rgba(0,0,0,0.06)] md:p-12">
            {isSuccess ? (
              <div>
                <h3 className="mb-8 text-2xl font-extrabold tracking-[-0.02em] text-brand-dark">
                  {t("formTitle")}
                </h3>
                <p className="rounded-md bg-emerald-500/10 p-4 text-center text-[0.9rem] font-semibold text-emerald-600">
                  {t("success")}
                </p>
              </div>
            ) : (
              <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
                <h3 className="mb-8 text-2xl font-extrabold tracking-[-0.02em] text-brand-dark">
                  {t("formTitle")}
                </h3>

                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="mb-6 flex-col gap-0"
                    >
                      <FieldLabel
                        htmlFor={field.name}
                        className={fieldLabelClassName}
                      >
                        {t("nameLabel")}
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="text"
                        placeholder={t("namePh")}
                        aria-invalid={fieldState.invalid}
                        className={fieldInputClassName}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="company"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="mb-6 flex-col gap-0"
                    >
                      <FieldLabel
                        htmlFor={field.name}
                        className={fieldLabelClassName}
                      >
                        {t("companyLabel")}
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="text"
                        placeholder={t("companyPh")}
                        aria-invalid={fieldState.invalid}
                        className={fieldInputClassName}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="mb-6 flex-col gap-0"
                    >
                      <FieldLabel
                        htmlFor={field.name}
                        className={fieldLabelClassName}
                      >
                        {t("emailLabel")}
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="email"
                        placeholder={t("emailPh")}
                        aria-invalid={fieldState.invalid}
                        className={fieldInputClassName}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="phone"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="mb-6 flex-col gap-0"
                    >
                      <FieldLabel
                        htmlFor={field.name}
                        className={fieldLabelClassName}
                      >
                        {t("phoneLabel")}
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="tel"
                        placeholder={t("phonePh")}
                        aria-invalid={fieldState.invalid}
                        className={fieldInputClassName}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="message"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="mb-6 flex-col gap-0"
                    >
                      <FieldLabel
                        htmlFor={field.name}
                        className={fieldLabelClassName}
                      >
                        {t("messageLabel")}
                      </FieldLabel>
                      <Textarea
                        {...field}
                        id={field.name}
                        rows={4}
                        placeholder={t("messagePh")}
                        aria-invalid={fieldState.invalid}
                        className={cn(fieldInputClassName, "min-h-0")}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <LandingButton
                  type="submit"
                  variant="lime"
                  size="full"
                  className="mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t("sending") : t("submit")}
                </LandingButton>

                {submitError ? (
                  <p className="mt-5 rounded-md bg-destructive/10 p-4 text-center text-[0.9rem] font-semibold text-destructive">
                    {submitError}
                  </p>
                ) : null}
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
