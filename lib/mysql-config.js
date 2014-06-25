var fs = require('fs');

if(!fs.existsSync(__dirname + '/config/cfg')){
	console.log('Config not find, please run the sql2bq-init first...');
	process.exit(1);
}

var mysql = require('mysql')
	, cfg = require('./config/cfg').mysqlcfg
	, mysql = new require('mysql')
	, db = null;

if(mysql.createConnection) {
	console.log('using createConnection, mysqlcfg: %s',JSON.stringify(cfg));
	db = mysql.createConnection(cfg);
}else{
	console.log('using mysql.Client....');
	db = new mysql.Client(cfg);
	db.connect(function(err){
		if(err){
			console.log('[Error]connect db ' + db.host + ' error: ' + err);
			process.exit();
		}
	});
}

exports.mysqldb = db;
