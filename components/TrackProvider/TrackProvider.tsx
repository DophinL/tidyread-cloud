import { useEffect } from "react";
import posthog from "posthog-js";

import { setGlobalDisabled, GLOBAL_DISABLED } from "./global";
import Router from "next/router";
let initialized = false;

/**
 * 全局唯一
 * @returns
 */
export default function TrackProvider({
  children,
  config,
  disabled = false,
}: {
  children: React.ReactNode;
  config: any;
  disabled?: boolean;
}) {
  if (typeof window !== "undefined") {
    setGlobalDisabled(disabled!);
  } else {
    // 服务端渲染时，默认disabled
    setGlobalDisabled(true);
  }

  // 初始化posthog
  if (typeof window !== "undefined" && !initialized && !GLOBAL_DISABLED) {
    const { api_key, ...otherConfig } = config;

    posthog.init(api_key, {
      ...otherConfig,
    });
    initialized = true;
  }

  useEffect(() => {
    // Track page views
    const handleRouteChange = () => {
      posthog.capture("$pageview");
    };

    Router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  // TODO: 当route变化时，重新reloadFeature。这个目前意义不大

  return <>{children}</>;
}
