// token bucket implementation for stream throttle
class TokenBucket {
    /**
     * constructor
     * @param rate {int} token generation rate in terms of tokens/second
     * @param maxSize {int} max tokens allowed
     */
    constructor(rate, maxSize=undefined) {
        this.rate = rate;
        if (maxSize) {
            this.maxSize = maxSize;
        } else {
            this.maxSize = rate * 10; // store 10 seconds worth of tokens
        }

        this.tokenCount = 0;
        this.lastTokenCount = 0;
        // ticks per second. Tokens will be generated each tick. The larger the value, the better the granularity
        this.tick = 4;
        this.refreshTimer = null;

        // when the token bucket is initialized, if we don't start the timer, the token bucket will be "cold"
        // the first call to "acquire" will always return false since no token has been generated yet.
        this.warm = false;

    }

    async acquire() {
        if (!this.warm) {
            this._initBucket();
            await this._sleep(1);
            this.warm = true;
        }
        let result = this.tokenCount - this.lastTokenCount;
        this.lastTokenCount = this.tokenCount;
        return Math.min(result, this.maxSize);
    }

    async _sleep(secs) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, secs * 1000)
        })
    }

    _initBucket() {
        const timerRate = 1000 / this.tick;
        this.refreshTimer = setInterval(() => {
            // console.log('bucket: add token');
            this.tokenCount = this.tokenCount + this.rate / this.tick;
        }, timerRate);
    }

    clearBucket() {
        clearInterval(this.refreshTimer);
        this.tokenCount = 0;
    }
}

module.exports = TokenBucket;