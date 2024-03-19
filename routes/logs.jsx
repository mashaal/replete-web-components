import { Hono } from '@kyiro/hono';
import { Layout } from '../server.jsx';

const logs = new Hono();

const menu = ['Explora', 'Logs', 'Finances'];

logs.get('/', (c) => {
  return c.html(
    <Layout>
      <h1>Logs</h1>
      <nav>
        {menu.map((x) => (
          <a href={`/${x.toLocaleLowerCase()}`}>{x}</a>
        ))}
      </nav>
    </Layout>
  );
});

export default logs;
