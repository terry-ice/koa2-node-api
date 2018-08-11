import {mongoose} from 'node-utils/utils-mongoose'
import autoIncrement from 'mongoose-auto-increment'
import mongoosePaginate from 'mongoose-paginate'
// 自增ID初始化
autoIncrement.initialize(mongoose.connection);
import crypto from 'crypto'

import config from 'app.config';
let pwd = crypto.createHash('md5').update(config.USER.defaultPassword).digest('terry')
const userSchema = new mongoose.Schema({
	// 名字
	name: { type: String, default: 'terry' },

	// 签名
	slogan: { type: String, default: '小生活平平淡淡' },

	// 头像
	gravatar: { type: String, default: 'https://avatars1.githubusercontent.com/u/18209670' },

	// 密码
	password: { 
		type: String, 
		default: pwd
  },
  meta: {
    createAt: {
      type: Date,
      dafault: Date.now()
    },
    updateAt: {
      type: Date,
      dafault: Date.now()
    }
  }
});

// Defines a pre hook for the document.
// userSchema.pre('save', function(next) {
//   if (this.isNew) {
//     this.meta.createAt = this.meta.updateAt = Date.now()
//   }
//   else {
//     this.meta.updateAt = Date.now()
//   }
//   next()
// })
//自增ID插件配置
userSchema.plugin(mongoosePaginate)
userSchema.plugin(autoIncrement.plugin, {
	model: 'User',
	field: 'id',
	startAt: 1,
	incrementBy: 1
});
const User = mongoose.model('USER', userSchema);
module.exports = User;