/*
 * @Author: terry 
 * @Date: 2018-08-10 09:58:49 
 * @Last Modified by:   https://github.com/terry-ice 
 * @Last Modified time: 2018-08-10 09:58:49 
 */

exports.handleRequest = ({
  ctx,
  controller
}) => {
  const method = ctx.method;
  const support = !!controller[method];
  support && controller[method](ctx);
  if (support) {
    ctx.body = {
      code: 0,
      message: '不支持该请求类型！'
    };
  }
};

exports.handleError = ({
  ctx,
  message = '请求失败',
  err = null,
  code
}) => {
  if (code) {
    ctx.status = code
    ctx.body = {
      code: 0,
      message,
      debug: err
    };
  } else {
    ctx.body = {
      code: 0,
      message,
      debug: err
    };
  }
};

exports.handleSuccess = ({
  ctx,
  message = '请求成功',
  result = null
}) => {
  ctx.body = {
    code: 1,
    message,
    result
  };
};

exports.handleThrottle = (method, delay) => {
  let canRun = true;
  return () => {
    if (canRun) {
      canRun = false;
      method();
      setTimeout(function () {
        canRun = true;
      }, delay);
    }
  }
};