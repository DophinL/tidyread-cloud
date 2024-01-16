import { TrackProvider } from "../components/TrackProvider";

// These styles apply to every route in the application
import './globals.css'
 

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning className="ph-no-capture h-full">
            <head />
            <body className="h-full">
                <TrackProvider
                    config={{
                        api_key:
                            "phc_a9a12fmYqiXgkcM5rq72c49HBr0Kx5LvE9Zuuv9QOaP",
                        api_host: "https://app.posthog.com",
                        autocapture: false,
                    }}
                >
                    {children}
                </TrackProvider>
            </body>
        </html>
    );
}
