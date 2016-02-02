"use strict";

var remote = require('remote');     //Access to the app.js's module loader.
var ipc = require('ipc');
var Menu =  remote.require('menu');


var menu = Menu.buildFromTemplate([
    {
        label: 'Electron 1',
        submenu:[
            {
                label:'Prefs',
                click:function (){
                    ipc.send('toggle-prefs');
                }
            }
        ]
    }

]);
Menu.setApplicationMenu(menu);


var div = document.createElement('div');
div.innerHTML = 'version of io.js 2 ' + process.version;
document.body.appendChild(div);

var ul = document.createElement('ul');
div.appendChild(ul);

var fs = require('fs');
fs.readdir(process.env.HOME, function(err, entries) {
    entries.forEach(function(entry) {
        if (!entry.startsWith('.')){
            var li = document.createElement('li');
            li.textContent = entry;
            ul.appendChild(li);
        }
    })

});




var contents = fs.readFileSync('./package.json', 'utf8');
var div2 = document.createElement('div');
div2.innerHTML = contents;
div.appendChild(div2);
