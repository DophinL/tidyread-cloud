import { TrackProvider } from "../components/TrackProvider";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
// These styles apply to every route in the application
import "@/lib/globals.css";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className="ph-no-capture h-full"
        >
            <head />
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased dark",
                    fontSans.variable
                )}
            >
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
