//ROUTES
var   constants= require('../models/constants')
	, itemController = require('../controllers/itemController');

//Get global item config
exports.getGlobalItemsConfig = function(req, res)
{

	itemController.getGlobalConfig(req.db, function(error, results)
	{
    	if (error)
		{
			console.log(error);
    		return res.status(constants.HTTP_INTERNAL_ERROR).send(error);
		}

        return res.status(constants.HTTP_OK).json(results);
	});
};

exports.getMyItemsConfig = function(req, res)
{
	itemController.getMyItemsConfig(req.db, '0', function(error, results)
	{
    	if (error)
		{
			console.log(error);
    		return res.status(constants.HTTP_INTERNAL_ERROR).send(error);
		}

        return res.status(constants.HTTP_OK).json(results);
	});
};

exports.get = function(req, res)
{

	return res.status(200).send("OK");
}

exports.create = function(req, res)
{
	var book = new Book('The Shape of Water');

	return res.status(200).send(book.title + " created");
}