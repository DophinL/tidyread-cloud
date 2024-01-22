import { TrackProvider } from "@/components/TrackProvider";
import "@/lib/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <TrackProvider
            config={{
                api_key: "phc_a9a12fmYqiXgkcM5rq72c49HBr0Kx5LvE9Zuuv9QOaP",
                api_host: "https://app.posthog.com",
                autocapture: false,
            }}
        >
            <Component {...pageProps} />
        </TrackProvider>
    );
}

export default MyApp;
