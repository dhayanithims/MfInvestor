import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Config } from '../Config.js'

axios.defaults.baseURL = Config.serviceUrl;

export function sendPost(url, message, successCallback, failureCallback) {
    if (Config.isMock) {
        successCallback(message, { sessionKey: 'abcdezyxwv' });
        return;
    }
    axios.post(url, message).then(response => {
        successCallback(response.data);
    }).catch((response) => { failureCallback(response.message)});
}

export function sendGet(urlPath, successCallback, failureCallback) {
    axios
        .get(urlPath)
        .then(response => {
            successCallback(response.data);
        }).catch((response) => { failureCallback(response.message) });
}