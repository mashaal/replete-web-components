import { Hono } from '@kyiro/hono';
import { init, mdToHtml } from 'md4w';
import { raw } from '@kyiro/hono/html';
import { Layout } from '../server.jsx';

await init();

const homepage = new Hono();

const md = String.raw;

const content = md`
- Lower fees
- Instant payouts
- Physical release focused
- Mastodon/ActivityPub compatible
- Podcast 2.0 supports many players
- Upload supplimentary content (images, video, code)
- FLAC + MP3
`;

const menu = ['Explora', 'Logs', 'Finances'];

homepage.get('/', (c) => {
  return c.html(
    <Layout>
      <h1>Internot</h1>
      <nav>
        {menu.map((x) => (
          <a href={`/${x.toLocaleLowerCase()}`}>{x}</a>
        ))}
      </nav>
      <img src="/images/p4.webp" />
      <section>{raw(mdToHtml(content))}</section>
    </Layout>
  );
});

export default homepage;
