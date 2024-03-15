import { TrackProvider } from "@/components/TrackProvider";
import "@/lib/globals.css";

import { Roboto_Slab } from "next/font/google";

const slab = Roboto_Slab({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-slab-serief",
});

function MyApp({ Component, pageProps }) {
  return (
    <TrackProvider
      config={{
        api_key: "phc_a9a12fmYqiXgkcM5rq72c49HBr0Kx5LvE9Zuuv9QOaP",
        api_host: "https://app.posthog.com",
        autocapture: false,
      }}
    >
      <main className={`${slab.variable}`}>
        <Component {...pageProps} />
      </main>
    </TrackProvider>
  );
}

export default MyApp;
