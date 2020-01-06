// compare with python default args
function printCount(listName, list = []) {
    list.push('flag');
    console.log(`listName: ${listName}, count: ${list.length}`);
}

druList = [1, 2, 3];

printCount('druList', druList); //4

printCount('other list');   // 1
printCount('some list');    // 1
printCount('maybe list');   // 1
