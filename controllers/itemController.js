var	  ObjectId = require('mongodb').ObjectID
	, async = require('async')

	, constants= require('../models/constants')
	, database = require('./database')
	;


exports.getMyItemsConfig = function(db, profileId, callback)
{ 
	var options={};
	options.projection = constants.PROJECTION_INCLUDE_CUSTOM_ITEMS;
	var collection = db.get(constants.COL_LIBRARY);
	var query = {'ProfileId': profileId};

	database.findRecordsInCollection(db, collection, query, options, function(error, results)
	{
    	if (error)
		{
    		return callback(error, null);
		}
		
		if (results)
		{
			return callback(null, results);	
		}
		else
		{
			return callback(null, []);
		}
	});
};

exports.getGlobalConfig = function(db, callback)
{ 
	var options={};
//	options.projection = constants.PROJECTION_EXCLUDE_ITEMS;
	var collection = db.get(constants.COL_GLOBAL_CONFIG);
	var query = constants.ITEM_CONFIG_QUERY;

	database.findRecordsInCollection(db, collection, query, options, function(error, results)
	{
    	if (error)
		{
    		return callback(error, null);
		}
		
		if (results)
		{
			return callback(null, results);	
		}
		else
		{
			return callback(null, []);
		}
	});
};
