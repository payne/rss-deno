import { Hono } from 'hono';
import { serveStatic } from 'hono/serve-static.module';

const app = new Hono();

// Serve static files from the 'dist' directory
app.use(
  '/public/*', 
  serveStatic({ root: './dist/my-angular-app' }) 
);

// Handle any other route as an Angular route
app.get('*', (c) => {
  return c.file('./dist/my-angular-app/index.html');
});

app.listen({ port: 8000 });

console.log('Server listening on http://localhost:8000');
