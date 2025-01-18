// Started with https://docs.deno.com/examples/http_server_files/
import { serveDir, serveFile } from "jsr:@std/http/file-server";
import { Hono } from "jsr:@hono/hono";
import { DB } from "https://deno.land/x/sqlite/mod.ts";



// Initialize database
const db = new DB("todo.db");
db.execute(`
  CREATE TABLE IF NOT EXISTS todo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item TEXT NOT NULL,
    description TEXT,
    complete BOOLEAN DEFAULT 0
  )
`);

const app = new Hono();

// Create a new todo
app.post("/api/todo", async (c) => {
  try {
    const body = await c.req.json();
    const { item, description } = body;

    if (!item) {
      return c.json({ error: "Item is required" }, 400);
    }

    const query = db.prepareQuery(
        "INSERT INTO todo (item, description) VALUES (?, ?) RETURNING id, item, description, complete"
    );
    const result = query.firstEntry([item, description ?? null]);
    query.finalize();

    return c.json(result, 201);
  } catch (error) {
    console.error("Error creating todo:", error);
    return c.json({ error: "Failed to create todo" }, 500);
  }
});

// Get all todos
app.get("/api/todo", (c) => {
  try {
    const todos = db.queryEntries("SELECT * FROM todo ORDER BY id DESC");
    return c.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    return c.json({ error: "Failed to fetch todos" }, 500);
  }
});

// Update a todo
app.patch("/api/todo/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const { item, description, complete } = body;

    const updates = [];
    const values = [];
    if (item !== undefined) {
      updates.push("item = ?");
      values.push(item);
    }
    if (description !== undefined) {
      updates.push("description = ?");
      values.push(description);
    }
    if (complete !== undefined) {
      updates.push("complete = ?");
      values.push(complete);
    }

    if (updates.length === 0) {
      return c.json({ error: "No fields to update" }, 400);
    }

    values.push(id);
    const query = db.prepareQuery(
        `UPDATE todo SET ${updates.join(", ")} WHERE id = ? RETURNING *`
    );
    const result = query.firstEntry(values);
    query.finalize();

    if (!result) {
      return c.json({ error: "Todo not found" }, 404);
    }

    return c.json(result);
  } catch (error) {
    console.error("Error updating todo:", error);
    return c.json({ error: "Failed to update todo" }, 500);
  }
});

// Delete a todo
app.delete("/api/todo/:id", (c) => {
  try {
    const id = c.req.param("id");
    const query = db.prepareQuery(
        "DELETE FROM todo WHERE id = ? RETURNING id"
    );
    const result = query.firstEntry([id]);
    query.finalize();

    if (!result) {
      return c.json({ error: "Todo not found" }, 404);
    }

    return c.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return c.json({ error: "Failed to delete todo" }, 500);
  }
});

// Serve static files
app.get("/*", async (c) => {
  const dist = './angular1/dist/angular1/browser';
  console.log(c.req);
  console.log(`About to serveDir for ${c.req.path.substring(1)}`);
  console.log(`c.req.path: ${c.req.path}`);
  // console.log(`c.url.pathname: ${new URL(c.url).pathname}`);
  console.log(`fsPath:  ${dist}${c.req.path}`);
  const thePath = `${dist}${c.req.path}`;
  fileExists(thePath); // Says file exists, but still getting a 405 error
  return await serveFile(c, {
    fsPath: thePath,
    urlPath: c.req.path,
  });
  /*
  return await serveDir(c, {
    fsRoot: dist,
    urlRoot: "",
  });
   */
});

// Start the server
Deno.serve(app.fetch);


async function fileExists(fn: string) {
  try {
    await Deno.lstat(fn);
    console.log(`${fn} exists!`);
  } catch (err) {
    if (!(err instanceof Deno.errors.NotFound)) {
      throw err;
    }
    console.log("not exists!");
  }
}