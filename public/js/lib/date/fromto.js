define(function(require,exports,module){
/*
fromto(new Date("20121011"),new Date("20121012"),"day");
return 1;
*/
    //var strToDate = require('./todate');
    var fromto = function(from,to,type){
        //var dsp = dsp = strToDate(to).getTime() - strToDate(from).getTime();
        var dsp = new Date(to).getTime() - new Date(from).getTime();
        if(type == "day"){//小于60天
            dsp = parseInt(dsp/(3600*24*1000));
        }
        if(type == "week"){//小于60周
            dsp = parseInt(dsp/(3600*24*1000*7));
        }
        if(type == "month"){//小于60月
            dsp = parseInt(dsp/(3600*24*1000*30));
        }
        return dsp;
    };
    module.exports = fromto;
});