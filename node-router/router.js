import Router from 'koa-router';
import controller from 'node-controllers'
import handle from 'node-middlewares/handle'
console.log(controller, 'controller')
const app = new Router()
app.use(handle);
app.get('/tag', controller.tag.list);
// 用户相关api
app
  // .get('/logout',controller.user.logout)                                       // 用户退出
  .post('/auth', controller.user.login) // 用户登录
  .get('/auth', controller.user.personal) // 用户个人中心信息
  .put('/auth', controller.user.userinfo); // 更新用户个人信息

app.all('*', async (ctx) => {
  ctx.set('Access-Control-Allow-Headers', 'Authorization, Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With');
  ctx.set('Access-Control-Allow-Methods', 'PUT,PATCH,POST,GET,DELETE,OPTIONS');
  ctx.set('Access-Control-Max-Age', '1728000');
  ctx.set('Content-Type', 'application/json;charset=utf-8');
  ctx.set('X-Powered-By', 'terry 1.0.0');

  
  ctx.body = {
    code: 0,
    message: '无效的API请求'
  }
})
export default app
