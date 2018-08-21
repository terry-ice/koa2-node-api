/*
 * @Author: terry 
 * @Date: 2018-08-10 17:01:24 
 * @Last Modified by: https://github.com/terry-ice
 * @Last Modified time: 2018-08-21 17:32:55
 */

import Category from 'node-model/model-category'
import isAuth from 'node-middlewares/auth'
import Article from 'node-model/model-article'
module.exports = {
   async list(ctx){
    let { page = 1, per_page = 10 } =  ctx.query;

    // 过滤条件
    const options = {
      sort: { _id: 1 },
      page: Number(page),
      limit: Number(per_page)
    };
  
    const querySuccess = categories => {
      ctx.success({
        message: '分类列表获取成功',
        result: {
          pagination: {
            total: categories.total,
            current_page: options.page,
            total_page: categories.pages,
            per_page: options.limit
          },
          data: categories.docs
        }
      });
    };
  
    // 查询article-category的count聚合数据
    const getCatrgoriesCount = categories => {
      let $match = {};
      if (!isAuth(ctx.req)) {
        $match = { state: 1, public: 1 };
      }
      Article.aggregate([
        { $match },
        { $unwind : "$category" }, 
        { $group: { 
          _id: "$category", 
          num_tutorial: { $sum : 1 }}
        }
      ])
      .then(counts => {
        const newCtefories = categories.docs.map(t => {
          const finded = counts.find(c => String(c._id) === String(t._id));
          t.count = finded ? finded.num_tutorial : 0;
          return t;
        });
        categories.docs = newCtefories;
        querySuccess(categories);
      })
      .catch(err => {
        querySuccess(categories);
      })
    };
  
    // 请求
    Category.paginate({}, options)
    .then(categories => {
      categories = JSON.parse(JSON.stringify(categories));
      getCatrgoriesCount(categories);
    })
    .catch(err => {
      ctx.error({ message: '分类列表获取失败' });
    })
   }
}
