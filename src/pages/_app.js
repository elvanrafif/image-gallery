import { CustomSeo } from "@/seo";
import "@/styles/globals.css";
import { Space_Grotesk } from "@next/font/google";

export const SpaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <div className={SpaceGrotesk.className}>
      <CustomSeo />
      <Component {...pageProps} />
    </div>
  );
}
