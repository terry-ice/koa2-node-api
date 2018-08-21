import Router from 'koa-router';
import controller from 'node-controllers'
import handle from 'node-middlewares/handle'
const app = new Router()
app.use(handle);

app
   // 用户相关api
  // .get('/logout',controller.user.logout)                                       // 用户退出
  .post('/auth', controller.user.login) // 用户登录
  .get('/auth', controller.user.personal) // 用户个人中心信息
  .put('/auth', controller.user.userinfo) // 更新用户个人信息

   //tag 相关api
  .post('/tag', controller.tag.add) // 添加tag
  .get('/tag', controller.tag.list) // tag列表
  .put('/tag/:tag_id', controller.tag.update) // 更新tag
  .delete('/tag/:tag_id', controller.tag.deleteId) // 删除单个tag
  .delete('/tag', controller.tag.deleteList) // 删除多个tag

   //category 相关api
  // .post('/category', controller.tag.add) // 添加tag
  .get('/category', controller.category.list) // category列表
  // .put('/category/:category_id', controller.category.update) // 更新category
  // .delete('/category/:category_id', controller.category.deleteId) // 删除单个category
  // .delete('/category', controller.category.deleteList) // 删除多个category

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
