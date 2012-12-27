//微趋势项目公用数据
define(function(require, exports, module) {
    var apiurl = "http://data.i.t.sina.com.cn";
    module.exports = {
        debug:0,//调试状态
        // apis: [//接口地址
        //         apiurl+"/microtrend/getpublicpraisechange.php",//产品分析口碑变化接口
        //         apiurl+"/microtrend/getpublicpraiseword.php",//产品分析口碑词表接口
        //         apiurl+"/microtrend/getuserarea.php",//用户细分-地区（产品、竞品）
        //         apiurl+"/microtrend/getusersrc.php",//用户细分-来源（产品、竞品）
        //         apiurl+"/microtrend/getusertype.php",//用户细分-类型（产品、竞品）
        //         apiurl+"/microtrend/getuseractivity.php",//用户细分-活跃度（产品、竞品）
        //         apiurl+"/microtrend/getusergender.php",//用户细分-性别（产品、竞品）
        //         apiurl+"/microtrend/getuserage.php",//用户细分-年龄（产品、竞品）
        //         apiurl+"/microtrend/getweiboinfluence.php",//微博影响力
        //         apiurl+"/microtrend/getuservoice.php",//用户声音（产品、竞品）
        //         apiurl+"/microtrend/getcompetechange.php",//竞品分析口碑变化接口
        //         apiurl+"/microtrend/getcompetewordstrip.php",//竞品分析口碑词表-条状图
        //         apiurl+"/microtrend/getcompetewordpie.php"//竞品分析口碑词表-饼状图
        //       ],
        apis:[
            "http://qushi.udc.weibo.com/analysis/trend",
            "http://qushi.udc.weibo.com/analysis/words",//产品分析口碑词表接口
            "http://qushi.udc.weibo.com/analysis/users?tag=area",//用户细分-地区（产品、竞品）
            "http://qushi.udc.weibo.com/analysis/users?tag=source",//用户细分-来源（产品、竞品）
            "http://qushi.udc.weibo.com/analysis/users?tag=type",//用户细分-类型（产品、竞品）
            "http://qushi.udc.weibo.com/analysis/users?tag=activity",//用户细分-活跃度（产品、竞品）
            "http://qushi.udc.weibo.com/analysis/users?tag=gender",//用户细分-性别（产品、竞品）
            "http://qushi.udc.weibo.com/analysis/users?tag=age",//用户细分-年龄（产品、竞品）
            "http://qushi.udc.weibo.com/analysis/dynamic",//微博影响力
            "http://qushi.udc.weibo.com/analysis/feedback",//用户声音（产品、竞品）
            "http://qushi.udc.weibo.com/analysis/compare_trend",//竞品分析口碑变化接口
            "http://qushi.udc.weibo.com/analysis/compare_words_strip",//竞品分析口碑词表-条状图
            "http://qushi.udc.weibo.com/analysis/compare_words_pis"//竞品分析口碑词表-饼状图
        ],
        pids: [
            {//pid对应关系
                name: "微博",
                type: 1
            }, {
                name: "微吧",
                type: 1
            }, {
                name: "微刊",
                type: 1
            }, {
                name: "微博桌面",
                type: 1
            }, {
                name: "微博webIM",
                type: 1
            }, {
                name: "人人",
                type: 2
            }, {
                name: "QQ空间",
                type: 2
            }, {
                name: "腾讯微博",
                type: 2
            }, {
                name: "百度贴吧",
                type: 2
            }, {
                name: "天涯",
                type: 2
            }, {
                name: "猫扑",
                type: 2
            }, {
                name: "花瓣",
                type: 2
            }, {
                name: "美丽说",
                type: 2
            }, {
                name: "蘑菇街",
                type: 2
            }, {
                name: "人人桌面",
                type: 2
            }, {
                name: "微博AIR",
                type: 2
            }, {
                name: "皮皮时光机",
                type: 2
            },{
                name: "微博IOS",
                type: 1
            },{
                name: "微博android",
                type: 1
            },{
                name: "weico",
                type: 2
            },{
                name: "weico for android",
                type: 2
            },{
                name: "微格",
                type: 2
            },{
                name: "随享",
                type: 2
            }
            ],
        citys:{//城市对应表
                "31":"上海",
                "53":"云南",
                "100":"其他",   
                "11":"北京",    
                "71":"台湾",    
                "22":"吉林",    
                "51":"四川",    
                "12":"天津",    
                "64":"宁夏",    
                "34":"安徽",    
                "37":"山东",    
                "14":"山西",    
                "44":"广东",    
                "45":"广西",    
                "65":"新疆",    
                "-1":"未知",    
                "32":"江苏",    
                "36":"江西",    
                "13":"河北",    
                "41":"河南",    
                "33":"浙江",    
                "46":"海南",    
                "42":"湖北",
                "43":"湖南",
                "82":"澳门",
                "62":"甘肃",
                "35":"福建",
                "54":"西藏",
                "52":"贵州",
                "21":"辽宁",
                "50":"重庆",
                "61":"陕西",
                "63":"青海",
                "81":"香港",
                "23":"黑龙江",
                "15":"内蒙古",
                "400":"海外"
            },
        usertypes:{//等级对应表
            //"l0":"新手注册",
            "l1":"普通",
            "l2":"达人",
            "l3":"认证橙V",
            "l4":"认证蓝v用户",
            "l5":"收费用户会员"
        },
        useractivitys:{//活跃度对应表
            "h0":"新注册用户",
            "h1":"低频用户",  
            "h2":"中低频用户",
            "h3":"中频用户",  
            "h4":"中高频率用户",
            "h5":"高频用户",
            "N" :"其他"
        },
        usersexs:{//用户性别
            "1":"男",  
            "2":"女",  
            "0":"未知"
        },
        userages:{//用户年龄
            "0-8":"8岁以下", 
            "8-17":"8-17岁",
            "9-16":"9-16岁",
            "18-24":"18-24岁", 
            "25-30":"25-30岁",
            "31-35":"31-35岁",
            "36-40":"36-40岁",
            "41-50":"41-50岁",
            "51-60":"51-60岁",
            "60":"60岁以上",
            "100":"其他"
        }
    }
});