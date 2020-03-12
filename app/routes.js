const fs=require('fs');

module.exports = function(app) {

	// var http = require('http').Server(app);
	var server =app.listen(8080)
	var io = require('socket.io').listen(server);

	// log a new calculation
	app.post('/api/addlog', function(req,res){
		var newCalc={"calc":req.body.text,"ts":Date.now()}

		fs.readFile('./calculations.json', (err, data) => {
			if (err) throw err;
			let calculations = JSON.parse(data);
			// if 10 calculations logged, remove oldest one
			if (calculations.length ==10){
				calculations.splice(0,1);
			}
			calculations.push(newCalc);
			// fs.writeFile("./calculations.json", JSON.stringify(calculations));
			fs.writeFile("./calculations.json", JSON.stringify(calculations), function(err, result) {
				if(err) console.log('error', err);
				//broadcast that new calculation has been logged
				io.emit('message', calculations);
			});
			res.json(calculations);
		});

	})

	//API to get logs when coming to the page for the first time
	app.get('/api/getlogs', function(req,res){
		fs.readFile('./calculations.json', (err, data) => {
			if (err) throw err;
			let calculations = JSON.parse(data);
			
			res.json(calculations);
		});
	})
	
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); 
	});
};