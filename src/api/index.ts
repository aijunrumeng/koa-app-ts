import Router from 'koa-router';
import controller from '@/controller';

const api = new Router();

api.post('/api/xxx', controller.getInfo);

export default api;
