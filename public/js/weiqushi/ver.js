//版本相关
define(function(require,exports,module){
    var config = require('./config/config');
    module.exports={
        loadJob: function(a, b) {
            var basePath = "/js/";//"http://127.0.0.1/js/";
            //config.projectDebug && (basePath = "", config.projectVersion = "");
            var d = [basePath 
                    + config.projectName + (config.projectName ? "/" : "") 
                    + config.projectVersion + (config.projectVersion ? "/" : "") + "jobs/" + a + ".js"];
            seajs.use(d, b ||
            function() {})
        },
        _VERSION: config.projectVersion
    };
});