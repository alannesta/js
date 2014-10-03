var request = require('request');
// var iconv = require('iconv-lite');
var BufferHelper = require('bufferhelper')
var async = require('async');
// var Post = require('../model/Post');
// var cheerio = require('cheerio');
var currentDepth = 0;
var urlPool = [{url: "http://www.github.com/", depth: 0}];
var fetchedUrls = [], urlwithLogins = [];
var inProgress = false;

var start = new Date().getTime();
function init(){
    var process = setInterval(function(){
        crawl(currentDepth);
    }, 3000);
    // crawl();
}

function crawl(depth){
    if (urlPool.length>0&& !inProgress){
        inProgress = true;
        async.eachSeries(urlPool, function(source, callback){
            // console.log("Crawling: " + source.url + " depth: " + source.depth);
            removebyUrl(urlPool, source.url);
            fetchedUrls.push(source.url);
            var req = request(source.url, function(err, response, data){
                if (!err && response.statusCode == 200){
                    var loginForm = searchLogins(data);
                    if (loginForm){
                        console.log("login form found in: "+ source.url);
                        searchLogins(data, {print: true});
                        urlwithLogins.push(source.url);
                    }
                    var results = extractUrls(data)
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
                    console.log("Complete: " + source.url + " Depth: " + source.depth);
                }else{
                    console.log("error while fetching: "+ source.url);
                }
                // console.log(urlPool);
                callback();

            })        
        },
        function(err){
            // console.log("round finished");
            inProgress = false
            if (urlPool.length == 0){
                console.log("Crawling Complete, Times used: " + (new Date().getTime() - start))
            }
        });
    }else if(urlPool.length == 0){
        clearInterval(process);
        process.exit(code=0);
    }else{
        console.log("Already in progress, crawling again in 5 seconds");
    }
}

//fetch all urls under the domain of github.com
function extractUrls(html){
    var results = [];
    // var reg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
    // var reg = /((http:|https:)\/\/[^ \<]+github.com.*[^'">])/;
    // var reg = /(?:https|http):\/\/.*\.github\.com\S*(?=")/g
    var reg = /http:\/\/.*\.github\.com\S*(?=")/g
    // var reg = /^http:\/\/.*github\.com.*?(?=")/g
    var secondRound = /\.js$|\.png$|\.jpg$|\.css$|\.ico$|<.*?>|.gif$|.git$|\?/     //test for file extensions, too inefficient

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
function searchLogins(html, options){
    //regular expression for login forms
    var reg = /<input[^<>]*(password|username).*>/g;
    if (options&&options.print){
        console.log(html.match(reg)[0]);
        return;
    }
    return reg.test(html);
}


// function inProgress(){
//     for (var i = 0; i< urlPool.length; i++){
//         if (urlPool[i].depth === currentDepth){
//             return true;
//         }
//     }
//     currentDepth = currentDepth + 1;
//     return false
// }

function checkProgress(){
    return inProgress;
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