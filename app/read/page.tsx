import styles from "./styles.module.css";
import { track } from "../../components/TrackProvider";

const Page = ({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) => {
    const { source_link, rss_link } = searchParams;

    // if (!source_link) {
    //     alert("Source link is required");
    //     return;
    // }

    // track(
    //     "read",
    //     {
    //         source_link,
    //         rss_link,
    //     },
    //     {
    //         sendInstantly: true,
    //     }
    // );

    setTimeout(() => {
        // 这里执行跳转
        window.location.href = decodeURIComponent(source_link as string);
    }, 1000);

    return (
        <div className={styles.container}>
            <h1>Redirecting...</h1>
            <p>Please wait, you are in the process of being redirected.</p>
        </div>
    );
};

export default Page;
