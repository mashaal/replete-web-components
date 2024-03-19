import { Hono } from '@kyiro/hono';
import { Layout } from '../server.jsx';

const finances = new Hono();

const menu = ['Explora', 'Logs', 'Finances'];

finances.get('/', (c) => {
  return c.html(
    <Layout>
      <h1>Finances</h1>
      <nav>
        {menu.map((x) => (
          <a href={`/${x.toLocaleLowerCase()}`}>{x}</a>
        ))}
      </nav>
    </Layout>
  );
});

export default finances;
