'use strict';

var fs = require('fs');
var url = require('url');
var subtitutions = require('./utils').subtitutions;
var getMetadata = require('./utils').getMetadata;
var endsWith = require('./utils').endsWith;

function htmlTemplate(serverPath, fileSystemPath) {

  // will apply all the substitutions in the parameter s
  // including the substitutions contained in metadata
  // return the string after replacement
  function applyTemplate(s, metadata) {
    var str = s.toString();

    function replace(oldstart) {
      if (oldstart > str.length) return "";

      var start = str.indexOf('{{', oldstart);
      var end = str.indexOf('}}', oldstart);

      if (start === -1 || end === -1 || (end <= (start+1))) {
        return str.substring(oldstart);
      }

      var name = str.substring(start+2, end).trim();
      var replacement = "";

      if (subtitutions[name] !== undefined) {
        replacement += subtitutions[name];
      }
      else if (metadata[name] !== undefined) {
        replacement += metadata[name];
      }
      else console.log("htmltemplate.js: %s not a valid substitution", name);

      return str.substring(oldstart, start) + replacement + replace(end+2);
    }

    return replace(0);
  }

  return function (req, res, next) {
    var path = url.parse(req.url).path;
    if (path.indexOf(serverPath) !== 0) return next();
    if (endsWith(path, "/")) path += "index.html";
    if (!(endsWith(path, ".html"))) return next();

    var filepath = fileSystemPath + path.substring(serverPath.length);
    var content = null;
    var metadata = null;

    try {
      // load the file
      content = fs.readFileSync(filepath, {options: "utf-8"});
      // load the metadata associated with the file (if any)
      var dirpath = filepath.substring(0, filepath.lastIndexOf('/'));
      var name = dirpath.substring(dirpath.lastIndexOf('/')+1);
      metadata = getMetadata(name);
    }
    catch (e) {
      return next();
    }

    res.send(applyTemplate(content, metadata));
  };
}

module.exports = htmlTemplate;
