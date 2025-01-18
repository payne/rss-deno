# Deno, Drizzle, and Turso Starter

This project covers basic use of a local database file with libSQL and of a hosted Turso database via HTTP.
It is based on the following Drizzle and Turso tutorials, but adapted for Deno:

- [Get Started with Drizzle and SQLite](https://orm.drizzle.team/docs/get-started/sqlite-new)

## libSQL client issue

One complication is that Drizzle Kit creates the libSQL client for you, using the @libsql/client package's default [. export](https://github.com/tursodatabase/libsql-client-ts/blob/e9db106651333b5111a640c1ea0d141a281d0aba/packages/libsql-client/package.json#L28), which on Deno is the web client, not the fully-featured Node client.
The web client [does not support](https://docs.turso.tech/sdk/ts/reference#local-development) local file URLs or embedded replicas for Turso databases.

A similar shortcoming was recently fixed in [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.35.3).
Hopefully, a solution will come to Drizzle Kit, as well (see [this question](https://github.com/drizzle-team/drizzle-orm/discussions/3122) and [this Discord post](https://discord.com/channels/1043890932593987624/1070810929475883038/1300278316414009415)).
In the mean time, there is a hacky workaround: You can patch @libsql/client to export the Node client on Deno by default:

```sh
sed -i -e 's/"deno"/"no-deno"/' node_modules/@libsql/client/package.json
```

Of course, note that this only changes the cached version of the package.
It will need to be repeated after reinstalling or updating the package.

To revert to the web client:

```sh
sed -i -e 's/"no-deno"/"deno"/' node_modules/@libsql/client/package.json
```

## Quick start: Local database file

1. Install the required packages:

   ```sh
   deno install
   ```

2. Setup connection variables:

   ```sh
   cp .env.template .env
   ```

3. [Apply the above workaround](#libsql-client-issue) to use Drizzle Kit with a local database file.

4. Apply the SQL migration to the database:

   ```sh
   deno task db:migrate
   ```

5. Run the [main.ts](src/main.ts) script to seed and query the database.

   ```sh
   deno run -ERWS --allow-ffi --env-file src/main.ts
   ```


