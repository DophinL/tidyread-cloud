import { useRouter } from "next/router";

export default function useLocale() {
  const router = useRouter();
  return router.locale || "en-US";
}
