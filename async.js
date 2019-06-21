var request = require("request");
var fs = require("fs");
var mkdirp = require("mkdirp");
var path = require("path");

function spider(url, callback) {
  var filename = "nonExistingFile.txt";
  fs.exists(filename, function(exists) {
    //[1]
    if (!exists) {
      console.log("Downloading " + url);
      request(url, function(err, response, body) {
        //[2]
        if (err) {
          callback(err);
        } else {
          mkdirp(path.dirname(filename), function(err) {
            //[3]
            if (err) {
              callback(err);
            } else {
              fs.writeFile(filename, body, function(err) {
                //[4]
                if (err) {
                  callback(err);
                } else {
                  callback(null, filename, true);
                }
              });
            }
          });
        }
      });
    } else {
      callback(null, filename, false);
    }
  });
}

spider("https://www.google.com/", (err, val) => {
  if (err) console.error(err);
  console.log("im done", val);
});
