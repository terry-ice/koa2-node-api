const argv = require('yargs').argv;

exports.APP = {
	ROOT_PATH: __dirname,
	LIMIT: 16,
	PORT: 3002
}
exports.MONGODB = {
	uri: `mongodb://127.0.0.1:${argv.dbport || '27017'}/NodePress`,
	username: argv.db_username || '',
	password: argv.db_password || ''
}

exports.USER = {
	data: argv.auth_data || { user: 'root' },
	jwtTokenSecret: argv.auth_key || 'qq1011',
	defaultPassword: argv.auth_default_password || 'root'
}
exports.AUTH = {
	data: argv.auth_data || { user: 'root' },
	jwtTokenSecret: argv.auth_key || 'nodepress',
	defaultPassword: argv.auth_default_password || 'root'
}


