
$(function () {
    var $header = $('#header'),
        $nav = $header.find('.nav'),
        $Body = $('#body-content');
    //导航栏移入鼠标显示
    (function () {
        var $triangle = $header.find('.triangle');
        $triangle.hover(function () {
            $nav.addClass('bgRgba0-5')
        },function () {
            if(!$(document).scrollTop()){
                $nav.removeClass('bgRgba0-5')
            }
        })
    })();
    //窗口滚动
    (function () {
        $(window).scroll(function () {
            var $logo = $header.find('.var-l'),
                $bigLogo = $header.find('.bigLogo');
            if($(document).scrollTop()){
                $nav.addClass('bgRgba0-5').css('position','fixed')
                $bigLogo.addClass('scale')
                $logo.css('opacity',1)
            }else {
                $nav.removeClass('bgRgba0-5').css('position','absolute')
                $logo.css('opacity',0)
                $bigLogo.removeClass('scale')
            }
        })
    })();
//    人物动画
    (function () {
        var $roleLi1 = $header.find('.role ul .role1'),
            $roleLi2 = $header.find('.role ul .role2'),
            r1 = $roleLi1.eq(0),
            r2 = $roleLi1.eq(1),
            $btn = $header.find('.role .btn'),
            time =0,
            flag = true;

        role1Go(r1,r2,$roleLi2,500)
        $btn.click(function () {
            if(new Date - time >600 ){
                flag?role1Go($roleLi2.eq(0),$roleLi2.eq(1),$roleLi1,500):role1Go(r1,r2,$roleLi2,500)
                flag = !flag
                time = new Date
            }
        })
        function role1Go(q1,q2,r,n) {
            r.stop().removeClass()
            q1.stop().delay(n).queue(function () {
                q1.addClass('L270')
            })
            q2.stop().delay(n).queue(function () {
                q2.addClass('R270')
            })
        }
    })();
//    青蛙弹窗服务器
    (function () {
        var  $frog = $header.find('.frog'),
             $popServer = $frog.children('.pop-server'),
            $p = $popServer.children('p'),
             $close = $p.children('span');
        $frog.click(function () {
            Transform(100,1,'fixed',.5)
        })
        $close.click(function () {
            Transform(17,0,'absolute',0)
            return false
        })
        function Transform(n,x,type,a) {
            $frog.css('zIndex',n)
            $popServer.css({'transform':'scale('+x+')',
                'position':type,
                'backgroundColor':'rgba(255,255,255,'+a+')'
            })
        }
    })();

//    新闻公告 和 轮播部分 人物列表切换
    (function () {
        var $u1 = $Body.find('.u1'),
            $u2Li = $Body.find('.u2 li'),
            liWidth = $u1.children(0).innerWidth(),
            $banner = $Body.find('.pic-banner'),
            $newsLi = $Body.find('.tit li'),
            $newsSpan = $Body.find('.tit li span'),
            $newsI = $Body.find('.tit i'),
            $lineC = $Body.find('.line-content'),
            len = $u2Li.length,
            $scan = $Body.find('.scan'),
            $p1 = $scan.find('.p1'),
            $scanDownload = $scan.find('.scan-download'),
            $slideLi = $Body.find('.list li'),
            $qieHuan = $Body.find('.list-all .add-bg'),
            $allTab = $Body.find('.shishen-tab li:not(:last)'),
            $shishenUl = $Body.find(".list-all .personage-box ul"),
            $ulWrap = $shishenUl.parent(),
            shishenBtn = document.querySelectorAll('.list-all .personage-box .btnT'),
            $listAll = $Body.find('.list-all'),
            $personSwitch = $listAll.find('.personage-tab li'),
            $personPic =$listAll.find('.personage-pic li'),
            $persontxt =$listAll.find('.txt li'),
            arrLeft = [],
            timer,
            temp = 1,
            timeOut,
            index = 0,
            flag = 0,
            timei=0,
             t,
            timeO,
            li = '<li></li>',
            x=[0,0,0,0,0],
            num=[0,0,0,0,0];


        $u2Li.mouseenter(function () {
            clearTimeout(timeOut)
            var $t = $(this)
            if($t.index() !== index){
                timeOut = setTimeout(function () {
                        index = $t.index()
                        $t.addClass('on').siblings().removeClass()
                        $u1.css('left', -liWidth * index)
                },300)
            }
        });
        $banner.hover(function () {
            clearInterval(timer)
        },Player())
       function Player(){
            timer = setInterval(function () {
                index ++
                index%=len
                $u2Li.eq(index).addClass('on').siblings().removeClass()
                $u1[0].style.transition=!index?.3 +'s':1 +'s'
                $u1.css('left',-liWidth*index)
            },2500)
            return Player
        }
        //新闻  公告 媒体  hover部分
        $newsSpan.hover(function () {
            return false
        })
        $newsLi.mouseover(function () {
            var i = $(this).index()
            $newsI.eq(i).addClass('show-i').parent().siblings().children().removeClass('show-i')
            clearTimeout(t)
            t = setTimeout(function () {
                $lineC.css('left',-i*$lineC.children().innerWidth())
            },300)
        })

        /*游戏日历  扫码部分*/
        $p1.click(function () {
            qiehuan($scanDownload,$p1,38)
        })
        $scanDownload.click(function () {
            qiehuan($p1,$scanDownload,390)
        })
        function qiehuan(obj1,obj2,width) {
            obj1.show()
            $scan.stop().animate({
                width:width
            },300)
            obj2.hide()
        }

        //    日历列表
        $slideLi.hover(function () {
            var index = $(this).index()
            if(temp){
                temp=0
                $slideLi.each(function () {
                    arrLeft.push($(this).position().left)
                })
            }
            $(this).stop().css({
                'left':arrLeft[index]+15
            })
            if(!index){
                clearInterval(timeO)
                $(this).stop().css('backgroundPosition','-759px -4px')
            }
        },function () {
            var t = $(this)
            t.stop().css({
                'left':arrLeft[t.index()]
            })
            if(!t.index()){
                timeO=setInterval(function ()
                {
                    var H = Math.floor(t.height())
                    if(H===100){
                        t.stop().css('backgroundPosition','897px 512px')
                        clearInterval(timeO)
                    }
                },13)
            }

        })
            var Tqh = 2;
        //   <!--平安之旅 式神主角切换-->
        $qieHuan.click(function () {
            var i = $(this).index()
            if(Tqh!==i){
                $(this).children('i')
                    .addClass('sty')
                    .parent()
                    .siblings()
                    .children('i')
                    .removeClass('sty')
                if(i===2){//1
                    $listAll.find('.temp-box').stop().fadeIn().siblings('.personage-presentation').stop().fadeOut()
                }else if(i===4){//2
                    $listAll.find('.temp-box').removeClass('block')
                    $listAll.find('.personage-presentation').removeClass('none').stop().fadeIn().siblings('.temp-box').stop().fadeOut()
                }
                Tqh = i
            }

        })
        //主角人物描述切换
        $personSwitch.click(function () {
                var i = $(this).index()
                $(this).children('i').css('display','block')
                $(this).addClass('li-sty').siblings().removeClass('li-sty').children('i').css('display','none')
                person($personPic.eq(i))
                person($persontxt.eq(i))
        })
        function  person(obj) {
            obj.removeClass('none').addClass('block').siblings().addClass('none')
        }
        // SSR SR...选项卡
        $allTab.click(function () {
            flag = $(this).index()
            $(this).addClass('li-on').siblings().removeClass();
            $shishenUl.eq(flag).addClass('ul-on').siblings().removeClass('ul-on')
        })
        //    ul式神人物列表
        $(shishenBtn).click(function () {
            var x = $(this).index(),
                currentUlWidth =$shishenUl.eq(flag).outerWidth(),
                $sUl = $shishenUl.eq(flag),
                ulWrapWidth = $ulWrap.outerWidth();
            if( new Date - timei >400){
                if(x){//下一张
                    if ( !(-$sUl.position().left  >= currentUlWidth-ulWrapWidth-10)){
                        num[flag]++
                        $sUl.css('left',-ulWrapWidth*num[flag]-num[flag])
                    }
                }else {//上一张
                    if(num[flag]<=0) {
                        num[flag]=0
                    }else {
                        num[flag]--
                        $sUl.css('left',-ulWrapWidth*num[flag]-num[flag])
                    }
                }
                timei = new Date
            }

        })
        for(i=0;i<shishenData.length;i++){
            var a = 0
            switch(shishenData[i].level){
                case "SSR":
                    a=1;
                    break;
                case "SR":
                    a=2;
                    break;
                case "R":
                    a=3;
                    break;
                case "N":
                    a=4;
                    break;
            }
            if(i%2===0)$shishenUl.eq(0).append(li)
            if(x[a]%2===0){
                $shishenUl.eq(a).append(li)
                createElement($shishenUl.eq(a))
            }else {
                createElement($shishenUl.eq(a))
            }
            createElement($shishenUl.eq(0))
            x[a]++
            if(i===shishenData.length-1){
                $shishenUl.each(function () {
                    var t = $(this).children('li')
                    $(this).width(t.outerWidth()*t.length)
                })
            }
        }
        function createElement(obj) {
            var I=shishenData[i].isNew?'<i></i>':""
            var div = '<div class="img"><img src="images/index/content/shishen/'+shishenData[i].id+'.png" height="100%" width="100%"/><p><span>'+shishenData[i].name+'</span></p>'+I+'</div>'
            obj.children(':last').append(div)
        }

        // Tba
    })();

    //攻略部分及轮播
    (function (){
        var $search = $Body.find('.search'),
            $bannerWidth = $search.find('.two-pic').width()
        $bannerLi = $search.find('.two-pic li'),
            index=0,
            $banner = $bannerLi.eq(0),
            len = $banner.children().length,
            time=0,
            timeOut=null,
            timer=null,
            $TabLi=$Body.find('.strategy-tab .title .gg'),
            $objWrap=$Body.find('.strategy-rgt .strategy-list>div'),
            $objUl = $Body.find('.strategy-rgt .strategy-list>div ul'),
            arrN=['新手', '式神' , '斗技', '玩法',  '御魂' ,  '高阶'],
            $tongrenList = $Body.find('.tongren-list .move>ul');
            $tongrenTab = $Body.find('.tongren .top ul li p')
            //左侧轮播
        $bannerLi.hover(function () {
            clearInterval(timer)
            clearTimeout(timeOut)
                if($(this).hasClass('btn-l')){//上一张
                    var T =$(this)
                    qiehuan(T)
                }
                if($(this).hasClass('btn-r')){//下一张
                    var T =$(this)
                    qiehuan(T)
                }
                time = new Date

        },function () {
            picMove()
        })
        function qiehuan(T) {
            timeOut=setTimeout(function () {
                index = T.prevAll().length-1
                $banner.stop().css('left',-index*$bannerWidth)
                T.addClass('on').siblings('.btn').removeClass('on')
            },300)
        }
        picMove()
        function picMove() {
            timer=setInterval(function () {
                index++
                index%=len
                $banner.css('left',-index*$bannerWidth)
                $bannerLi.eq(index+1).addClass('on').siblings('.btn').removeClass('on')
            },3000)

            return picMove
        }

        //攻略文章生成
        $objUl.each(function (x) {
            var T=$(this)
            var num = 0;
            for(i=0;i<strateData.length;i++){
                var str = '<li><p>【'+arrN[strateData[i].type.slice(-1)]+'】'+strateData[i].title+'</p><i>'+'作者: '+strateData[i].author+'</i></li>'
                var reg = new RegExp(x - 1)
                if(!x && num < 10 ){
                        T.append(str)
                }else if( reg.test( strateData[i].type)){
                        T.append('<li><p>【'+arrN[x-1]+'】'+strateData[i].title+'</p><i>'+'作者: '+strateData[i].author+'</i></li>')
                }
                //
                num++
            }
        })
        //攻略切换
        $TabLi.mouseenter(function () {
            var T =$(this)
            var i = $(this).index('.gg')
            clearTimeout(timeOut)
            timeOut=setTimeout(function () {
                T.children('i').addClass('sty').parent().siblings('.gg').children('i').removeClass('sty')
                $objWrap.css('left',-i*$objUl.outerWidth())
            },100)
        })

        //同人专区生成
            var num=0;
            for(i=0;i<fanData.length;i++){
                num=fanData[i].type
                $tongrenList.eq(num).append('<li><div class="img"><img src="'+fanData[i].url+'" height="100%" width="100%"/></div><div class="mark"><div class="jia"></div></div><p>'+fanData[i].title+'</p></li>')

            }

        //同人专区列表
        $tongrenTab.mouseenter(function () {
            var i = $(this).parent().index();
            clearTimeout(timeOut)
            $(this).addClass('p-top').siblings().addClass('p-btm').parent().siblings().children().removeClass()
            timeOut = setTimeout(function () {
                $tongrenList.parent().css('left',-i*$tongrenList.eq(0).parents('.tongren-list').outerWidth())
            },300)
        })
    })();

//    活动专区返回顶部
    (function (){
        var $goTop = $Body.find('.go-top');
            $goTop.click(function () {
                $("html").animate({
                    scrollTop : 0
                },300);
            })
    })();
});









