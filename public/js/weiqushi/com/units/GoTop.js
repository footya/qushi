//侧边栏滚动效果
define(function (require, exports, module){
    lib.job.create('GoTop', function(){
       $('body').append('<a href="javascript:;" class="gotop">返回顶部</a>');
       $('.gotop').click(function(evt){
          $('body').animate({ scrollTop:0}, 'fast');
          evt.preventDefault();
       });
    });
    lib.job.add('GoTop');
});