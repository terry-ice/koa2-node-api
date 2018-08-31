/*
 * @Author: terry 
 * @Date: 2018-08-10 17:01:24 
 * @Last Modified by: https://github.com/terry-ice
 * @Last Modified time: 2018-08-31 11:27:36
 */

import Category from 'node-model/model-category'
import isAuth from 'node-middlewares/auth'
import Article from 'node-model/model-article'
module.exports = {
  async list(ctx) {
    let {
      page = 1, per_page = 10
    } = ctx.query;
    // 过滤条件
    const options = {
      sort: {
        _id: 1
      },
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

    // 请求
    await Category.paginate({}, options)
      .then(categories => {
        categories = JSON.parse(JSON.stringify(categories));
        querySuccess(categories)
      })
      .catch(err => {
        ctx.error({
          message: '分类列表获取失败'
        });
      })
  },
  async add(ctx) {
    const category = ctx.request.body
    const {
      slug
    } = category
    // 验证

    if (!category.pid) {
      delete category.pid;
    };

    if (category.slug == undefined) {
      handleError({
        res,
        message: '缺少slug'
      });
      return false;
    };
    // 验证Slug合法性
    const list = await Category.find({
      slug
    })
    if (list.length) {
      ctx.error({
        message: '分类已经存在'
      });
    } else {
      const result = await Category(category).save()
      ctx.success({
        result,
        message: '分类发布成功'
      });
    }
  },
  async deleteId(ctx) {
    const {
      category_id
    } = ctx.params
    // delete category
    const deleteCategory = () => {
      return Category.findByIdAndRemove(category_id);
    };

    // delete pid
    const deletePid = category => {
      return new Promise((resolve, reject) => {
        Category.find({
            pid: category_id
          })
          .then(categories => {
            // 如果没有子分类
            if (!categories.length) {
              resolve({
                result: category
              });
              return false;
            };
            // 否则更改父分类的子分类
            let _category = Category.collection.initializeOrderedBulkOp();
            _category.find({
              '_id': {
                $in: Array.from(categories, c => c._id)
              }
            }).update({
              $set: {
                pid: category.pid || null
              }
            });
            _category.execute((err, data) => {
              err ? reject({
                err
              }) : resolve({
                result: category
              });
            })
          })
          .catch(err => reject({
            err
          }))
      })
    };

    let category = await deleteCategory();
    await deletePid(category)
      .then(({
        result
      }) => {
        console.log(result, 'result')
        ctx.success({
          message: '分类删除成功'
        });
      })
      .catch(({
        err
      }) => ctx.error({
        message: '分类删除失败'
      }));;
  },
  async deleteList(ctx) {
    // 验证
    const {
      categories
    } = ctx.request.body
    if (!categories || !categories.length) {
      ctx.error({
        message: '缺少有效参数'
      })
      return false;
    };
    // 把所有pid为categories中任何一个id的分类分别提升到自己分类本身的PID分类或者null
    await Category.remove({
        '_id': {
          $in: categories
        }
      })
      .then(result => {
        ctx.success({
          message: '分类批量删除成功'
        });
      })
      .catch(err => {
        ctx.error({
          message: '分类批量删除失败'
        })
      })
  },
  async update(ctx){
    const {
      category_id
    } = ctx.params
    const category = ctx.request.body
    const {
      slug,
      pid
    } = category
    console.log(category,'category')
    // 验证
    if (slug == undefined) {
      ctx.error({ message: 'slug不合法' });
      return false;
    };
  
    // // 修改
    // const putCategory = () => {
     
    // };
  
    // 修改前判断slug的唯一性，是否被占用
    // 验证Slug合法性
    const list = await Category.find({
      slug
    })
    console.log(list,'list')
    if (list.length) {
      ctx.error({
        message: '分类已经存在'
      });
    } else {
      if (['', '0', 'null', 'false'].includes(pid) || !pid || Object.is(pid, category_id)) {
        category.pid = null;
      };
      await Category.findByIdAndUpdate(category_id, category, { new: true })
      .then(result => {
        ctx.success({
          message: '分类修改成功'
        });
      })
      .catch(err => {
        ctx.error({ message: '分类修改失败' });
      })
    }

  }
}
