/*
 * @des 时间选择
 * @author hangyongsheng
 * @version 1.0
 */
define(function (require, exports, module) {
    lib.job.create('DatePicker', function () {
        var M = require('../m/DatePickerModel');
        var C = require('../c/DatePicker');
        var V = require('../v/DatePickerView');
        new C({
            model:new M(),
            view:new V()
        });
    });
    lib.job.add('DatePicker');
});