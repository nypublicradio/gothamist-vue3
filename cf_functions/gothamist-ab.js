var COHORT_SIZE = 20;

function handler(event) {
    var req = event.request;
    var lot = 1000;

    if (!req.cookies.abLot) {
        lot = Math.floor(Math.random() * 100);
        var response = {
            cookies: {
                "abLot": {
                    value: lot.toString(),
                    attributes: "Secure; Path=/; Expires='Fri, 26 May 2023 00:00:00 GMT'",
                },
            },
        };
        return response;
    }
}