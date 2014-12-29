// Simulates the CSS Validator

var express = require('express');
var validator = module.exports = express();

validator.get('/css-validator/validator', function (req, res) {
  var uri = req.param("uri") || "";
  var profile = req.param("profile") || "css3";
  var today = new Date();
  var errors = [{
    "source" : uri,
    "context" : ".ds",
    "type" : "value",
    "message" : "inline-box is not a display value : "},
    {"source" : req.param("uri"),
    "context" : ".kd-button-submit",
    "type"    : "value",
    "message" : "top is not a color value"}];
  var warnings = [{
    "source"  : uri,
    "line"    : 0,
    "message" :  "Property -moz-border-radius is an unknown vendor extension",
    "type"    :  "vendor-extension",
    "level"   : 0},
    {"source"  : uri,
    "line"    : 0,
    "message" :  "Property -webkit-border-radius is an unknown vendor extension",
    "type"    :  "vendor-extension",
    "level"   : 0}];
  var json = {
    "cssvalidation" : {
      "uri"       : uri,
      "checkedby" : "http://www.w3.org/2005/07/css-validator",
      "csslevel"  : profile,
      "date"      : today.toISOString(),
      "timestamp" : ""+today.getTime(),
      "validity"  : true,
      "result"    : {
        "errorcount"   : 0,
        "warningcount" : 0
      }
    }
  };

  if (uri.indexOf("csserror") != -1) {
    json.cssvalidation.validity = false;
    json.cssvalidation.errors = errors;
    json.cssvalidation.result.errorcount = errors.length;
  }
  if (uri.indexOf("csswarning") != -1) {
    json.cssvalidation.warnings = warnings;
    json.cssvalidation.result.warningcount = warnings.length;
  }
  return res.jsonp(json);
});
