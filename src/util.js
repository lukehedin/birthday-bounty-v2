import $ from 'jquery';

export default {
    post: function(url, data, callbackConfig) {
        data = data || {};

        return $.ajax({
            'type': 'POST',
            'url': url,
            'contentType': 'application/json',
            'data': JSON.stringify(data),
            'dataType': 'json',
            'success': function(data) {
                if(typeof(data) === "object" && data.success === false) {
                    //Failure is handled by the failure callback, but if there is none, we do an alert
                    callbackConfig.failure
                        ? callbackConfig.failure(data)
                        : alert(data.message);
                } else {
                    if(callbackConfig.success) callbackConfig.success(data);
                }

                if(callbackConfig.complete) callbackConfig.complete(data);
            },
            'beforeSend': function(xhr) {
              // set header if JWT is set
              var bbJwt = localStorage.getItem('bb-jwt');
              if (bbJwt) xhr.setRequestHeader("bb-jwt", bbJwt);
            }
        });
    },
    loadGoogleMapsAndPlaces: function(callbackFn){
        $.getScript('https://www.google.com/jsapi', function() {
            window.google.load('maps', '3', { other_params: ['key=AIzaSyBnG2wcWi0MrBxd3wTtNCKTau-xHD_B324&libraries=places'], 
            callback: function() {
                if(callbackFn) callbackFn();
            }});
        });
    }
};