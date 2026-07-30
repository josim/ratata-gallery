import type { Strings } from "@/lib/strings";

// Shared primary nav items — used by both Header (client, for active-link
// state) and Footer (server, for the site map column). A function of the
// active dictionary so the labels follow the language.
export function getNavItems(s: Strings) {
  return [
    { href: "/exhibitions", label: s.nav.exhibitions },
    { href: "/production", label: s.nav.production },
    { href: "/slothzine", label: s.nav.slothzine },
    { href: "/tezcon-europe", label: s.nav.tezconEurope },
    { href: "/about", label: s.nav.about },
  ];
}
