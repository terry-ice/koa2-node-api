// import { handleRequest, handleError, handleSuccess } from '../node-utils/utils-handle'

import Tag from '../node-model/model-tag'
// const Article = require('../node-model/article.model');
// const Category = require('../node-model/category.model');
module.exports = {
  async list(ctx, next) {
    const tags = await Tag.find({})
    if (tags.length) {
      ctx.body = {
        message: '标签列表获取成功',
        data: tags
      }

    } else {
      ctx.body = {
        message: "123123倒计时了房间"
      }
    }
  }

}