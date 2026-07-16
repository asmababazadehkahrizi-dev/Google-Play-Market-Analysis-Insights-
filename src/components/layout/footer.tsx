import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { site, socialLinks, navLinks } from "@/data/site";
import { Container } from "@/components/ui/container";

const icons = {
  linkedin: Linkedin,
  github: Github,
  email: Mail,
};

export function Footer() {
  return (
    <footer className="border-t border-line dark:border-line-dark">
      <Container className="py-16">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div className="max-w-sm">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-ink dark:text-paper"
            >
              {site.name}
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-ink/60 dark:text-paper/60">
              {site.tagline}. Based in {site.location}.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((link) => {
                const Icon = icons[link.icon];
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.icon === "email" ? undefined : "_blank"}
                    rel={link.icon === "email" ? undefined : "noopener noreferrer"}
                    aria-label={link.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink hover:text-accent dark:border-line-dark dark:text-paper dark:hover:border-paper"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-ink dark:text-paper">Site</p>
              <ul className="mt-4 space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink/60 transition-colors hover:text-ink dark:text-paper/60 dark:hover:text-paper"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink dark:text-paper">Connect</p>
              <ul className="mt-4 space-y-3">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.icon === "email" ? undefined : "_blank"}
                      rel={link.icon === "email" ? undefined : "noopener noreferrer"}
                      className="text-sm text-ink/60 transition-colors hover:text-ink dark:text-paper/60 dark:hover:text-paper"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 text-xs text-ink/40 dark:border-line-dark dark:text-paper/40 sm:flex-row sm:items-center">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Designed &amp; built in London.</p>
        </div>
      </Container>
    </footer>
  );
}
