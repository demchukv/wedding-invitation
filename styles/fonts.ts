import { Quicksand, Cinzel, Cormorant_SC, Ubuntu } from "next/font/google";
// define your variable fonts
const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_SC({
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
});

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  display: "swap",
  variable: "--font-ubuntu",
  subsets: ["latin", "cyrillic"],
});

// define 2 weights of a non-variable font
// const sourceCodePro400 = Source_Sans_3({ weight: "400" });
// const sourceCodePro700 = Source_Sans_3({ weight: "700" });
// define a custom local font where GreatVibes-Regular.ttf is stored in the styles folder
// const greatVibes = localFont({ src: "./GreatVibes-Regular.ttf" });

export { quicksand, cinzel, cormorant, ubuntu };
