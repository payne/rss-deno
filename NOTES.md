important to run:
1. `sed -i -e 's/"deno"/"no-deno"/' node_modules/@libsql/client/package.json`


# Exploring Deno

1. https://docs.deno.com/examples/sqlite/ has a great example using sqlite without drizzle.
This creates a standalone executable:
```
deno compile --output mkdatabase.exe --allow-read --allow-write --allow-env --allow-net --allow-ffi https://docs.deno.com/examples/scripts/sqlite.ts
```

1. Looks like hono may be a good choice for writing a web api https://docs.deno.com/examples/hono/
`deno run --allow-net https://docs.deno.com/examples/scripts/hono.ts`

## SQL with Drizzle
I need to try harder and follow https://docs.deno.com/examples/drizzle_tutorial/

