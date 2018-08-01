import Koa from 'koa'
import logger from 'koa-logger'
import session from 'koa-session'
import bodyParser from 'koa-bodyParser'
const app = new Koa()

app.keys = ['nodeapi']
app.use(logger())
app.use(session(app))
app.use(bodyParser())

app.listen(3002)
console.log("3000")
