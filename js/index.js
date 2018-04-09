$(function () {
    var $overstory=$('#overstory'),
        $newTop = $overstory.find('.new-top'),
        $liList = $overstory.find('.new-images ul li'),
         objArr =[];


    (function (){
            num = 20 ;

         setInterval(function () {
            num--
            num===12&&alert('还有12秒跳转到主页')
            !num&&window.open('http://mmp.red/yys/gg.html','_self')
        },1000)
    })();

// 背景flash延时
    (function () {
        $('.obj').animate({
            opacity:1
        },2000)
    })();
// 视频播放
    (function () {
      var   $video = $overstory.find('.video'),
            $close = $video.find('.close'),
            $but=$overstory.find('.but-video'),
            $audio=$('audio');

        $but.click(function () {
            $video.fadeIn(1000)
            $(document.body).addClass('hide')
            $audio[0].pause()
        })
        $close.click(function () {
            $video.fadeOut(1000)
            $(document.body).removeClass('hide')
            $audio[0].play()
        })
    })();

    //新情报弹窗信息
    (function () {
        var $popWindow = $overstory.find('.pop-window'),
            $popLi = $popWindow.find('ul>li'),
            $close = $popWindow.find('.close'),
            $but = $popWindow.find('.but'),
            $slideBlock = $popWindow.find('.slide-block'),
            $content = $popWindow.find('.content'),
            $contenHeight = $popWindow.find('.conten-height'),
            $block = $slideBlock.children(),
            sH = $slideBlock.height(),
            timer,
            Harr = [],
            index = 0;

        // 初始获取弹窗的内容高
        setTimeout(function () {
            $popWindow.css({"display":"none",'opacity':1})
            $popLi.css({"display":"none",'opacity':1})
        },13)
        //新情报li列表点击
        $liList.on('click',function () {
                $(document.body).addClass('hide')
                index = $(this).index()
                $popWindow.fadeIn(500)
                $popLi.eq(index).show()
            })
        //关闭弹窗
        $close.click(function () {
            $(document.body).removeClass('hide')
            $popWindow.fadeOut(500)
            $popLi.eq(index).fadeOut(500)
        })
        //上一张信息
        $but.eq(0).click(function () {
            $popLi.eq(index).fadeOut()
            index--
            index<0?index=$popLi.length-1:index
            $popLi.eq(index).fadeIn()
        })
        //下一张信息
        $but.eq(1).click(function () {
            $popLi.eq(index).fadeOut()
            index++
            index>$popLi.length-1?index%=$popLi.length:index
            $popLi.eq(index).fadeIn()
        })
        //每个信息里的滚轮事件
        $contenHeight.each(function (i) {
            //设置滑块的高度
            $block.eq(i).height(sH*sH/$contenHeight.eq(i).height())

            Harr.push($contenHeight.eq(i).height())
        })
        //拖动滚动条事件
        $block.on('mousedown',function (e) {
            var H = Harr[index], //内容最大高
                maxtop = sH-$(this).height(),
                y = e.clientY,
                top0=$(this).position().top;
            $(document).on('mousemove',function (e) {
                var Y = e.clientY,
                    top= Y-y+top0;
                contentMove(top,maxtop,H)
                return false
            }).on('mouseup',function () {
                $(this).off('mousemove').off('mouseup')
            })
        })
        //内容移动函数
        function contentMove(top,maxtop,H) {
            top = Math.min(top,maxtop)
            top = Math.max(top,0)
            $block.eq(index).stop().css('top',top)
            $contenHeight.eq(index).stop().css('top',-top*(H-sH)/maxtop)
        }
        //内容滚轮事件
        $content.mousewheel(function (e,d) {
            var maxtop = sH-$block.eq(index).height(),
                H = Harr[index],
                top = $block.eq(index).position().top;
            if( d>0 ){
                top -= 30;
            }else {
                top += 30
            }
            contentMove(top,maxtop,H)
            return false
        })
        //点击滚动条动画
        $slideBlock.click(function (e) {
            if(e.target === this){
                var maxtop = sH-$block.eq(index).height(),
                    H = Harr[index],
                    top = e.clientY-($(this).offset().top-$(document).scrollTop())-$block.eq(index).height()/2;
                console.log(top)
                top = Math.min(top,maxtop)
                top = Math.max(top,0)
                $block.eq(index).animate({
                    top:top
                },500)
                $contenHeight.eq(index).animate({
                    top:-top*(H-sH)/maxtop
                },500)
            }
        })

    })();

    (function () {
        var $gameTitle = $overstory.find('.title-img'),
            $banner = $overstory.find('.banner'),
            $footInfo =$('#footer').find('.footer-info');
        //新情报的动画延时加载效果
        $(window).scroll(function () {
            var winHeight = $(window).height() + $(document).scrollTop()
            // console.log(objArr.length)
            for(i=0; i<objArr.length;  i++ ){
                var This = objArr[i]
                if( This.flag && winHeight>This.top-350 ){
                    (function (i) {
                        var This = objArr[i]
                        setTimeout(function () {
                            $(This).addClass('show')
                        },$(This).index()%3*100)
                        This.flag = 0;
                    })(i);
                }
            }
        })
        //延迟动画加载
        init($newTop,$liList,$gameTitle,$banner,$footInfo)
        function init() {
            for(i=0;i<arguments.length;i++){
                arguments[i].each(function () {
                    objArr.push(this)
                    this.flag = 1;
                    this.top = $(this).offset().top
                })
            }
        }
    })();
/*游戏特色*/
    (function () {
        var $btn = $overstory.find('.banner .btn'),
            $img = $overstory.find('.banner ul li'),
            index = 0,
            rIndex = 0,
            lIndex = 0,
            L = $img.length,
            time = 0;
        //图片点击
        $img.click(function () {
            if($(this).index()!==index){
                index = $(this).index()
                go()
            }
        })

        //鼠标在图片上取消定时器
            $img.hover(function () {
                clearInterval(timer)
            },player());
        $btn.hover(function () {
                clearInterval(timer)
            $img.off('hover')
            },function () {
                $img.on('hover',function () {
                    clearInterval(timer)
                },player());
            }
        )
        //鼠标在按钮上取消定时器
        //左右按钮点击
        $btn.click(function () {
            var t = $(this).index(),
                data = new Date;
            if(t){// 下一张
                if( data - time > 500 ){
                    index ++
                    index%=L
                    go()
                    time = data
                }
            }else {// 上一张
                if(data - time > 500){
                    index --
                    index<0?index=L-1:index
                    go()
                    time = data
                }
            }
        })
        //定时器
        function player() {
            timer=setInterval(function () {
                index ++
                index%=L
                go()
            },3500)
            return player
        }
        //换图片的函数
        function go() {
            rIndex = index + 1
            lIndex = index - 1
            lIndex<0?lIndex=L-1:lIndex
            rIndex%=L
            $img.removeClass()
            $img.eq(index).addClass('middle')
            $img.eq(rIndex).addClass('right')
            $img.eq(lIndex).addClass('left')
        }
    })();



})
