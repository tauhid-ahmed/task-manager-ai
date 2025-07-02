import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    GEMINI_API_KEY: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});
