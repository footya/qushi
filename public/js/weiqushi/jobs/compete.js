define(function (require, exports, module) {
    lib.config = require("../config/projectconfig");
    require("../com/units/CompetePraiseLineChart");
    //require("../com/units/PraisePieChart");
    require("../com/units/CompetePraiseWordsManager");//口碑词表
    //require("../com/units/PraiseStackChart");
    require("../com/units/CompeteUserChartManager");
    //require("../com/units/PraiseBubbleChart");
    //require("../com/units/TrendsChart");
    require("../com/units/CompeteUserSoundList");
    require("../com/units/DatePicker");
    require("../com/units/SideBarScroll");
    require("../com/units/GoTop");
    lib.job.start();
});

