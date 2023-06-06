import handler from 'serve-handler';
import http from 'http';

const port = process.env.APP_PORT;

const server = http.createServer((request, response) => {
  // You pass two more arguments for config and middleware
  // More details here: https://github.com/vercel/serve-handler#options
  
  return handler(request, response, {
    public: 'public'
  });
});

server.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});