

import Tag from '../node-model/model-tag'
module.exports = {
  async list(ctx, next) {
    const tags = await Tag.find({})
    if (tags.length) {
      ctx.success({ data:tags,msg: '标签获取成功!' });
    } else {
      ctx.status =405;
      ctx.body ={ code: 0, message: '不支持该请求类型！' };
    }
  },
  async item(ctx, next) {
    const tags = await Tag.find({})
    if (tags.length) {
      ctx.body ={ code: 0, message: '不支持该请求类型！' };
    } else {
      ctx.status =405;
      ctx.body ={ code: 0, message: '不支持该请求类型！' };
    }
  },

}
// const tagCtrl = { list: {}, item: {} };

// let canGetTags = true;
// // 获取标签列表
// tagCtrl.list.GET = (req, res) => {

// 	let { page = 1, per_page = 12, keyword = '' } = req.query;

// 	// 过滤条件
// 	const options = {
// 		sort: { _id: -1 },
// 		page: Number(page),
// 		limit: Number(per_page)
// 	};

// 	// 查询参数
// 	const keywordReg = new RegExp(keyword);
// 	const query = {
// 		"$or": [
// 			{ 'name': keywordReg },
// 			{ 'slug': keywordReg },
// 			{ 'description': keywordReg }
// 		]
// 	};

// 	// 成功响应
// 	const querySuccess = tags => {
// 		handleSuccess({
// 			res,
// 			message: '标签列表获取成功',
// 			result: {
// 				pagination: {
// 					total: tags.total,
// 					current_page: options.page,
// 					total_page: tags.pages,
// 					per_page: options.limit
// 				},
// 				data: tags.docs
// 			}
// 		})
// 	};

	// // 管理员请求
	// if (authIsVerified(req)) {
	// 	getTags({
	// 		req, query, options,
	// 		success_cb(tags) {
	// 			querySuccess(tags);
	// 		}, 
	// 		err_cb(err) {
	// 			handleError({ res, err, message: '标签列表获取失败' });
	// 		}
	// 	});
	// 	return false;
	// }

	// 前台请求缓存
// 	redis.get('tags', (err, tags) => {
// 		querySuccess(tags);
// 		if (canGetTags) {
// 			getTags({
// 				req, query, options,
// 				success_cb(tags) {
// 					redis.set('tags', tags);
// 				}, 
// 				err_cb(err) {
// 					handleError({ res, err, message: '标签列表获取失败' });
// 				}
// 			});
// 			canGetTags = false;
// 			setTimeout(function () {
// 				canGetTags = true;
// 			}, 1000 * 60 * 5)
// 		}
// 	});
// };
// exports.list = (ctx, next) => { handleRequest({ ctx, controller: tagCtrl.list })};
// exports.item = (ctx, next) => { handleRequest({ ctx, controller: tagCtrl.list })};