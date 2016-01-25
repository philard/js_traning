'use strict';



function emit(channel, data, currentSock) {
    for(let i=0; i<ctx.clients.length; i++) {
        if(ctx.clients[i] !== currentSock) {

            ctx.clients[i].write(data)
        }
    }
}


function clearLine() {
    let back = new Buffer([8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8], 'binary');
    let space = new Buffer('                                                                                            ', 'utf-8');
    return Buffer.concat([back, space, back]);
}


function emitLineInsertion(currentSock, ctx, inserted) {


    for(let i=0; i<ctx.clients.length; i++) {
        let itClient = ctx.clients[i];
        if(ctx.clients[i] !== currentSock) {

            if(!Buffer.isBuffer(inserted)) {
                inserted = new Buffer(inserted, 'utf-8');
            }

            let clientLineProgress = new Buffer('\r\n' + itClient.session.backlog , 'utf-8');

            let clientInstruction = Buffer.concat([clearLine(),
                inserted,
                clientLineProgress
            ]);

            itClient.write(clientInstruction);

        }
    }

}


function convertData(data) {
    data = new Buffer(data);
    var decoder = new StringDecoder('utf8');
    let decoded = decoder.write(data);

    return String(decoded);
}

function isNewLine(data) {
    return (data == '\r\n');
}





let telnetUtils = {
    emit:emit,
    emitLineInsertion:emitLineInsertion,
    convertData:convertData,
    isNewLine:isNewLine
};
module.exports = telnetUtils;
