import { strings } from "@/lib/strings";

// Shared primary nav items — used by both Header (client, for active-link
// state) and Footer (server, for the site map column). Kept out of Header's
// "use client" module so plain data can still be imported from Server
// Components.
export const NAV_ITEMS = [
  { href: "/exhibitions", label: strings.nav.exhibitions },
  { href: "/production", label: strings.nav.production },
  { href: "/tezcon-europe", label: strings.nav.tezconEurope },
  { href: "/about", label: strings.nav.about },
];
