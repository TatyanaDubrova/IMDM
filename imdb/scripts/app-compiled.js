/**
 * Created by tatsiana.dubrova on 17.08.2016.
 */
"use strict";

var _router = require("./core/router");

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// adding routes
var appRouter = new _router2.default();
appRouter.add(/movies/, renderMoviesPage).add(renderHomePage).listen();

document.addEventListener("DOMContentLoaded", ready);
document.getElementById("home-button").addEventListener("click", appRouter.navigate);
document.querySelector("#search-form").addEventListener("submit", function (event) {
    clear();
    var searchQuery = document.getElementById('query').value;
    event.preventDefault();
    getJSON('http://www.omdbapi.com/?s=' + searchQuery + '&r=json').then(function (data) {
        if (!data.Response || data.Error) {
            alert(data.Error + ' Try once more!');
        } else if (data.totalResults > 10) {
            alert("totalResults: " + data.totalResults);
            appRouter.navigate("/movies");
            var pageCount = Math.ceil(data.totalResults / 10);
            for (var i = 1; i <= pageCount; i++) {
                getJSON('http://www.omdbapi.com/?s=' + searchQuery + '&page=' + i + '&r=json').then(function (data) {
                    showResults(data.Search);
                }, function (status) {
                    alert('Something went wrong :(');
                });
            }
        } else {
            appRouter.navigate("/movies");
            showResults(data.Search);
        }
    }, function (status) {
        alert('Something went wrong :(');
    });
});

function ready() {
    //initial route
    appRouter.navigate();
};

function getJSON(url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.responseType = 'json';
        xhr.onload = function () {
            var status = xhr.status;
            if (status == 200) {
                resolve(xhr.response);
            } else {
                reject(status);
            }
        };
        xhr.send();
    });
}

function showResults(results) {
    var block = document.querySelector("#search-results ul");
    results.forEach(function (element) {
        var nodeLi = document.createElement("li");

        var nodeImg = document.createElement("img");
        nodeImg.src = element.Poster;

        var nodeDiv = document.createElement("div");
        nodeDiv.appendChild(nodeImg);

        var nodeTitle = document.createElement("h4");
        var textTitleNode = document.createTextNode(element.Title);
        nodeTitle.appendChild(textTitleNode);

        var nodeYear = document.createElement("p");
        var textYearNode = document.createTextNode("Year: " + element.Year + "  ");
        nodeYear.appendChild(textYearNode);

        var nodeType = document.createElement("p");
        var textTypeNode = document.createTextNode("Type: " + element.Type);
        nodeYear.appendChild(textTypeNode);

        nodeLi.appendChild(nodeDiv);
        nodeLi.appendChild(nodeTitle);
        nodeLi.appendChild(nodeYear);
        nodeLi.appendChild(nodeType);
        block.appendChild(nodeLi);
    });
}

function renderMoviesPage() {
    document.getElementById('search-section').style.display = 'none';
    document.getElementById('home-button').style.visibility = 'visible';
    document.getElementById('search-results').style.display = '';
}

function renderHomePage() {
    document.getElementById('home-button').style.visibility = 'hidden';
    document.getElementById('search-section').style.display = '';
    document.getElementById('search-results').style.display = 'none';
    document.getElementById("query").value = "";
}

function clear() {
    var block = document.querySelector("#search-results ul");
    block.innerHTML = "";
}

//# sourceMappingURL=app-compiled.js.map