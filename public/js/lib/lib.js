define(function(require,exports,module){
    var global = require('./global');
    global.lib = global.WeiBo || {};
    lib.Class = require('./class');
    var __job = require('./job');
    var __event = require('./event');
    lib.url = require('./url/url');
    lib.job = new __job();
    lib._PAGE_EVENT = new __event();
    lib.log = function(data) {
        if (window.console){
            console.log(data);
        }
        else{
            return;
        }
    };
    module.exports = lib;
});