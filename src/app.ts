import Koa from 'koa';
import koaBody from 'koa-body';
import koaStatic from 'koa-static';

import router from './api';
import middleware from './middleware';

import chalk from 'chalk';

const app = new Koa();

app.keys = process.env.APP_KEYS?.split(',') ?? [];

const server = require('http').createServer(app.callback(), {
  transports: ['websocket'],
});

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(koaBody({ multipart: true }))
  .use(middleware.cors.cors())
  .use(koaStatic('.'));

server.listen(8188, '0.0.0.0', () => {
  console.log(
    `[${chalk.green('Server')}] ${chalk.blue('listening on port 8188')}`
  );
});
