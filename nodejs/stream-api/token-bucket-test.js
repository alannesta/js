const TokenBucket = require('./token-bucket');

const bucket = new TokenBucket(100);

let counter = 0;


async function sleep(secs) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, secs * 1000)
    })
}

async function test() {
    if (counter === 10) {
        return Promise.resolve();
    }
    let tokens = await bucket.acquire();
    if (tokens === 0) {
        await sleep(2);
    } else {
        console.log('Tokens acquired: ', tokens);
        counter++;
    }

    await test();
}

test().then(() => {
   console.log('done');
   bucket.clearBucket();
   process.exit(0);
});