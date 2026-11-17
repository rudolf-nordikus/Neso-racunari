import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { site } from "@/lib/site";
import { NZ_PATH } from "@/lib/nz";

export const ICON = 1.75;

/** Kontejner poravnat sa menijem: na 1440 px sadržaj počinje na 120 px. */
export const WRAP = "mx-auto w-full max-w-[1280px] px-5 md:px-10";

type Variant = "primary" | "dark" | "secondary" | "ghost" | "glass";

const variants: Record<Variant, string> = {
  primary: "bg-amber-500 text-navy-900 hover:bg-[#ffd23d]",
  dark: "bg-navy-900 text-white hover:bg-navy-800",
  secondary: "border border-white/50 text-white hover:bg-white/10",
  glass: "bg-white/10 text-white hover:bg-white/15",
  ghost: "text-white hover:text-amber-500 px-0!",
};

export function Button({
  href,
  variant = "primary",
  icon,
  children,
  className = "",
  ...rest
}: {
  href: string;
  variant?: Variant;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<"a">, "href">) {
  const cls = `inline-flex h-12 items-center justify-center gap-2.5 rounded-full px-6 text-[16px] font-medium whitespace-nowrap transition-colors duration-150 active:scale-[0.98] ${variants[variant]} ${className}`;
  const inner = (
    <>
      {icon}
      {children}
      {variant === "ghost" && <ArrowRight size={18} strokeWidth={ICON} aria-hidden />}
    </>
  );
  if (href.startsWith("/") && !href.startsWith("//")) {
    return (
      <Link href={href} className={cls} {...rest}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} {...rest}>
      {inner}
    </a>
  );
}

export function ViberIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  // Simple Icons (CC0)
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M11.4 0C9.473.028 5.333.344 3.02 2.467 1.302 4.187.696 6.7.633 9.817.57 12.933.488 18.776 6.12 20.36h.003l-.004 2.416s-.037.977.61 1.177c.777.242 1.234-.5 1.98-1.302.407-.44.972-1.084 1.397-1.58 3.85.326 6.812-.416 7.15-.525.776-.252 5.176-.816 5.892-6.657.74-6.02-.36-9.83-2.34-11.546-.596-.55-3.006-2.3-8.375-2.323 0 0-.395-.025-1.037-.017zm.058 1.693c.545-.004.88.017.88.017 4.542.02 6.717 1.388 7.222 1.846 1.675 1.435 2.53 4.868 1.906 9.897v.002c-.604 4.878-4.174 5.184-4.832 5.395-.28.09-2.882.737-6.153.524 0 0-2.436 2.94-3.197 3.704-.12.12-.26.167-.352.144-.13-.033-.166-.188-.165-.414l.02-4.018c-4.762-1.32-4.485-6.292-4.43-8.895.054-2.604.543-4.738 1.996-6.173 1.96-1.773 5.474-2.018 7.11-2.03zm.38 2.602c-.167 0-.303.135-.304.302 0 .167.133.303.3.305 1.624.01 2.946.537 4.028 1.592 1.073 1.046 1.62 2.468 1.633 4.334.002.167.14.3.307.3.166-.002.3-.138.3-.304-.014-1.984-.618-3.596-1.816-4.764-1.19-1.16-2.692-1.753-4.447-1.765zm-3.96.695c-.19-.032-.4.005-.616.117l-.01.002c-.43.247-.816.562-1.146.932-.002.004-.006.004-.008.008-.267.323-.42.638-.46.948-.008.046-.01.093-.007.14 0 .136.022.27.065.4l.013.01c.135.48.473 1.276 1.205 2.604.42.768.903 1.5 1.446 2.186.27.344.56.673.87.984l.132.132c.31.308.64.6.984.87.686.543 1.418 1.027 2.186 1.447 1.328.733 2.126 1.07 2.604 1.206l.01.014c.13.042.265.064.402.063.046.002.092 0 .138-.008.31-.036.627-.19.948-.46.004 0 .003-.002.008-.005.37-.33.683-.72.93-1.148l.003-.01c.225-.432.15-.842-.18-1.12-.004 0-.698-.58-1.037-.83-.36-.255-.73-.492-1.113-.71-.51-.285-1.032-.106-1.248.174l-.447.564c-.23.283-.657.246-.657.246-3.12-.796-3.955-3.955-3.955-3.955s-.037-.426.248-.656l.563-.448c.277-.215.456-.737.17-1.248-.217-.383-.454-.756-.71-1.115-.25-.34-.826-1.033-.83-1.035-.137-.165-.31-.265-.502-.297zm4.49.88c-.158.002-.29.124-.3.282-.01.167.115.312.282.324 1.16.085 2.017.466 2.645 1.15.63.688.93 1.524.906 2.57-.002.168.13.306.3.31.166.003.305-.13.31-.297.025-1.175-.334-2.193-1.067-2.994-.74-.81-1.777-1.253-3.05-1.346h-.024zm.463 1.63c-.16.002-.29.127-.3.287-.008.167.12.31.288.32.523.028.875.175 1.113.422.24.245.388.62.416 1.164.01.167.15.295.318.287.167-.008.295-.15.287-.317-.03-.644-.215-1.178-.58-1.557-.367-.378-.893-.574-1.52-.607h-.018z" />
    </svg>
  );
}

export function CallButton({ variant = "primary", label, className }: { variant?: Variant; label?: string; className?: string }) {
  return (
    <Button
      href={site.phoneHref}
      variant={variant}
      className={className}
      icon={<Phone size={19} strokeWidth={ICON} aria-hidden />}
      data-cta="poziv"
    >
      {label ?? `Pozovi ${site.phoneDisplay}`}
    </Button>
  );
}

export function ViberButton({
  variant = "dark",
  label = "Viber poruka",
  poruka,
  className,
}: {
  variant?: Variant;
  label?: string;
  poruka?: string;
  className?: string;
}) {
  // Gotova poruka štedi korisniku razmišljanje šta da napiše (UX princip 3 iz audita).
  const href = poruka ? `${site.viberHref}&text=${encodeURIComponent(poruka)}` : site.viberHref;
  return (
    <Button href={href} variant={variant} className={className} icon={<ViberIcon size={19} />} data-cta="viber">
      {label}
    </Button>
  );
}

export function Panel({
  children,
  className = "",
  id,
  as: Tag = "section",
  "aria-label": ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div" | "article";
  "aria-label"?: string;
}) {
  return (
    <Tag id={id} aria-label={ariaLabel} data-reveal className={`relative overflow-hidden rounded-[24px] bg-navy-900 md:rounded-[32px] ${className}`}>
      {children}
    </Tag>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`inline-flex items-center gap-2 text-[15px] font-medium text-amber-500 ${className}`}>
      <span aria-hidden className="size-2 rounded-full bg-amber-500" />
      {children}
    </p>
  );
}

/** Naslov sa akcent riječju: <Heading accent="desilo?">Šta se desilo?</Heading> */
export function Accent({ text, accent }: { text: string; accent?: string }) {
  if (!accent || !text.includes(accent)) return <>{text}</>;
  const i = text.indexOf(accent);
  return (
    <>
      {text.slice(0, i)}
      <em>{accent}</em>
      {text.slice(i + accent.length)}
    </>
  );
}


/** NZ znak kao pozadinska grafika (pravilo iz DS: cijeli znak, uz rub, niska providnost). */
export function NzWatermark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 219 203" aria-hidden className={`pointer-events-none absolute ${className}`}>
      <path d={NZ_PATH} fill="currentColor" />
    </svg>
  );
}
