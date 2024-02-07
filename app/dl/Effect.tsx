"use client";
import { useEffect } from "react";
import { track } from "../../components/TrackProvider";

export default function Effect({ kw }: { kw?: string }) {
  useEffect(() => {
    if (!kw) {
      alert("url query `kw`(keyword) is required");
      return;
    }

    const decodedKeyword = decodeURIComponent(kw);

    track(
      "open-deeplink",
      {
        keyword: decodedKeyword,
      },
      {
        sendInstantly: true,
      },
    );

    setTimeout(() => {
      const context = {
        defaultSearchText: decodedKeyword,
      };
      // 这里执行跳转
      window.location.href = `raycast://extensions/jaredliu233/tidyread---streamline-your-daily-reading/add-source.command?context=${encodeURIComponent(JSON.stringify(context))}`;
      window.close();
    }, 300);
  }, [kw]);
  return null;
}
