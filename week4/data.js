'use strict';

const StringDecoder = require('string_decoder').StringDecoder;

module.exports = {
    convertData: function(data) {
        data = new Buffer(data);
        var decoder = new StringDecoder('utf8');
        data = decoder.write(data);
        if (data.substr(data.length-2) == '\r\n') data = data.substr(0, data.length-2);
        return String(data);
    },
    swrite: function(chunk, tcp) {
        tcp.send(new Buffer(chunk));
    }
}