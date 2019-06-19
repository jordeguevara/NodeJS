var EventEmitter = require("events").EventEmitter;
var fs = require("fs");

// EventEmitter allows you to create functionlity and alert watchers based on event that occur in the OS
function findPattern(files, regex) {
  var emitter = new EventEmitter();
  files.forEach(function(file) {
    fs.readFile(file, "utf8", function(err, content) {
      // does not allow typicall node (err,cb) style
      if (err) return emitter.emit("error", err);

      emitter.emit("fileread", file);
      var match = null;
      if ((match = content.match(regex)))
        match.forEach(function(elem) {
          emitter.emit("found", file, elem);
        });
    });
  });
  return emitter;
}

//Usage
findPattern(["fileA.txt", "fileB.json"], /hello \w+/g)
  .on("fileread", function(file) {
    console.log(file + " was read");
  })
  .on("found", function(file, match) {
    console.log('Matched "' + match + '" in file ' + file);
  })
  .on("error", function(err) {
    console.log("Error emitted: " + err.message);
  });
