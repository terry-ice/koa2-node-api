import mongoose from 'mongoose'
import config from '../app.config'
mongoose.Promise = global.Promise;
exports.mongoose = mongoose;
// 数据库
exports.connect = () => {
  // 连接数据库
  mongoose.connect(config.MONGODB.uri, {
    useNewUrlParser: true
  }, () => {
    // promiseLibrary: global.Promise
  });
  // 连接错误
  mongoose.connection.on('error', error => {
    console.log('数据库连接失败!', error);
  })
  // 连接成功
  mongoose.connection.once('open', () => {
    console.log('数据库连接成功!');
  })
  return mongoose;
};