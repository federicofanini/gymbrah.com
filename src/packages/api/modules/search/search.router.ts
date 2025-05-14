import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { searchBusinessesAI } from "@/packages/ai/vector-search";

const searchSchema = z.object({
  query: z.string().min(1, "Search query cannot be empty"),
});

export const searchRouter = new Hono().get(
  "/ai",
  zValidator("query", searchSchema),
  async (c) => {
    try {
      const { query } = c.req.valid("query");
      const results = await searchBusinessesAI(query);
      return c.json({ success: true, results });
    } catch (error) {
      console.error("AI search error:", error);
      return c.json(
        { success: false, error: "Failed to perform AI search" },
        500
      );
    }
  }
);
