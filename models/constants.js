var constants={};

//HTTP CODES
constants.HTTP_OK = "200";
constants.HTTP_INTERNAL_ERROR = "500";
constants.HTTP_CREATED = "201";
constants.HTTP_BAD_REQUEST = "400";

constants.BOOK_TYPE = 'book';

//COLLECTION NAMES
constants.COL_LIBRARY = 'ProfileLibrary';
constants.COL_GLOBAL_CONFIG = 'GlobalItems';

constants.ITEM_CONFIG_QUERY = {'type':'itemconfig'};

constants.PROJECTION_EXCLUDE_ITEMS = { "Libraries.items": 0};
constants.PROJECTION_INCLUDE_CUSTOM_ITEMS = {'CustomItems':1};

constants.OK = "OK";
module.exports = constants;