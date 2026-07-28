import { cookies } from "next/headers";
import {
  DEFAULT_LANG,
  LANG_COOKIE,
  STRINGS,
  type Lang,
  type Strings,
} from "@/lib/strings";

// Server-side language resolution. Reading the cookie makes every page that
// calls this render dynamically - the accepted tradeoff of the cookie-based
// switch (URLs stay identical across languages).
export function getLang(): Lang {
  const value = cookies().get(LANG_COOKIE)?.value;
  return value === "en" || value === "de" ? value : DEFAULT_LANG;
}

export function getStrings(): Strings {
  return STRINGS[getLang()];
}
