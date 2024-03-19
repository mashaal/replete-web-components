import { Hono } from '@kyiro/hono';
import { Layout } from '../server.jsx';

const explora = new Hono();

const menu = ['Explora', 'Logs', 'Finances'];

explora.get('/', (c) => {
  return c.html(
    <Layout>
      <h1>Explora</h1>
      <nav>
        {menu.map((x) => (
          <a href={`/${x.toLocaleLowerCase()}`}>{x}</a>
        ))}
      </nav>
    </Layout>
  );
});

export default explora;
