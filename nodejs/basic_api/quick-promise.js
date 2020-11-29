// nodejs does not "hang" on unresolved promise
async function main() {
    await new Promise((resolve, reject) => {
        console.log(42);
        // setTimeout(() => {
        //     resolve('lol')
        // }, 2000)
    });
    console.log(`
        This will never be executed is this expected?
        Also node exits as everything is ok with exit code 0...
      `);
}

main();