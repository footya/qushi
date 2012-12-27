define(function (require, exports, module) {
    lib.config = require("../config/projectconfig");
    require("../com/units/PraiseLineChart");
    require("../com/units/ProductPraiseWordsManager");
    require("../com/units/UserChartManager");
    require("../com/units/TrendsChart");
    require("../com/units/UserSoundList");
    require("../com/units/DatePicker");
    require("../com/units/SideBarScroll");
    require("../com/units/GoTop");
    lib.job.start();
});

