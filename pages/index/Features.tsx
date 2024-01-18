import { Calendar, Newspaper, Bot, Share2 } from "lucide-react";
export default function Features() {
    return (
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-2">
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                    <Calendar className="h-12 w-12" />
                    <div className="space-y-2">
                        <h3 className="font-bold">Schedule</h3>
                        <p className="text-sm text-muted-foreground">
                            Schedule your reading, instead of trying to finish
                            it all in one day
                        </p>
                    </div>
                </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                    <Newspaper className="h-12 w-12" />
                    <div className="space-y-2">
                        <h3 className="font-bold">AI-Digest</h3>
                        <p className="text-sm text-muted-foreground">
                            Accelerate your daily reading with AI-Powered
                            digest, helping you save time
                        </p>
                    </div>
                </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                    <Bot className="h-12 w-12" />
                    <div className="space-y-2">
                        <h3 className="font-bold">Automate</h3>
                        <p className="text-sm text-muted-foreground">
                            Automatically generated daily digests, delivered to
                            you at your preferred time
                        </p>
                    </div>
                </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                    <Share2 className="h-12 w-12" />
                    <div className="space-y-2">
                        <h3 className="font-bold">Shrable</h3>
                        <p className="text-sm text-muted-foreground">
                            The generated digests can be shared to others with a link
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
