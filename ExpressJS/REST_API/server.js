// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api/segments/all or http://localhost:8080/api/segments/<String>)
			 
var objMap = { "results":[{"id":"1","code":'ca',"description":"H, Engaged, Assigned, AC, male/unknown, 35+","displayvalues":"H,E,AS,AC,M/UNK,35+"}, 
						  {"id":"2","code":'cb',"description":"H, Engaged, Assigned, AC, male/unknown, <age 35","displayvalues":"H,E,AS,AC,M/UNK,<35"},
						  {"id":"3","code":'cc',"description":"H, Unengaged, Assigned, AC, male/unknown, 35+","displayvalues":"H,UN,AS,AC,M/UNK,35+"},
						  {"id":"4","code":'cd',"description":"H, Unengaged, Assigned, AC, male/unknown, <age 35, 35+","displayvalues":"H,UN,AS,AC,M/UNK,<35"},
						  {"id":"5","code":'ce',"description":"H, Unengaged, Unassigned, AC, male/unknown, 35+","displayvalues":"H,UN,UNAS,AC,M/UNK,35+"},
						  {"id":"6","code":'cf',"description":"H, Unengaged, Unassigned, AC, male/unknown, <age 35","displayvalues":"H,UN,UNAS,AC,M/UNK,<35"} 						  
						  ]};

var output;
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
router.get('/segments/:id', function(req, res) {
	var res;
	if(req.params.id === "list"){
		res.json(objMap);
	}      
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('The REST API available through http://localhost:'+port+'/api/segments/list');
