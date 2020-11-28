const fs = require('fs');
const Transform = require('stream').Transform;
const TokenBucket = require('./token-bucket');

class ThrottleStream extends Transform {
    constructor(rate) {
        super();
        this.bufferedChunks = null;
        // this.transfromedChunkPos = 0;
        this.tokenBucket = new TokenBucket(rate); // the rate that data will flow through the stream
    }

    async _transform(chunk, encoding, callback) {
        this.bufferedChunks = chunk;
        await this._processChunks(chunk, encoding, callback, 0);
    }

    async _processChunks(chunk, encoding, callback, startPos) {
        // console.log('process chunk...');
        let done = false;

        let tokens = await this.tokenBucket.acquire();
        if (tokens === 0) {
            await this._sleep(1);
            await this._processChunks(chunk, encoding, callback, startPos)
        } else {
            // console.log('tokens acquired: ', tokens);

            let endPos = this.bufferedChunks.length;

            if (startPos + tokens < endPos) {
                endPos = startPos + tokens
            } else {
                done = true;
            }

            let data = this.bufferedChunks.slice(startPos, endPos); // endPos is not inclusive

            this.push(data);

            if (done) {
                console.log('all done');
                callback(null);
            } else {
                await this._processChunks(chunk, encoding, callback, endPos + 1)
            }

        }
    }

    async _sleep(secs) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, secs * 1000)
        })
    }

}

let throttle = new ThrottleStream(500);

fs.createReadStream('./mock/1.log').pipe(throttle).pipe(process.stdout);


