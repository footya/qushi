//侧边栏滚动效果
define(function (require, exports, module) {
    lib.job.create('SideBarScroll', function () {
        o = $;

        // misc junk

        o(function(){
          var width = window.innerWidth;
          var height = window.innerHeight;
          var doc = o(document);

          // .onload
          o('html').addClass('onload');

          // top link
          // o('#top').click(function(e){
          //   o('body').animate({ scrollTop: 0 }, 'fast');
          //   e.preventDefault();
          // });

          // scrolling links
          var added;
          if (doc.scrollTop() > 164) {
              if (added) return;
              added = true;
              o('body').addClass('scroll');
            } else {
              o('body').removeClass('scroll');
              added = false;
            }
          doc.scroll(function(e){
            if (doc.scrollTop() > 164) {
              if (added) return;
              added = true;
              o('body').addClass('scroll');
            } else {
              o('body').removeClass('scroll');
              added = false;
            }
          })
        })

        // active menu junk

        o(function(){
          var prev;
          var n = 0;
          
          function closest() {
            var headings = o('.charts-area,.scroll_box').map(function(i, el){
              return {
                top: o(el).offset().top,
                id: el.id
              }
            });
            var h;
            var top = o(window).scrollTop();
            var i = headings.length;
            while (i--) {
              h = headings[i];
              if (top >= h.top) return h;
            }
          }

          o(document).scroll(function(){
            var h = closest();
            if (!h) return;
            if (prev) {
              prev.removeClass('current');
              prev.parent().removeClass('current');
            }
            var a = o('a[href="#' + h.id + '"]');
            a.addClass('current');
            a.parent().addClass('current');
            prev = a;
          })
        })
    });
    lib.job.add('SideBarScroll');
});