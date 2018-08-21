import Koa from 'koa'
import http from 'http'
import logger from 'koa-logger'
import session from 'koa-session'
import bodyParser from 'koa-bodyParser'
import "app-module-path/register";
// Is equivalent to:
import { addPath } from 'app-module-path';
addPath(__dirname + '/');
import router from "node-router/router"
import config from 'app.config';
import mongodb from 'node-utils/utils-mongoose'
import mongoosePaginate from 'mongoose-paginate'
const app = new Koa()
mongodb.connect()

// global options
mongoosePaginate.paginate.options = {
	limit: config.APP.LIMIT
};

app.keys = ['nodeapi']
// app config
// app.set('port', config.APP.PORT);
app.use(logger())
app.use(session(app))
app.use(bodyParser())
app
  .use(router.routes())
  .use(router.allowedMethods())


  // Start server
  http.createServer(app.callback()).listen(3002);
// app.listen(3002)