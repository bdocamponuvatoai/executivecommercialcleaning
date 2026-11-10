import localFont from "next/font/local";

/** Mona Sans (SIL OFL 1.1), variable weight 200–900 and width 75–125%. Latin subset. */
export const monaSans = localFont({
  src: "../assets/fonts/mona-sans-latin-wdth-normal.woff2",
  variable: "--font-mona",
  weight: "200 900",
  style: "normal",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "75% 125%" }],
  adjustFontFallback: "Arial",
});
