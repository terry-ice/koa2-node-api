import Router from 'koa-router';
import controller from '../node-controllers'
// console.log(controller,'controller')
const app = new Router()
app.get('/login', controller.user.login);
app.get('/tag', controller.tag.list);
app.all('*', async ( ctx )=>{
  ctx.body ={
    code: 0,
   message: '无效的API请求'
  }
})
export default app