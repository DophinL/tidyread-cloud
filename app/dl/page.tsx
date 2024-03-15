import styles from "./styles.module.css";
import { Metadata } from "next";
import { useEffect } from "react";
import Effect from "./Effect";
import BlueButton from "@/components/BlueButton";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "deeplink | Tidyread",
  description: "deeplink redirect page",
};

const Page = ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
  const { kw } = searchParams;

  return (
    <div className={styles.container}>
      <a href="/">
        <Logo />
      </a>
      <h1>Opening deeplink...</h1>
      <p>Please wait a moment</p>
      <br />
      <p className="text-gray-500">If you have not install Tidyread yet, you can do it first.</p>
      <br />
      <BlueButton href="https://www.raycast.com/jaredliu233/tidyread---streamline-your-daily-reading">
        Install Tidyread
      </BlueButton>
      <Effect kw={kw} />
    </div>
  );
};

export default Page;
