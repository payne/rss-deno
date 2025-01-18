import { serve } from "https://deno.land/std@0.195.0/http/server.ts";
import { Hono } from "https://deno.land/x/hono/mod.ts";

const app = new Hono();
const dist = './angular1/dist/angular1/browser';

app.get("*", async (c) => {
  return c.send({
    root: dist,
    index: "index.html",
  });
});

serve(app.fetch.bind(app), { port: 8000 });
