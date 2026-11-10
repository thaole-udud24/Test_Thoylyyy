import { createServer } from "node:http";

const port = Number(process.env.PORT ?? 3000);
const version = process.env.APP_VERSION ?? "v1.0.0";
const message = process.env.APP_MESSAGE ?? "Xin chào từ Test_Thoylyyy chạy trên Mini PaaS!";

const page = `<!doctype html>
<html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Test Thoylyyy</title>
<style>body{font-family:system-ui,sans-serif;display:grid;place-items:center;min-height:100vh;margin:0;background:#eef3fb;color:#14224a}
main{text-align:center;padding:32px;background:#fff;border-radius:16px;box-shadow:0 8px 24px rgba(20,34,74,.1)}
code{background:#eef3fb;padding:2px 8px;border-radius:6px}</style></head>
<body><main><h1>${message}</h1><p>Phiên bản <code>${version}</code></p><p><a href="/health">/health</a> · <a href="/version">/version</a></p></main></body></html>`;

const server = createServer((request, response) => {
  const json = (status, body) => {
    response.writeHead(status, { "content-type": "application/json" });
    response.end(JSON.stringify(body));
  };
  if (request.url === "/health") return json(200, { status: "ok" });
  if (request.url === "/version") return json(200, { version });
  response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  response.end(page);
});

server.listen(port, "0.0.0.0", () => console.log(`listening on ${port}`));
process.on("SIGTERM", () => server.close(() => process.exit(0)));
