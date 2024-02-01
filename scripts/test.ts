import fetch from "node-fetch";
import { createAgent } from "./util";

fetch("https://wsj.com", {
  agent: createAgent(),
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    Referer: "https://wsj.com",
    Accept: "text/html",
  },
})
  .then((res) => {
    console.log("test", res.ok);
    return res.text();
  })
  .then((res) => console.log("ret", res));
