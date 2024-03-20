import { Hono } from '@kyiro/hono';
import { serveStatic } from '@kyiro/hono/middleware';
import { hmrMiddleware, LiveReloadScript } from './hmr.jsx';
import Button from './components/Button.jsx';

// routes
import homepage from './routes/homepage.jsx';
import explora from './routes/explora.jsx';
import logs from './routes/logs.jsx';
import finances from './routes/finances.jsx';

// minify js
import minify from 'npm:@node-minify/core';
import uglifyjs from 'npm:@node-minify/uglify-js';

// preload headers
// import resolveLinkRelations from 'npm:modulepreload-link-relations/resolveLinkRelations.mjs';
// import formatLinkHeaderRelations from 'npm:modulepreload-link-relations/formatLinkHeaderRelations.mjs';

const app = new Hono();

// app.get('/hmr', hmrMiddleware());

app.use('/components/:filename{.+\\.js$}', async (c, next) => {
  const url = new URL(c.req.url, 'http://localhost');
  // quick js file server
  if (url) {
    const static_path = '.';
    const filePath = static_path + url.pathname;
    let file;
    try {
      file = await Deno.readTextFile(filePath);
    } catch {
      // ignore
    }
    if (file) {
      // @ts-ignore missing types from minify lib
      file = await minify({
        compressor: uglifyjs,
        content: file,
      });
      file = file.replaceAll('import.meta.resolve', '');
      // build modulepreload headers
      // const linkRelations = await resolveLinkRelations({
      //   appPath: static_path,
      //   url: filePath,
      // });

      /** @type {Object.<string, string>} */
      const headers = {
        'content-type': 'text/javascript',
      };
      // if (linkRelations) {
      //   headers.link = formatLinkHeaderRelations(linkRelations);
      // }
      return new Response(file, { headers });
    } else await next();
  }
});

app.use('/components/*', serveStatic({ root: './' }));
app.use('/images/*', serveStatic({ root: './' }));

app.route('/', homepage);
app.route('/explora', explora);
app.route('/logs', logs);
app.route('/finances', finances);

export const Layout = (props) => {
  return (
    <html>
      <head>
        <title>Internot</title>
        <link rel="stylesheet" href={'/components/global.css'} />
      </head>
      <body>
        <Button>xxx</Button>
        <a id="internot" href="/">
          <svg
            viewBox="0 0 100 100"
            xml:space="preserve"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              fill-opacity="1"
              stroke-linecap="round"
              stroke-linejoin="bevel"
              stroke-width="1.2"
            >
              <path d="M48.925 92.137c.053-10.413 26.464-24.932 36.11-23.553 7.948 1.2 2.131 9.214-1.248 12.23-3.658 3.505-7.82 6.383-12.244 8.797-29.221 15.707-64.896-4.733-66.247-37.856-1.273-26.46 21.703-48.833 48.13-46.6a.37.37 0 0 1-.052.738c-9.87-.652-19.887 2.191-27.945 7.849C8.872 24.842 2.023 47.638 9.688 66.024c7.148 18.538 27.725 30.335 47.339 27.06 9.743-1.413 18.709-6.51 25.903-13.154 2.547-2.352 8.463-9.271 1.959-10.186-10.083-.542-25.571 8.57-32.193 16.014-1.482 1.782-3.102 3.938-3.034 6.322.044.464-.704.561-.738.057z" />
              <path d="M38.549 90.958c2.419-14.562 32.973-31.121 46.886-31.872 2.727-.109 6.21-.065 7.841 2.547a.198.198 0 0 1-.342.197c-1.554-2.366-4.902-2.32-7.457-2.158C71.4 61.147 51.391 72.618 42.557 83.66c-1.687 2.174-3.23 4.615-3.617 7.347a.197.197 0 0 1-.391-.049z" />
              <path d="M30.514 87.838c.98-6.696 6.228-11.79 10.943-16.217 11.74-10.162 28.481-19.602 44.083-21.288 3.191-.134 7.276-.093 9.188 2.957a.198.198 0 0 1-.342.197c-1.834-2.804-5.785-2.754-8.804-2.567-16.606 1.73-40.096 15.22-50.465 28.286-1.956 2.551-3.81 5.424-4.21 8.667a.197.197 0 0 1-.214.18.202.202 0 0 1-.18-.216z" />
              <path d="M23.529 83.356c1.071-7.387 6.94-12.957 12.146-17.821 13.309-11.379 31.093-21.401 48.716-23.261 3.503-.126 7.996-.191 10.257 2.978a.198.198 0 0 1-.333.212c-2.198-2.942-6.54-2.779-9.882-2.603-18.682 1.841-44.055 16.412-55.842 30.967-2.171 2.808-4.246 5.973-4.668 9.561a.197.197 0 0 1-.213.181.202.202 0 0 1-.18-.214z" />
              <path d="M17.451 77.481c1.457-7.76 7.654-13.562 13.244-18.67 14.269-11.965 32.99-22.532 51.745-24.487 3.707-.127 8.478-.209 10.858 3.16a.198.198 0 0 1-.335.21c-2.317-3.14-6.938-2.96-10.483-2.783-19.868 1.916-46.667 17.315-59.428 32.58-2.357 2.949-4.59 6.259-5.21 10.041a.197.197 0 0 1-.221.17.202.202 0 0 1-.17-.222z" />
              <path d="M12.321 69.9c2.327-7.51 8.26-13.16 13.983-18.224 14.738-12.114 32.539-22.098 51.599-24.931 3.816-.345 7.991-.6 11.427 1.437a.198.198 0 1 1-.214.332c-3.326-1.9-7.452-1.585-11.143-1.184-20.195 2.856-45.987 17.627-59.443 32.904-2.455 2.914-4.734 6.108-5.828 9.772a.198.198 0 1 1-.381-.105z" />
              <path d="M8.852 61.235c2.717-7.108 8.483-12.455 14.087-17.341 14.434-11.767 31.548-21.265 50.115-24.187 3.71-.382 7.708-.662 11.15 1.087a.198.198 0 1 1-.192.345c-3.335-1.625-7.287-1.286-10.882-.848-20.094 3.112-44.08 16.925-57.84 31.819-2.451 2.774-4.771 5.779-6.064 9.254a.198.198 0 1 1-.374-.129z" />
              <path d="M7.301 50.583c9.073-17.258 39.901-34.647 58.965-37.364 3.37-.406 6.912-.604 10.194.61a.197.197 0 1 1-.142.369c-3.171-1.11-6.658-.863-9.97-.396-10.042 1.593-19.5 5.804-28.356 10.688-5.929 3.277-11.608 7.022-16.876 11.28-5.151 4.295-10.298 8.99-13.458 14.983-.093.226-.482.062-.356-.17z" />
              <path d="M9.589 36.007c9.606-13.42 39.179-30.933 55.908-28.035a.198.198 0 1 1-.102.382c-9.36-1.52-22.114 4.014-30.383 8.311-7.061 3.766-13.799 8.256-19.673 13.711-1.966 1.805-3.808 3.75-5.432 5.865-.136.201-.477-.027-.318-.234z" />
            </g>
          </svg>
        </a>
        {props.children}
      </body>
      {/* <LiveReloadScript /> */}
    </html>
  );
};

Deno.serve(app.fetch);
