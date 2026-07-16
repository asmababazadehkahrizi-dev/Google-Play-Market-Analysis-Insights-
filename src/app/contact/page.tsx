import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/contact/contact-form";
import { site, socialLinks } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with Asma Babazadehkahrizi for Data Analyst roles, freelance dashboard projects, or collaboration.",
  path: "/contact",
});

const icons = { linkedin: Linkedin, github: Github, email: Mail };

export default function ContactPage() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Get In Touch"
          title="Contact me"
          description="Have a role, a project, or just a question about a dashboard? I'd love to hear from you."
        />

        <div className="mt-16 grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-paper-soft dark:bg-ink-soft">
                <MapPin className="h-5 w-5 text-accent" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-medium text-ink/40 dark:text-paper/40">
                  Location
                </p>
                <p className="mt-1 text-[15px] font-medium text-ink dark:text-paper">
                  {site.location}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-paper-soft dark:bg-ink-soft">
                <Mail className="h-5 w-5 text-accent" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-medium text-ink/40 dark:text-paper/40">
                  Email
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-1 block text-[15px] font-medium text-ink underline-offset-4 hover:underline dark:text-paper"
                >
                  {site.email}
                </a>
              </div>
            </div>

            <div className="border-t border-line pt-8 dark:border-line-dark">
              <p className="text-sm font-medium text-ink/40 dark:text-paper/40">
                Find me elsewhere
              </p>
              <div className="mt-4 flex items-center gap-3">
                {socialLinks.map((link) => {
                  const Icon = icons[link.icon];
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.icon === "email" ? undefined : "_blank"}
                      rel={link.icon === "email" ? undefined : "noopener noreferrer"}
                      aria-label={link.label}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink hover:text-accent dark:border-line-dark dark:text-paper dark:hover:border-paper"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-line p-8 dark:border-line-dark sm:p-10">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
