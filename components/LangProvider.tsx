"use client";

import { createContext, useContext } from "react";
import { DEFAULT_LANG, STRINGS, type Lang, type Strings } from "@/lib/strings";

// Client-side counterpart to lib/lang.ts: the layout resolves the language
// from the cookie on the server and provides it here so client components
// can pick the matching dictionary without touching next/headers.
const LangContext = createContext<Lang>(DEFAULT_LANG);

export function LangProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useLang(): Lang {
  return useContext(LangContext);
}

export function useStrings(): Strings {
  return STRINGS[useLang()];
}
