import { useMemo } from "react";
import type { IconType } from "react-icons";
import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaXTwitter,
  FaEnvelope,
} from "react-icons/fa6";

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: IconType;
  /** Opens in the same tab for mailto: links, new tab otherwise. */
  external: boolean;
}

/* ---------- Edit your details here ----------
   Leave a value empty ("") and that link is skipped automatically. */
const profile = {
  github: "crispuz", // github.com/<username>
  linkedin: "", // linkedin.com/in/<username>
  twitter: "", // x.com/<username>
  whatsapp: "", // number with country code, digits only e.g. "255712345678"
  email: "", // you@example.com
};

const builders: Array<
  Omit<SocialLink, "href" | "external"> & {
    value: string;
    toHref: (v: string) => string;
    external?: boolean;
  }
> = [
  {
    id: "github",
    label: "GitHub",
    icon: FaGithub,
    value: profile.github,
    toHref: (v) => `https://github.com/${v}`,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: FaLinkedin,
    value: profile.linkedin,
    toHref: (v) => `https://www.linkedin.com/in/${v}`,
  },
  {
    id: "twitter",
    label: "X (Twitter)",
    icon: FaXTwitter,
    value: profile.twitter,
    toHref: (v) => `https://x.com/${v}`,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: FaWhatsapp,
    value: profile.whatsapp,
    toHref: (v) => `https://wa.me/${v.replace(/\D/g, "")}`,
  },
  {
    id: "email",
    label: "Email",
    icon: FaEnvelope,
    value: profile.email,
    toHref: (v) => `mailto:${v}`,
    external: false,
  },
];

/**
 * Returns the list of social links that have a value set.
 * Pass `only` to pick specific ones, e.g. useSocialLinks(["github", "email"]).
 */
export function useSocialLinks(only?: string[]): SocialLink[] {
  const onlyKey = only === undefined ? undefined : JSON.stringify(only);

  return useMemo(
    () =>
      builders
        .filter((b) => b.value.trim() !== "")
        .filter(
          (b) => onlyKey === undefined || JSON.parse(onlyKey).includes(b.id),
        )
        .map(({ value, toHref, external = true, ...rest }) => ({
          ...rest,
          href: toHref(value.trim()),
          external,
        })),
    [onlyKey],
  );
}
