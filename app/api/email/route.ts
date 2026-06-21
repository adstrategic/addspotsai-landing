import { NextResponse } from "next/server"
import { Resend } from "resend"

import NewUser from "@/components/Emails/NewUser"
import WelcomeEmail from "@/components/Emails/Welcome"
import { CONTACT_NOTIFY_EMAIL, EMAIL_FROM } from "@/lib/email-brand"
import { contactPayloadSchema } from "@/lib/contact-schema"

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    return null
  }

  return new Resend(apiKey)
}

export async function POST(request: Request) {
  const resend = getResendClient()

  if (!resend) {
    return NextResponse.json(
      { error: "Email service is not configured" },
      { status: 503 }
    )
  }

  const parsed = contactPayloadSchema.safeParse(await request.json())

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  const { name, company, email, phone, message } = parsed.data

  const { data, error } = await resend.batch.send([
    {
      from: `ADDSPOT <${EMAIL_FROM}>`,
      to: [email],
      subject: "Thanks for requesting an ADDSPOT demo",
      react: WelcomeEmail({ userFirstName: name }),
    },
    {
      from: `ADDSPOT Website <${EMAIL_FROM}>`,
      to: [CONTACT_NOTIFY_EMAIL],
      subject: "New ADDSPOT demo request",
      react: NewUser({
        userFirstName: name,
        userCompany: company,
        userEmail: email,
        userPhone: phone,
        userMessage: message,
      }),
    },
  ])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
