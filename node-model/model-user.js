import {mongoose} from 'node-utils/utils-mongoose'
import autoIncrement from 'mongoose-auto-increment'
// 自增ID初始化
autoIncrement.initialize(mongoose.connection);
import crypto from 'crypto'
import config from '../app.config';
const userSchema = new mongoose.Schema({
	// 名字
	name: { type: String, default: '' },

	// 签名
	slogan: { type: String, default: '' },

	// 头像
	gravatar: { type: String, default: '' },

	// 密码
	password: { 
		type: String, 
		default: crypto.createHash('md5').update(config.USER.defaultPassword).digest('terry')
	}
});

const User = mongoose.model('USER', userSchema);
module.exports = User;