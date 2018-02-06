var	  ObjectId = require('mongodb').ObjectID
	, constants= require('../models/constants')
	;

exports.createLibraryRecord = function (data)
{
	var newEntry = {};
    newEntry.LibraryId = (new ObjectId()).toString();
    newEntry.name = data.name;
    newEntry.items = data.items;

    return newEntry;
}


//Database functions
exports.insertRecordInCollection = function(collection, newRecord, callback)
{
    collection.insert( { newRecord }, function (error, results)
    {
    	if (error)
		{
    		return callback(error, null);
		}
		
		return callback(null, results);
    });
}

exports.updateRecordInCollection = function(collection, updatedRecord, upsertOption, callback)
{
    collection.update( {"_id": updatedRecord._id}, updatedRecord, {upsert: upsertOption}, function (error, results)
    {
    	if (error)
		{
    		return callback(error, null);
		}
		
		return callback(null, results);
    });
}

exports.findProfileLibraryRecord = function(db, profileId, options, callback)
{
	var projection={};
	console.log(options);
	if (options.projection)
	{
		projection = options.projection;
	}

	var collection = db.get(constants.COL_LIBRARY);

    collection.findOne({ ProfileId: profileId }, projection, function(error, results)
	{
    	if (error)
		{
    		return callback(error, null);
		}
		
		return callback(null, results);
    });
};

exports.findRecordsInCollection = function(db, collection, query, options, callback)
{
	var projection={};

	if (options.projection)
	{
		projection = options.projection;
	}

    collection.find( query, projection, function(error, results)
	{
    	if (error)
		{
    		return callback(error, null);
		}
		
		return callback(null, results);
    });
}