/*
 * @Author: terry 
 * @Date: 2018-08-10 17:01:24 
 * @Last Modified by: https://github.com/terry-ice
 * @Last Modified time: 2018-08-10 20:09:26
 */

import User from 'node-model/model-user'
import crypto from 'crypto'
import config from 'app.config'
import jwt from 'jsonwebtoken'
// md5编码
const md5Decode = pwd => {
  return crypto.createHash('md5').update(pwd).digest('hex')
}
module.exports = {
  // 用户登录
  async login(ctx) {
    const {
      username,
      password
    } = ctx.request.body;
    if (!username || !password) {
      return ctx.error({
        message: '用户名或密码错误!'
      });
    }
    const data = await User.findOne({
      username,
      password: md5Decode(password)
    }, {
      password: 0
    });
    if (!data) return ctx.error({
      message: '用户名或密码错误!'
    });
    // ctx.session.user = data;
    // const id = data._id;
    // const avatar = data.gravatar;
    // const keep_user = 604800000; // 7天
    // ctx.cookies.set('userid', id, {
    //   maxAge: keep_user,
    //   httpOnly: false
    // });
    // ctx.cookies.set('username', username, {
    //   maxAge: keep_user,
    //   httpOnly: false
    // });
    // ctx.cookies.set('avatar', avatar, {
    //   maxAge: keep_user,
    //   httpOnly: false
    // });
    const token = jwt.sign({
      data: config.AUTH.data,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
    }, config.AUTH.jwtTokenSecret);
    ctx.success({result: { token }, message: '登陆成功' });
  },
  // 获取admin用户资料
  async personal(ctx) {
    const user = await User.findOne({
      username: 'admin'
    }, '-_id name slogan gravatar')
    console.log(user,'user');
    if (user) {
      ctx.success({
        result: user
      });
    } else {
      ctx.error({
        message: '暂无数据!'
      });
    }
  },
  
  // 修改用户资料
  async userinfo(ctx) {
    const {
      body: auth
    } = ctx.request
    // 初始化
    let {
      name,
      slogan,
      gravatar,
      password,
      new_password,
      rel_new_password
    } = auth

    // 验证密码
    if (!!password && ((!new_password || !rel_new_password) || !Object.is(new_password, rel_new_password))) {
      ctx.error({
        message: '密码不一致或无效!'
      });
      return false
    };

    if (!!password && [new_password, rel_new_password].includes(password)) {
      ctx.error({
        message: '新旧密码不可一致!'
      });
      return false
    };

    // 修改前查询验证
    User.find({}, '_id name slogan gravatar password')
      .then(([_auth = {
        password: md5Decode(config.AUTH.defaultPassword)
      }]) => {
        if (!!password && !Object.is(_auth.password, md5Decode(password))) {
          ctx.error({
            message: '原密码不正确'
          })
        } else {
          if (!auth.password) delete auth.password
          if (auth.rel_new_password) auth.password = md5Decode(auth.rel_new_password)
          return (_auth._id ? User.findByIdAndUpdate(_auth._id, auth, {
            new: true
          }) : new User(auth).save())
        }
      })
      .then(({
        name,
        slogan,
        gravatar
      } = auth) => {
        ctx.error({
          result: {
            name,
            slogan,
            gravatar
          },
          message: '用户权限修改成功'
        })
      })
      .catch(err => {
        ctx.error({
          message: '用户权限修改失败'
        })
      })
  }
}
