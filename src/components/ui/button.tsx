import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 ease-apple focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-ink text-paper hover:opacity-85 active:scale-[0.98] dark:bg-paper dark:text-ink",
  secondary:
    "border border-line text-ink hover:border-ink dark:border-line-dark dark:text-paper dark:hover:border-paper",
  ghost:
    "text-ink hover:text-accent dark:text-paper dark:hover:text-accent",
};

const sizeStyles: Record<ButtonSize, string> = {
  md: "h-11 px-6 text-[15px]",
  lg: "h-[52px] px-8 text-base",
};

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
    external?: boolean;
    /** Force a same-origin file to save to disk instead of navigating/opening a tab.
     * Pass a string to set the saved filename, or `true` to use the source filename. */
    download?: string | boolean;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  // Strip every internal/base prop here, once, so none of them can leak
  // through the later `{...rest}` spreads onto the native <a>/<button>.
  const { variant = "primary", size = "md", className, children, ...domProps } = props;
  const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

  if ("href" in domProps && domProps.href) {
    const { href, external, download, ...rest } = domProps as Omit<
      ButtonAsLink,
      keyof ButtonBaseProps
    >;

    if (download) {
      return (
        <a
          href={href}
          className={classes}
          download={download === true ? "" : download}
          {...rest}
        >
          {children}
        </a>
      );
    }
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const rest = domProps as Omit<ButtonAsButton, keyof ButtonBaseProps>;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
