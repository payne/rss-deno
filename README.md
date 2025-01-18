
1. `deno install`
2. `deno task db:generate`
3. `sed -i -e 's/"deno"/"no-deno"/' node_modules/@libsql/client/package.json`
4. `deno task db:migrate`
5. `deno run -ERWS --allow-ffi --env-file src/main.ts`
6. `sqlite3 local.db` # use this query: `select * from feeds;` session should look like this:
```
SQLite version 3.43.2 2023-10-10 13:08:14
Enter ".help" for usage hints.
sqlite> select * from feeds;
1|My Feed|https://example.com/feed
sqlite> .exit
```


