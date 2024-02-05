import styles from "./styles.module.css";
import { Metadata } from "next";
import { useEffect } from "react";
import Image from "next/image";
import Effect from "./Effect";
import BlueButton from "@/components/BlueButton";

export const metadata: Metadata = {
  title: "read | Tidyread",
  description: "read article redirect page",
};

const Page = ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
  const { link } = searchParams;

  return (
    <div className={styles.container}>
      <a href="/">
        <Image className="absolute left-6 top-3" src="/images/logo_with_text.svg" alt="" width={148} height={36} />
      </a>
      <h1>Opening deeplink...</h1>
      <p>Please wait a moment</p>
      <br />
      <p className="text-gray-500">If you have not install Tidyread yet, you can do it first.</p>
      <br />
      <BlueButton href="https://www.raycast.com/jaredliu233/tidyread---streamline-your-daily-reading">
        Install Tidyread
      </BlueButton>
      <Effect link={link} />
    </div>
  );
};

export default Page;
