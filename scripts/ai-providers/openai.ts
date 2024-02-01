import OpenAI from "openai";
import { HttpsProxyAgent } from "https-proxy-agent";
import { Provider, ProviderOptions } from "../types";

class OpenaiProvider extends Provider {
  protected client: OpenAI | null;

  constructor(options: ProviderOptions) {
    super(options);

    if (!options.apiKey) {
      this.available = false;
      this.client = null;
    } else {
      this.client = new OpenAI({
        baseURL: options.apiHost ? `${options.apiHost.replace(/\/$/, "")}/v1` : undefined,
        httpAgent: options.httpProxy ? new HttpsProxyAgent(options.httpProxy) : undefined,
        apiKey: options.apiKey,
      });
    }
  }

  async ask(prompt: string, content: string): Promise<string> {
    const { apiModel, maxTokens } = this.options;

    if (!this.available) return content;

    try {
      const resp = await this.client!.chat.completions.create({
        model: apiModel ?? "gpt-3.5-turbo",
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: content },
        ],
        max_tokens: maxTokens,
      });

      return resp.choices?.[0]?.message?.content ?? "";
    } catch (error) {
      console.error("Error ask:", error);
      throw error;
    }
  }
}

export { OpenaiProvider };
