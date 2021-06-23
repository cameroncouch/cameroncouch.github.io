"use strict";

var jsonResponse;

try {
    var response = fetch('service-shelf/configuration.json')
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network Error');
        })
        .then((json) => {
            jsonResponse = json;
        })
} catch (error) {
    console.log(error);
}