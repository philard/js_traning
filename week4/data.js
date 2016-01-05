'use strict';

const StringDecoder = require('string_decoder').StringDecoder;

module.exports = {
    convertData: function(data) {
        data = new Buffer(data);
        var decoder = new StringDecoder('utf8');
        let decoded = decoder.write(data);

        return String(decoded);
    }
}