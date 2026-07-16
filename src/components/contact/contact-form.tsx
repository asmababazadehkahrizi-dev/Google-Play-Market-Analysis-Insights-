"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Status = "idle" | "submitting" | "success" | "error";

const initialState: FormState = { name: "", email: "", subject: "", message: "" };

function validate(values: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = "Please enter a valid email address.";
  if (values.subject.trim().length < 2) errors.subject = "Please add a subject.";
  if (values.message.trim().length < 10)
    errors.message = "Please add a few more details (10+ characters).";
  return errors;
}

const inputStyles =
  "w-full rounded-xl border border-line bg-paper px-4 py-3 text-[15px] text-ink placeholder:text-ink/35 transition-colors duration-200 focus:border-ink focus-visible:outline-none dark:border-line-dark dark:bg-ink dark:text-paper dark:placeholder:text-paper/35 dark:focus:border-paper";

export function ContactForm() {
  const [values, setValues] = React.useState<FormState>(initialState);
  const [errors, setErrors] = React.useState<Partial<Record<keyof FormState, string>>>(
    {}
  );
  const [status, setStatus] = React.useState<Status>("idle");
  const [serverError, setServerError] = React.useState<string | null>(null);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    setServerError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setServerError(data?.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setValues(initialState);
    } catch {
      setServerError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        role="status"
        className="flex flex-col items-start gap-3 rounded-2xl border border-line bg-paper-soft p-8 dark:border-line-dark dark:bg-ink-soft"
      >
        <CheckCircle2 className="h-8 w-8 text-accent" aria-hidden="true" />
        <h3 className="text-lg font-semibold text-ink dark:text-paper">
          Message sent
        </h3>
        <p className="text-[15px] text-ink/65 dark:text-paper/65">
          Thanks for reaching out — I&apos;ll get back to you within a couple of
          business days.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm font-medium text-ink underline underline-offset-4 dark:text-paper"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-ink dark:text-paper"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={cn(inputStyles, errors.name && "border-red-500")}
            placeholder="Jane Doe"
          />
          {errors.name ? (
            <p id="name-error" className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-ink dark:text-paper"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(inputStyles, errors.email && "border-red-500")}
            placeholder="jane@company.com"
          />
          {errors.email ? (
            <p id="email-error" className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label
          htmlFor="subject"
          className="mb-2 block text-sm font-medium text-ink dark:text-paper"
        >
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={values.subject}
          onChange={handleChange}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          className={cn(inputStyles, errors.subject && "border-red-500")}
          placeholder="Data Analyst opportunity"
        />
        {errors.subject ? (
          <p id="subject-error" className="mt-2 text-sm text-red-600 dark:text-red-400">
            {errors.subject}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-ink dark:text-paper"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={values.message}
          onChange={handleChange}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(inputStyles, "resize-none", errors.message && "border-red-500")}
          placeholder="Tell me a little about the role or project..."
        />
        {errors.message ? (
          <p id="message-error" className="mt-2 text-sm text-red-600 dark:text-red-400">
            {errors.message}
          </p>
        ) : null}
      </div>

      {status === "error" && serverError ? (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-400"
        >
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {serverError}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-8 text-[15px] font-medium text-paper transition-opacity duration-300 hover:opacity-85 disabled:opacity-60 dark:bg-paper dark:text-ink sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}
