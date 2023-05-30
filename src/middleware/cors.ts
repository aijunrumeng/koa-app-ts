import { Context, Next } from 'koa';

export const cors = () => {
  return async (ctx: Context, next: Next) => {
    await next();

    ctx.set('Access-Control-Allow-Origin', '*');

    ctx.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
    );
    ctx.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    ctx.set('Access-Control-Allow-Credentials', 'true');
  };
};
