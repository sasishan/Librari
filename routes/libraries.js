//ROUTES
var   constants= require('../models/constants')
	, libraryController = require('../controllers/libraryController');

//Library ROUTES
//Get all libraries as a list
exports.get = function(req, res)
{
	libraryController.getUsersLibraries(req.db, '0', function(error, results)
	{
    	if (error)
		{
			console.log(error);
    		return res.status(constants.HTTP_INTERNAL_ERROR).send(error);
		}

        return res.status(constants.HTTP_OK).json(results);
	});
};

//Get items in a specific library
exports.getItems = function(req, res)
{
	if (!req.params.libId)
	{
		return res.status(constants.HTTP_INTERNAL_ERROR).send("Need a library ID");
	}

	libraryController.getUsersOneLibrary(req.db, '0', req.params.libId, function(error, results)
	{
    	if (error)
		{
			console.log(error);
    		return res.status(constants.HTTP_INTERNAL_ERROR).send(error);
		}

        return res.status(constants.HTTP_OK).json(results);
	});
};

//Create a new library
exports.create = function(req, res)
{
	libraryController.createLibrary(req.db, '0', req.body, function(error, results)
	{
    	if (error)
		{
			console.log(error);
    		return res.status(constants.HTTP_INTERNAL_ERROR).send(error);
		}

        return res.status(constants.HTTP_CREATED).json(constants.OK);
	});
};


//ITEMS
exports.addItem = function(req, res)
{
	if (!req.params.libId)
	{
		return res.status(constants.HTTP_INTERNAL_ERROR).send("Need a library ID");
	}

	libraryController.addItemToLibrary(req.db, '0', req.params.libId, req.body, function(error, results)
	{
    	if (error)
		{
			console.log(error);
    		return res.status(constants.HTTP_INTERNAL_ERROR).send(error);
		}

        return res.status(constants.HTTP_CREATED).json(constants.OK);
	});
}
