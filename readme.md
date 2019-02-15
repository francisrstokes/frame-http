# Frame

Frame is <100 line, zero dependency, middleware only express/koa-like framework built on top of the `http/https` module.

## Example

```javascript
const http = require('http');
const Frame = require('frame-http');

const app = new Frame();
const server = http.createServer(app.handler);

// Time/Log Requests
app.use(async (ctx, next) => {
  const startTime = Date.now();
  await next();
  const endTime = Date.now();
  console.log(`[${ctx.method}] Took ${endTime - startTime}ms`);
});

// Add some headers
app.use((ctx, next) => {
  ctx.setHeader('X-Powered-By', 'Frame');
  next();
});

// Catchall endpoint, responding with JSON
app.use(ctx => {
  ctx.setStatus(200);
  ctx.send({ message: 'Hello world!' });
});

server.listen(3001);
```
