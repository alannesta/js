async function work() {
    try {
        res = await fetcher();
    } catch (e) {
        console.log('error: ', e);
    }

}

function fetcher() {
    return new Promise((resolve, reject) => {
        setTimeout(async() => {
            try {
                kaka = Math.random();
                return reject(kaka);  // need to return here

                // reject(kaka);
                // console.log('still working...');
                // resolve('done');
            } catch (e) {
                reject(e);
            }

        }, 1000);
    });
}

work().then(() => {
    process.exit(0);
});