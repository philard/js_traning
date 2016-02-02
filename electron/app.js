"use strict";
var app = require('app');
var BrowserWindow = require('browser-window');
var client = require('electron-connect').client;
var ipc = require('ipc');

app.on('ready', function() {
    var mainWindow = new BrowserWindow({
        width:400,
        height:600
    });
    mainWindow.loadUrl('file://' + __dirname + '/main.html');
    mainWindow.openDevTools();



    var prefsWindow = new BrowserWindow({
        width: 800,
        height: 400,
        show: false
    });

    prefsWindow.loadUrl('file://' + __dirname + '/prefs.html');
    prefsWindow.openDevTools();

    ipc.on('toggle-prefs', function() {
        if(prefsWindow.isVisible())
            prefsWindow.hide();
        else
            prefsWindow.show();
    });


    client.create(mainWindow);//hot reloading https://www.npmjs.com/package/electron-connect

});