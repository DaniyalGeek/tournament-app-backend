var mysqlAdapter = require('sails-mongo');

module.exports = {
	adapters: {
		mysqlAdapt: mysqlAdapter
	},

  connections: {
    mysqlDB: {
		adapter: 'mysqlAdapt',
		
		host: 'localhost', // defaults to `localhost` if omitted
        port: 27017, 
		database: 'tournament',
		user:'root',
		password:'',
		supportBigNumbers:true, //true/false
		debug:['ComQueryPacket'], //false or array of node-mysql debug options
		trace:true //true/false
    } 
  }
};
