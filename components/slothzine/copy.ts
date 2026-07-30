import type { Lang } from "@/lib/strings";

export type ReaderCopy = {
  readerLabel: string;
  backToShelf: string;
  slothN: string; // prefix before the issue number, e.g. "Sloth #"
  shuffle: string;
  shuffleHint: string;
  teia: string;
  prevPage: string;
  nextPage: string;
  pageWord: string;
  errorTitle: string;
  errorBody: string;
  retry: string;
};

export type ShelfCopy = {
  eyebrow: (from: string, to: string) => string;
  title: string;
  lead: string;
  note: string;
  openLatest: string;
  shuffle: string;
  beginAtOne: string;
  wallHeading: string;
  countLabel: (n: number) => string;
  hoverRead: string;
};

export const readerCopy: Record<Lang, ReaderCopy> = {
  en: {
    readerLabel: "Slothzine reader",
    backToShelf: "The shelf",
    slothN: "Sloth #",
    shuffle: "Shuffle",
    shuffleHint: "Jump to a random page of a random issue (S)",
    teia: "Teia",
    prevPage: "Previous page",
    nextPage: "Next page",
    pageWord: "page",
    errorTitle: "This issue is still travelling.",
    errorBody:
      "The zine is served from IPFS and the gateway didn't answer in time. Try again in a moment, or open it on Teia.",
    retry: "Try again",
  },
  de: {
    readerLabel: "Slothzine-Leser",
    backToShelf: "Das Regal",
    slothN: "Sloth #",
    shuffle: "Mischen",
    shuffleHint: "Zu einer zufälligen Seite einer zufälligen Ausgabe (S)",
    teia: "Teia",
    prevPage: "Vorherige Seite",
    nextPage: "Nächste Seite",
    pageWord: "Seite",
    errorTitle: "Diese Ausgabe ist noch unterwegs.",
    errorBody:
      "Das Zine kommt über IPFS, und das Gateway hat nicht rechtzeitig geantwortet. Versuche es gleich noch einmal oder öffne es auf Teia.",
    retry: "Erneut versuchen",
  },
};

export const shelfCopy: Record<Lang, ShelfCopy> = {
  en: {
    eyebrow: (from, to) => `Slothzine · 50 issues · ${from} — ${to}`,
    title: "The Reading Room",
    lead: "A monthly clean comic zine, drawn by a rotating crew of artists and minted on Tezos since 2022. Every issue is here in full — read one cover to cover, drift back through the archive, or shuffle the stack and let a random page find you.",
    note: "Pages stream from IPFS as you turn them; nothing to download, nowhere to leave.",
    openLatest: "Open the latest issue",
    shuffle: "Shuffle the stack",
    beginAtOne: "Begin at #1",
    wallHeading: "Every issue",
    countLabel: (n) => `${n} issues`,
    hoverRead: "Read",
  },
  de: {
    eyebrow: (from, to) => `Slothzine · 50 Ausgaben · ${from} — ${to}`,
    title: "Der Lesesaal",
    lead: "Ein monatliches Clean-Comic-Zine, gezeichnet von einer wechselnden Crew und seit 2022 auf Tezos geprägt. Jede Ausgabe ist vollständig hier — lies eine von vorn bis hinten, treibe rückwärts durchs Archiv oder misch den Stapel und lass dich von einer zufälligen Seite finden.",
    note: "Die Seiten kommen beim Blättern über IPFS; nichts herunterzuladen, nirgends hinzugehen.",
    openLatest: "Neueste Ausgabe öffnen",
    shuffle: "Stapel mischen",
    beginAtOne: "Bei #1 beginnen",
    wallHeading: "Alle Ausgaben",
    countLabel: (n) => `${n} Ausgaben`,
    hoverRead: "Lesen",
  },
};
