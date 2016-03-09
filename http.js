(function() {
    'use strict';

    function http(url, method) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open(method, url, true);
        xhr.send();

        var promise = new Promise(function(resolve, reject) {
            xhr.onreadystatechange = function() {
                if (xhr.readyState !== XMLHttpRequest.DONE) {
                    return;
                }

                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response);
                } else {
                    var err = new Error(xhr.response.message);
                    err.code = xhr.status;
                    reject(err);
                }
            };
        });

        return promise;
    }

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
        module.exports = http;
    else
        window.http = http;

}());
