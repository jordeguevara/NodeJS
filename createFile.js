var fs = require('fs')

content = "var hello = 'hello world'; console.log(hello);"

inputFile = process.argv[2]; // the input from the command lines starts at 2

fs.writeFile(inputFile, content , (err) => {
	if (err) 
		throw err;
  console.log("file made:" + content);
});