var express = require('express'),
	app = express();

app.use(express.static(__dirname));

app.listen(5000, function(){

	console.log("Http server running at http://localhost:5000");
});