fis.match('static/scripts/*.js', {
    optimizer: fis.plugin('uglify-js'),
    useHash: true
});

// ignore jade templates. because fis3 cannot update jade template script link
fis.match('*.jade', {
    release: false
});

fis.match('.gitignore', {
    release: '/$0'
});


fis.match('.bowerrc', {
    release: '/$0'
});

fis.match('package.json', {
    release: false
});