define(function(require,exports,module){

    
/*
 *  var d = new Date();
 *  alert(format(d,'yyyy/MM/dd hh:mm:ss'));
 *  // 2010/06/22 15:14:23
 *  
 */
    var todate = function(str){
        if ('string' != typeof str) {
            return new Date(str);
        }
        var d;
        if(str.length == 8){
            var year    = str.slice(0,4),
                month   = str.slice(4,6),
                date    = str.slice(6,8);
                d       = new Date([year,month,date].join("/"));
        }
        if(str.length == 6){
            var year    = str.slice(0,4),
                month   = str.slice(4,6);
                d = new Date([year,month].join("/"));
        }
        return d
    };

    module.exports = todate;
});