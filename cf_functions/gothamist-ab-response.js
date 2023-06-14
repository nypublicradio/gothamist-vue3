var COOKIE_NAME = '_experiment_homepage-river';
var HEADER_NAME = 'x-gothamist-abtest';
var MAX_AGE = 30 * 24 * 60 * 60; //This equals 30 days
function handler(event) {
    var request = event.request;
    var response = event.response;
    if (request.headers[HEADER_NAME]) {
        response.cookies[COOKIE_NAME] = { 
            value: request.headers[HEADER_NAME].value,
            attributes: `Secure; Path=/; Max-Age=${MAX_AGE}`
        };
    }
    return response;
}