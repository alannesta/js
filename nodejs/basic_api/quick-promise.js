// nodejs does not "hang" on unresolved promise

// node v12.13.0
// async function main() {
//     await new Promise((resolve, reject) => {
//         console.log('promise that will not be unresolved');
//         // adding a pending timer will keep node process "alive"
//         // setTimeout(() => {
//         //     resolve('keep the node process ALIVE!!!')
//         // }, 2000)
//     });
//     console.log(`
//         This will never be executed is this expected?
//         Also node exits as everything is ok with exit code 0...
//       `);
// }

// node v6.9.4
// function main() {
//     let kaka = new Promise((resolve, reject) => {
//         console.log('promise that will not be unresolved without a timer');
//
//         // adding a timer
//         setTimeout(() => {
//             resolve('keep the node process ALIVE!!!');
//         }, 2000);
//     }).then(() => {
//         // this will not be called without a settimeout
//         console.log('promise resolve!!');
//     })
// }

// node v6.9.4 unhandled rejection warning
// node v12.13.0 better warning message...
function main() {
    Promise.reject(new Error('woops'));
    console.log('yeehaaaaaa');
}
main();

