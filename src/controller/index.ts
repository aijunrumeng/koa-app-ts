import Koa from 'koa';
import * as modal from '@/modal';

class Controller<
  T extends Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>,
  K extends Koa.Next
> {
  async getInfo(ctx: T, next: K) {
    await next();

    const data = await modal.getInfo();

    return (ctx.body = data);
  }
}

export default new Controller();
