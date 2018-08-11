/*
 * @Author: terry 
 * @Date: 2018-08-10 14:22:36 
 * @Last Modified by: https://github.com/terry-ice
 * @Last Modified time: 2018-08-10 17:15:22
 * @ error-data 返回错误时，可携带的数据
 * @ error-msg  自定义的错误提示信息
 * @ 调用ctx.error()   响应错误
 * @ 调用ctx.success()  响应成功
 */
module.exports = async (ctx, next) => {
  ctx.error = ({ result, message, status, error }) => {
    ctx.status = status || 400
    ctx.body = {
      code: 0,
      message,
      result,
      error
    }
  }
  ctx.success = ({ result, message}) => {
    ctx.body = {
      code: 1,
      message,
      result
    }
  }
  await next()
}
