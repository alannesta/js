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
            return await this._processChunks(chunk, encoding, callback, startPos)
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
                console.log('all done, push null byte, callback');
                // this.push(null);
                callback(null);
                console.log('clear token bucket');
                // clear the token bucket timer, otherwise node process will not exit
                this.tokenBucket.clearBucket();
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

throttle.on('finish', () => {
    console.log('writable stream(input) finish');
});

throttle.on('end', () => {
    console.log('readable stream(output) end')
});

fs.createReadStream('./mock/1.log').pipe(throttle).pipe(process.stdout);
// fs.createReadStream('./mock/1.log').pipe(process.stdout);


