import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidPayload(body: unknown): body is ContactPayload {
  if (!body || typeof body !== "object") return false;
  const { name, email, subject, message } = body as Record<string, unknown>;
  return (
    typeof name === "string" &&
    name.trim().length >= 2 &&
    typeof email === "string" &&
    EMAIL_REGEX.test(email) &&
    typeof subject === "string" &&
    subject.trim().length >= 2 &&
    typeof message === "string" &&
    message.trim().length >= 10
  );
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { error: "Please fill in every field with a valid value." },
      { status: 422 }
    );
  }

  const { name, email, subject, message } = body;
  const to = process.env.CONTACT_TO_EMAIL || "asma.babazadehkahrizi@gmail.com";
  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio Contact Form <onboarding@resend.dev>",
          to,
          reply_to: email,
          subject: `[Portfolio] ${subject}`,
          text: `From: ${name} <${email}>\n\n${message}`,
        }),
      });

      if (!response.ok) {
        console.error("Resend API error", await response.text());
        return NextResponse.json(
          { error: "Message could not be sent right now. Please try again later." },
          { status: 502 }
        );
      }
    } catch (error) {
      console.error("Failed to send contact email", error);
      return NextResponse.json(
        { error: "Message could not be sent right now. Please try again later." },
        { status: 502 }
      );
    }
  } else {
    console.info("Contact form submission (no RESEND_API_KEY set):", {
      name,
      email,
      subject,
      message,
    });
  }

  return NextResponse.json({ success: true });
}
