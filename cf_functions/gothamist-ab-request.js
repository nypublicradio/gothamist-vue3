var COOKIE_NAME = 'ablot'
var HEADER_NAME = 'x-gothamist-abtest'
function handler(event) {
    // NOTE: This example function is for a viewer request event trigger. 
    // Choose viewer request for event trigger when you associate this function with a distribution. 
    var request = event.request;
    var cookies = request.cookies;
    if (cookies[COOKIE_NAME]) {
        request.headers[HEADER_NAME] = { 
        value: cookies[COOKIE_NAME].value
    };
        return request;
    }
    var randomValue = Math.random() < 0.5 ? '0' : '1';
    request.headers['x-gothamist-abtest'] = { 
        value: randomValue
    };
    return request;
}