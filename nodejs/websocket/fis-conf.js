fis.match('static/**/*', {
    release: '/$0'
});

fis.match('static/scripts/*.js', {
    optimizer: fis.plugin('uglify-js'),
    useHash: true
});

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