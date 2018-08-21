import Tag from 'node-model/model-tag'
import isAuth from 'node-middlewares/auth'
module.exports = {
  // 查询标签列表
  async list(ctx) {
    let {
      page = 1, per_page = 10, keyword = ''
    } = ctx.query;
    // 过滤条件
    const options = {
      sort: {
        _id: -1
      },
      page: Number(page),
      limit: Number(per_page)
    };
    // 查询参数
    const keywordReg = new RegExp(keyword);
    const query = {
      "$or": [{
          'name': keywordReg
        },
        {
          'slug': keywordReg
        },
        {
          'description': keywordReg
        }
      ]
    };
    // 成功响应
    const querySuccess = tags => {
      ctx.success({
        message: '标签列表获取成功',
        result: {
          pagination: {
            total: tags.total,
            current_page: options.page,
            total_page: tags.pages,
            per_page: options.limit
          },
          data: tags.docs
        }
      })
    };
    await Tag.paginate(query, options).then((res) => {
      querySuccess(res)
    }).catch(err => {
      ctx.error({
        message: '获取标签失败'
      })
    })
  },
  async add(ctx) {
    // 验证
    const body = ctx.request.body
    if (body == undefined || body == null) {
      return ctx.error({
        message: '缺少slug!'
      })
    };
    // 保存标签
    const saveTag = () => {
      Tag.create(body).then((res) => {
        ctx.success({
          result: res,
          message: '添加标签成功'
        })
      })
      ctx.success({
        message: '添加标签成功'
      })
    }
    // 验证Slug合法性
    await Tag.find({
        body
      })
      .then(({
        length
      }) => {
        length ? ctx.error({
          message: 'slug已被占用'
        }) : saveTag();
      })
      .catch(err => {
        ctx.error({
          message: '标签发布失败'
        });
      })
  },
  async update(ctx) {
    // 验证
    const {
      tag_id
    } = ctx.params
    const {
      slug
    } = ctx.request.body
    // console.log(ctx.request.body, 'ctx.request.body');
    if (!slug) {
      ctx.error({
        message: 'slug不合法'
      });
      return false;
    };


    // // 修改
    const putTag = () => {
      Tag.findByIdAndUpdate(tag_id, ctx.request.body, {
        new: true
      }).then((res) => {
        // console.log(res,'res')
        ctx.success({
          message: '标签修改成功'
        })
      })
      ctx.success({
        message: '标签修改成功'
      })
    };
    // 修改前判断slug的唯一性，是否被占用
    await Tag.find({
        slug
      })
      .then(([_tag]) => {
        const hasExisted = (_tag && (_tag._id != tag_id));
        hasExisted ?
          ctx.error({
            message: 'slug已被占用'
          }) : putTag();
      })
      .catch(err => {
        ctx.error({
          message: '修改前查询失败'
        });
      })
  },
  async deleteId(ctx) {
    // 删除单个标签
    const {
      tag_id
    } = ctx.params
    await Tag.findByIdAndRemove(tag_id)
      .then((res) => {
        console.log(res, 'res')
        ctx.success({
          message: '标签删除成功'
        })
      })
      .catch(err => {
        ctx.error({
          message: '标签删除失败'
        });
      })
  },
  async deleteList(ctx) {
    // 验证
    const {
      tags
    } = ctx.request.body
    if (!tags || !tags.length) {
      handleError({
        res,
        message: '缺少有效参数'
      });
      return false;
    };
    await Tag.remove({
        '_id': {
          $in: tags
        }
      })
      .then(result => {
        ctx.success({
          message: '标签批量删除成功'
        });
      })
      .catch(err => {
        ctx.error({
          message: '标签批量删除失败'
        });
      })
  }
}
