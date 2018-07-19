const fs = require('fs')
const readline = require('readline')

var myArgs = process.argv.slice(2);

const inputFileName = './input.txt'
var outputFileName = myArgs[0];
const dataStream = fs.createReadStream(inputFileName)


var rl = readline.createInterface({
	input: dataStream
});



var buffer = [];

rl.on('line', function(line){
	output = reverseLine(line); 
	fs.writeFile(outputFileName,output, function(err) {
		if(err) {
			return console.log(err);
		}
		
	})
})
.on('end', function() {
	rl.close();
})


function reverseLine(str) {
	return str.split("").reverse().join("");
}


