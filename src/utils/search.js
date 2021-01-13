/*
var strSearch = "start with text here";
var strlength = strSearch.length;
var strFrontCode = strSearch.slice(0, strlength - 1);
var strEndCode = strSearch.slice(strlength - 1, strSearch.length);

var startcode = strSearch;
var endcode = strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);

db.collection(c)
  .where("foo", ">=", startcode)
  .where("foo", "<", endcode);
*/
