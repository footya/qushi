/*
 * @des 竞品分析口碑词表加权按钮
 * @author hangyongsheng
 * @version 1.0
 */
define(function (require, exports, module) {
    module.exports = lib.Class('PraiseWordsManager',{
        construct: function () {
            this._weight   = $("#i_piechart_weight");//加权
            this._download = $("#j-down-kbcb");//下载
            this._formipt  = $("#j-from-date-input");//开始时间
            this._toipt    = $("#j-to-date-input");//结束时间
            this.init();
        },
        methods:{
            init:function (ctrl) {
                this._ctrl = ctrl;
                this.bindEvent();
            },
            bindEvent:function(){
                var _this = this;
                this._bindIsWeightCheckbox();
                lib._PAGE_EVENT.on('g_datepicker_change_for_all',function(){
                    _this._changeDownLink();
                });
            },
            //下载
            _changeDownLink:function(){
                var href = this._download.attr("href");
                var url = new lib.url(href).url;
                url = url || lib.config.apis[1];
                var params = this.getParam();
                var query = [];
                params.download = 1;
                for(var k in params){
                    query.push(k+"="+params[k]);
                }
                this._download.attr("href",url+"?"+query.join("&"));
            },
            //加权操作
            _bindIsWeightCheckbox:function(){
                var _this = this;
                this._weight.on('click', function(e) {
                    var _target = e.target || e.srcElement;
                    if(_target.checked){
                        _target.value = 1;
                    }else{
                        _target.value = 0;
                    }
                    lib._PAGE_EVENT.fire({"type":"g_praisewordsmanager_for_praisewordscharts"});
                    _this._changeDownLink();
                });
            },
            getParam:function() {
                var pid     = new lib.url(window.location.href).getParam("id");
                var _params = {};
                _params["from"] = this._formipt.val().replace(/\-/gi,"");
                _params["to"]   = this._toipt.val().replace(/\-/gi,"");
                _params["is_weight"] = this._weight.val();
                _params["type"]  = "yelp,good,bad";
                _params["pid"]   = pid;
                //[todo]需要当用户选择的时间范围为 92天内（3month），使用日数据进行计算。
                //当用户超过92天，但小于 731天（2year），使用周数据进行计算。 
                //当用户超过731天（2year），提示用户修改时间。
                _params["datetype"] = "day";
                return _params;
            }
        }
    });
});
