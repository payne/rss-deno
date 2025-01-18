import { serve } from "https://deno.land/std@0.195.0/http/server.ts";
import { Hono } from "https://deno.land/x/hono/mod.ts";
import { serveFile } from "https://deno.land/x/hono/middleware/file.ts"; 

const app = new Hono();

app.get("*", serveFile("./dist")); 

serve(app.fetch.bind(app), { port: 8000 });
