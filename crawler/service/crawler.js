var request = require('request');
// var iconv = require('iconv-lite');
var BufferHelper = require('bufferhelper')
// var FeedParser = require('feedparser')
// var Post = require('../model/Post');
// var cheerio = require('cheerio');
var url = "http://github.com/";
var currentDepth = 0;
var urlPool = [{url: "http://github.com/", depth: 0}];
var fetchedUrls = [], urlwithLogins = [];

function init(){
    fetchContent({url: "http://github.com/", depth: 0}, 0, function(){

    });
    setInterval(function(){
        crawl(currentDepth);
    }, 10000);
}

function crawl(depth){
    if (urlPool.length>0 && !inProgress()){
        console.log("-----------------------------------");
        console.log('Start Crawling: ');
        console.log("Task in queue: ");
        console.log(urlPool);
        console.log("currentDepth: " + currentDepth);
        // console.log("History: " + fetchedUrls);
        urlPool.forEach(function(source,index){
            fetchContent(source, currentDepth, function(){

            })
        })
    }else{
        console.log("-----------------------------------");
        console.log('Crawling already in progress or task queue is empty try again after 5 seconds');
        console.log("Task in queue: ");
        console.log(urlPool);
        console.log("currentDepth: " + currentDepth);
    }
}

function fetchContent(source, depth, callback){
    // var counter = 0
    if (source.depth === depth){
        console.log("Crawling: " + source.url + " depth: " + source.depth);
        var req = request(source.url, function(err, response, data){
            if (!err && response.statusCode == 200){
                var loginForm = searchLogins(data);
                if (loginForm){
                    console.log("login form found in: "+ source.url);
                    urlwithLogins.push(source.url);
                }
                var results = extractUrls(data)
                // console.log('url extracted: ' + results);
                    if (results && results.length>0){
                        results.forEach(function(url, index){
                        if (typeof url != "undefined" && fetchedUrls.indexOf(url) < 0){
                            urlPool.push(
                            {   
                                url: url, 
                                depth: source.depth+1
                            });
                        }
                    })
                }

                // callback(null, data);
            }else{
                console.log("error while fetching: "+ source.url);
                

                callback(err, null);
            }
            removebyUrl(urlPool, source.url);
            fetchedUrls.push(source.url);
        })
    }
}

//fetch all urls under the domain of github.com
function extractUrls(html){
    var results = [];
    // var reg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
    // var reg = /((http:|https:)\/\/[^ \<]+github.com.*[^'">])/;
    var reg = /(?:https|http):\/\/.*\.github\.com\S*(?=")/g

    // var reg = /^http:\/\/.*github\.com.*?(?=")/g
    var secondRound = /\.js$|\.png$|\.jpg$|\.css$|\.ico$|<.*?>|.gif$|.git$/     //test for file extensions, too inefficient

    var firstrountResult = html.match(reg) || []

    firstrountResult.forEach(function(url, index){
        // console.log(url + "-->test: " + secondRound.test(url))
        if (url&&!secondRound.test(url)){
            results.push(url);
        }
    });
    // console.log("after second round: " + results);
    return results;
}

//search for login forms in the page
function searchLogins(html){
    //regular expression for login forms
    var reg = /<input[^<>]*password.*>/;
    return reg.test(html);
}

function inProgress(){
    for (var i = 0; i< urlPool.length; i++){
        if (urlPool[i].depth === currentDepth){
            return true;
        }
    }
    currentDepth = currentDepth + 1;
    return false
}

function removebyUrl(arr, value){
    var i = arr.length;
    while(i--){
        if(arr[i].url === value) {
            arr.splice(i,1);
        }
    }
    return arr;
}

init();



// exports.fetchContent = fetchContent;