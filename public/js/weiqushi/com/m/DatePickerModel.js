/*
 * @des 时间选择
 * @author hangyongsheng
 * @version 1.0
 */
define(function(require,exports,module){
    var Model = require('./model');
    module.exports = lib.Class('DatePickerModel',{
        ns:'lib.m',
        extend:Model,
        construct:function(){
            this.callsuper();
        },
        methods:{
            checkDate:function(param,fn) {
                var from = param.from;
                var to = param.to;
                var type = param.type;
                if(from == "" || to == ""){
                    fn({"msg":'起至时间不能为空!',"code":"000000"});
                    return;
                }
                var dsp = this._fromto(from,to,type);
                if(dsp>60){
                    var chart = {"week":"周","day":"天","month":"月"};
                    fn({"msg":'时间范围不能超过60'+chart[type],"code":"000000"});
                    return;
                }
                
                fn({"msg":'成功',"code":"100000"});
            },
            _fromto:function(from,to,type){
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
            }
       }
});
});