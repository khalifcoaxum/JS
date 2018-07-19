var fs = require('fs')
var http = require('http')
var url = require('url')

var querystring  = require('querystring')

var port = 9876
var host = '127.0.0.1'

var jsonData = require('../data.json')





http.createServer(function(req,res) {
    res.writeHead(200, {'Content-Type': 'text/html'});

    var result = [];
    var queryObject = url.parse(req.url,true).query;
    for(i in queryObject) {
      var selector = queryObject[i]
      for( var j = 0; j < jsonData.length;j++) {
        if(jsonData[j].i == queryObject){
          res.end("First Name: " +jsonData[j]['firstName'] + '<br>' +  
                  "Last Name: " +jsonData[j]['lastName'] + ' <br>' +  
                  "Title: "+jsonData[j]['title']+ ' <br>' +  
                  "Email: "+jsonData[j]['email']+ ' <br>' +  
                  "Website: "+jsonData[j]['website']+ ' <br>' + 
                  "Points: "+jsonData[j]['points'])  
        }
        else {
          res.end("No Matches Found")
        }
      }
    }




 
}).listen(port,host, () => {
  console.log(`Server running at http://${host}:${port}/`)
})


function searchIndex(obj,name) {
for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if ("object" == typeof(obj[key])) {
                searchIndex(obj[key], name);
            } else if (key == name) {
                result.push(obj[key]);
            }
        }
    }
}


function parseJSON(obj) {
    var parsedData = '';
    for(var i in obj) {
        if (typeof obj[i] == 'object') {
            parsedData += parseJSON(obj[i]);
        }else {
            parsedData += i +' : '+ obj[i];
        }
        parsedData += '\n';
    }
    return parsedData;
}
  

function getObject(body) {
    var result = null;
    if(body instanceof Array) {
        for(var i = 0; i < body.length; i++) {
            result = getObject(body[i]);
            if (result) {
                break;
            }   
        }
    }
    else
    {
        for(var prop in body) {
            
            if(prop == 'id') {
                if(body[prop] == 'firstName') {
                    return body;
                }
            }
            if(body[prop] instanceof Object || body[prop] instanceof Array) {
                result = getObject(body[prop]);
                if (result) {
                    break;
                }
            } 
        }
    }
    return result;
}
