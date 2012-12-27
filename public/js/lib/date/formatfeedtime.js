define(function(require,exports,module){
    var MTEXT = "月";
    var DTEXT = "日";
    var TODAYTEXT = "今天";
    var BSTEXT = "秒前";
    var BMTEXT = "分钟前";
    var format = function(dServerTime, dFeedTime){
        var server_year = dServerTime.getFullYear();
        var feed_year = dFeedTime.getFullYear();
        
        var server_month = dServerTime.getMonth() + 1;
        var feed_month = dFeedTime.getMonth() + 1;
        
        var server_day = dServerTime.getDate();
        var feed_day = dFeedTime.getDate();
        
        var server_hour = dServerTime.getHours();
        var feed_hour = dFeedTime.getHours();
        if(feed_hour < 10) feed_hour = "0" + feed_hour;
        var feed_minute = dFeedTime.getMinutes();
        if(feed_minute < 10) feed_minute = "0" + feed_minute;
        
        var diff_time = dServerTime - dFeedTime;
        diff_time = diff_time > 0 ? diff_time : 0;
        diff_time = diff_time/ 1000;
        
        if (server_year != feed_year) {
            return feed_year + '-' + feed_month + '-' + feed_day + ' ' + feed_hour + ':' + feed_minute;
        } else 
            if (server_month != feed_month || server_day != feed_day) {
                return feed_month + MTEXT + feed_day + DTEXT + feed_hour + ':' + feed_minute;
            } else if (server_hour != feed_hour && diff_time > (60 * 60)) {
                    return TODAYTEXT + feed_hour + ':' + feed_minute;
                } else if(diff_time < 51){
                    diff_time = diff_time < 1 ? 1 : diff_time;
                    return (Math.floor((diff_time - 1) / 10) + 1) + "0" + BSTEXT;
                } else {
                    return Math.floor((diff_time / 60) + 1) + BMTEXT;
                }
        return '';
    }
    module.exports = format;
});