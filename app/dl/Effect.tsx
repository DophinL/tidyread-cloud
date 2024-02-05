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

    // 这里执行跳转
    window.location.href = decodedLink;
    window.close();
  }, [link]);
  return null;
}
