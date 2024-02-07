"use client";
import { useEffect } from "react";
import { track } from "../../components/TrackProvider";

export default function Effect({ link }: { link?: string }) {
  useEffect(() => {
    if (!link) {
      alert("link is required");
      return;
    }

    const decodedLink = decodeURIComponent(link);

    track(
      "open-deeplink",
      {
        link: decodedLink,
      },
      {
        sendInstantly: true,
      },
    );

    setTimeout(() => {
      const context = {
        defaultSearchText: decodedLink,
      };
      // 这里执行跳转
      window.location.href = `raycast://extensions/jaredliu233/tidyread---streamline-your-daily-reading/add-source.command?context=${encodeURIComponent(JSON.stringify(context))}`;
      window.close();
    }, 300);
  }, [link]);
  return null;
}
