﻿//竞品分析用户声音
define(function (require, exports, module) {
    lib.job.create('CompeteUserSoundList', function () {
        var M = require('../m/UserSoundListModel');
        var C = require('../c/UserSoundList');
        var V = require('../v/CompeteUserSoundListView');
        var url = lib.config.debug ? "/api/product/yhsy":lib.config.apis[9];
        new C({
            model:new M({url:url}),
            view:new V({actclass:"current"})
        });
    });
    lib.job.add('CompeteUserSoundList');
});