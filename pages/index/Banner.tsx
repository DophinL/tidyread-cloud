export default function Banner() {
    return (
        <section className="space-y-6 pb-6 pt-4 md:pb-8 md:pt-6 lg:py-16">
            <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
                <a
                    className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
                    target="_blank"
                    href="https://twitter.com/jaredliu_bravo"
                >
                    Follow along on X(Twitter)
                </a>
                <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl gradient-text">
                    Lightweight reading flow powered by Raycast and AI
                </h1>
                <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                A Raycast Extension, which can schedule your daily reading and get tidy, AI-powered digests for an efficient reading experience.
                </p>
                <div className="space-x-4">
                    <a
                        className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 rounded-md"
                        href="/docs/getting-started"
                    >
                        Get Started
                    </a>
                    <a
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-11 px-8 rounded-md"
                        href="https://github.com/DophinL/raycast-extensions/tree/ext/tidyread---streamline-your-daily-reading/extensions/tidyread---streamline-your-daily-reading"
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </section>
    );
}
