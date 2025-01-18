// Started with https://docs.deno.com/examples/http_server_files/
import { serveDir, serveFile } from "jsr:@std/http/file-server";
Deno.serve((req: Request) => {
  const pathname = new URL(req.url).pathname;
  console.log(pathname);
  const dist = './angular1/dist/angular1/browser';


    return serveDir(req, {
      fsRoot: dist,
      urlRoot: "",
    });

  return new Response("404: Not Found", {
    status: 404,
  });
});


