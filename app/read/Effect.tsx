"use client";
import { useEffect } from "react";
import { track } from "../../components/TrackProvider";

export default function Effect({
  source_link,
  rss_link,
  status,
}: {
  source_link?: string;
  rss_link?: string;
  status?: string;
}) {
  useEffect(() => {
    if (!source_link) {
      alert("Source link is required");
      return;
    }

    track(
      "read",
      {
        source_link,
        rss_link,
        status,
      },
      {
        sendInstantly: true,
      },
    );

    setTimeout(() => {
      // 这里执行跳转
      window.location.href = decodeURIComponent(source_link);
    }, 300);
  }, [source_link, rss_link]);
  return null;
}
