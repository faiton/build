var extend = require('yiwn-extend');

module.exports = Build;

function Build(tree, options) {
    if (!(this instanceof Build)) return new Build(tree, options);

    this.tree = tree;
    this.options = options || {};
}

Build.prototype.set = function (key, value) {
    this.options[key] = value;
    return this;
}

;[
    'scripts',
].forEach(function (type) {
    var obj = require('./' + type);
    Object.keys(obj).forEach(function (name) {
        Build.prototype[name] = obj[name];
    });
})

var types = [
        'files',
        'styles'
    ];

types.forEach(function(type){
    var obj = require('faiton-build-' + type);
    extend(Build.prototype, obj);
});

Build.scriptPlugins = Build.prototype.scriptPlugins;
Build.stylePlugins = Build.prototype.stylePlugins;
Build.filePlugins = Build.prototype.filePlugins;
