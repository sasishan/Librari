var	  ObjectId = require('mongodb').ObjectID
	, async = require('async')

	, constants= require('../models/constants')
	, database = require('./database')
	;

function Library (name)
{
	this.name = name;
	this.items=[];
}

Library.prototype.getName = function() 
{
	return this.name;
};

function Book (title)
{
	this.title = title;
	this.type="book";
}

Book.prototype.getTitle = function() 
{
	return this.title;
};

Book.prototype.setAuthor = function(author) 
{
	this.author = author;
};

//LIBRARY BUSINESS LOGIC
exports.getUsersLibraries = function(db, profileId, callback)
{ 
	var options={};
	options.projection = constants.PROJECTION_EXCLUDE_ITEMS;

	database.findProfileLibraryRecord(db, profileId, options, function(error, results)
	{
    	if (error)
		{
    		return callback(error, null);
		}
		
		if (results)
		{
			return callback(null, results.Libraries);	
		}
		else
		{
			return callback(null, []);
		}
	});
};

exports.getUsersOneLibrary = function(db, profileId, libraryId, callback)
{ 
	database.findProfileLibraryRecord(db, profileId, {}, function(error, results)
	{
    	if (error)
		{
    		return callback(error, null);
		}
		
		if (results.Libraries)
		{
			getOneLibrary(libraryId, results.Libraries, function(error, result)
			{
				if (error)
				{
					return callback(error, null);
				}
				return callback(null, result);
			});
		}
	});
};

//Find one library in a passed in list
getOneLibrary = function(libraryId, libraries, callback)
{
	for (var i=0; i<libraries.length; i++)
	{
		if (libraries[i].LibraryId==libraryId)
		{
			return callback(null, libraries[i]);
		}
	}
	return callback(null, []);	
};

exports.createLibrary = function(db, profileId, rawData, callback)
{
	var name = rawData.name;
	if (!name)
	{
		return callback("No data to create a library", null);;
	}
	var newLibrary = new Library(name);
    
    var collection = db.get(constants.COL_LIBRARY);
    var options={};
	options.projection = constants.PROJECTION_EXCLUDE_ITEMS;

	database.findProfileLibraryRecord(db, profileId, options, function(error, results)
	{
    	if (error || !results)
		{
    		return callback(error, null);
		}

		var newEntry = createLibraryRecord(newLibrary);
		results.Libraries.push(newEntry);

		database.updateRecordInCollection(collection, results, true, function(error, results)
		{
	    	if (error)
			{
	    		return callback(error, null);
			}

			return callback(null, "OK");
		});
	});
};

exports.addItemToLibrary = function(db, profileId, libraryId, rawItemData, finalCallback)
{ 
	async.waterfall([
		function(callback) //find the library record
		{
			database.findProfileLibraryRecord(db, profileId, {}, function(error, results)
			{
		    	if (error)
				{
		    		return callback(error, null);
				}				
				callback(null, results);
			});			
		},
		function(profileLibrary, callback) //find the specific library to add item to
		{
			if (profileLibrary.Libraries)
			{
				getOneLibrary(libraryId, profileLibrary.Libraries, function(error, library)
				{
					if (error)
					{
						return callback(error, null);
					}
					
					if (!library.items)
					{
						library.items=[];
					}

					//check if the item already exists
					for (var i=0; i<library.items.length; i++)
					{
						if (library.items[i].title==rawItemData.title && library.items[i].type==rawItemData.type)
						{
							return callback("Item already exists", null);
						}
					}
					library.items.push(rawItemData);

					callback(null, profileLibrary);
				});				
			}
		},
		function(updatedProfileLibrary, callback) //update the items list in this libary
		{
			var collection = db.get(constants.COL_LIBRARY);

			database.updateRecordInCollection(collection, updatedProfileLibrary, false, function(error, results)
			{
		    	if (error)
				{
		    		return callback(error, null);
				}
				callback(null, results);
			});			
		}
	], function(error, results)
	{
    	if (error)
		{
    		return finalCallback(error, null);
		}
		finalCallback(null, constants.OK);
	});

};

//DB Record Classes
createLibraryRecord = function (data)
{
	var newEntry = {};
    newEntry.LibraryId = (new ObjectId()).toString();
    newEntry.name = data.name;
    newEntry.items = data.items;

    return newEntry;
}
