// import { handleRequest, handleError, handleSuccess } from '../node-utils/utils-handle'

import User from '../node-model/model-user'
// console.log(User,'User')
module.exports = { 
   async login (ctx, next) {
    console.log(ctx,'ctx');
      // let {username, pwd} = ctx.request.body;
      // console.log(username)
      // try {
      //     let data = await ctx.findOne(userModel, {username: username});
      //     console.log(data)
      //     if (!data) {
      //         return ctx.sendError('用户名不存在！');
      //     }
      //     if (pwd !== data.pwd) {
      //         return ctx.sendError('密码错误,请重新输入！');
      //     }
      //     await ctx.update(userModel, {_id: data._id}, {$set:{loginTime: new Date()}}) //更新登陆时间

      //     let payload = {
      //         _id: data._id,
      //         username: data.username,
      //         name: data.name,
      //         roles: data.roles
      //     }
      //     let token = jwt.sign(payload, conf.auth.admin_secret, {expiresIn: '24h'})  //token签名 有效期为24小时
      //     ctx.cookies.set(conf.auth.tokenKey, token, {
      //         httpOnly: false,  // 是否只用于http请求中获取
      //     });
      //     console.log('登陆成功')
      //     ctx.send({message: '登录成功'});
      // } catch (e) {
      //     if (e === '暂无数据') {
      //         console.log('用户名不存在')
      //         return ctx.sendError('用户名不存在');
      //     }
      //     ctx.throw(e);
      //     ctx.sendError(e)
      // }
      
  }
}