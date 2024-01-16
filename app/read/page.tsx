import Effect from "./Effect";
import styles from "./styles.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "read - Tidyread",
    description: "read article redirect page",
};

const Page = ({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) => {
    const { source_link, rss_link } = searchParams;

    return (
        <div className={styles.container}>
            <h1>Redirecting... </h1>
            <p>Please wait a moment</p>
            <Effect
                source_link={source_link as string}
                rss_link={rss_link as string}
            />
        </div>
    );
};

export default Page;
