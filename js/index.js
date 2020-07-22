window.onload = function() {
    // 侧边栏定位
    var sliderbar = document.getElementById('tool');
    var banner = document.getElementById('firstScreen');
    var layer = document.getElementById('layer');
    var backtop = document.querySelector('.backtop');
    var bannerTop = banner.offsetTop;
    var sliderbarTop = sliderbar.offsetTop - bannerTop;
    
    // 处理函数
    document.addEventListener('scroll',function() {
       if(window.pageYOffset > bannerTop) {
          sliderbar.style.position = 'fixed';
          sliderbar.style.top = sliderbarTop + 'px';

       }else {
        sliderbar.style.position = 'absolute';
        sliderbar.style.top = '530px';
       }
      if(window.pageYOffset > 700) {
          backtop.style.display = 'block';
      }else {
        backtop.style.display = 'none';
      }
    })    
    // 返回顶部动画
    backtop.addEventListener('click',function() {
      animate1(window, 0);
    });
    // 动画函数
    function animate1(obj, target, callback) {
        // 先清除以前的定时器，只保留当前的一个定时器执行
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            // 步长值写到定时器的里面
            // 把我们步长值改为整数 不要出现小数的问题
            // var step = Math.ceil((target - obj.offsetLeft) / 10);
            var step = (target - window.pageYOffset) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (window.pageYOffset == target) {
                // 停止动画 本质是停止定时器
                clearInterval(obj.timer);
                // 回调函数写到定时器结束里面
                 callback && callback();
            }
            // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
            // obj.style.left = window.pageYOffset + step + 'px';
            window.scroll(0, window.pageYOffset + step);
        }, 15);
    }

    // 头部搜索框定位
    var headSearch = document.querySelector('#headSearch').querySelector('.searchfixed');
    var headSearchTop = headSearch.offsetTop - bannerTop;
    document.addEventListener('scroll',function() {
        if(window.pageYOffset > bannerTop){
            headSearch.style.display = 'block';
            headSearch.style.position = 'fixed'; 
            headSearch.style.top = 0 ;
            headSearch.style.backgroundColor = '#fff';
                       
        }else {
            headSearch.style.display = 'none';   
        }
    })
    // 点击关闭二维码
    var code = document.querySelector('.code')
    var close = code.querySelector('.close');
    close.addEventListener('click',function() {
        code.style.display = 'none';
        
    })
    // 轮播图


    // 引入动画函数

    function animate(obj, target, callback) {

        
    
        // 先清除以前的定时器，只保留当前的一个定时器执行
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {

            var step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.offsetLeft == target) {
                // 停止动画 本质是停止定时器
                clearInterval(obj.timer);
                // 定时器结束后
                callback && callback();
            }
            // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
            obj.style.left = obj.offsetLeft + step + 'px';
    
        }, 15);
    }



    var ul = document.querySelector('.img').querySelector('ul');
    var li = ul.querySelector('li');
    var ol = document.querySelector('.circle').querySelector('ol')
    var imgBox = document.querySelector('.img');
    var imgBoxW = imgBox.offsetWidth;
    
    var leftBtn = document.querySelector('.leftBtn');
    var rightBtn = document.querySelector('.rightBtn');
    
    // 鼠标移入移出时间
    imgBox.addEventListener('mouseenter',function() {
        leftBtn.style.display = 'block';
        rightBtn.style.display = 'block';
        clearInterval(timer);
        timer = null;
    });
    imgBox.addEventListener('mouseleave',function() {
        leftBtn.style.display = 'none';
        rightBtn.style.display = 'none';
        timer = setInterval(function(){
            rightBtn.click();
        },2000);

    })
    // 根据图片数量，动态生成小圆点
    for(var i = 0; i < ul.children.length; i++) {
        var lis = document.createElement('li');
        ol.appendChild(lis);
        lis.setAttribute('index',i);
        lis.addEventListener('click',function() {
            
             for(var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
                }
                this.className = 'active2';
                var index = this.getAttribute('index');
                num = index;
                circle = index;
                animate(ul,-index*imgBoxW);
            });
    }
    ol.children[0].className = 'active2';

    // 克隆第一个到最后
    var lilast = ul.children[0].cloneNode(true);
    ul.appendChild(lilast);
    var num = 0;
    var circle = 0;
    // 节流阀
    var flag = true;
    // 左右按钮
    rightBtn.addEventListener('click',function() {
       if(flag){
           flag = false;

           if(num == ul.children.length-1) {
            ul.style.left = 0;
            num = 0;
        }
        num++;
        animate(ul,-num*imgBoxW,function(){
            flag = true;
        });
        
        circle++;
        if(circle == ol.children.length){
            circle = 0;
        }
        
        circleChanger();
       }
        
    });

    leftBtn.addEventListener('click',function() {
        if(flag){
            flag = false;
 
            if(num == 0) {
            
             num = ul.children.length-1;
             ul.style.left = -num*imgBoxW + 'px';
         }
         num--;
         animate(ul,-num*imgBoxW,function(){
             flag = true;
         });
         
         circle--;
         if(circle < 0){
             circle = ol.children.length - 1;
         }
         
         circleChanger();
        }
         
     });
     

    //  自动滚动
    var timer = setInterval(function(){
        rightBtn.click();
    },2000);

    //  圆点运动函数
    function circleChanger() {
        for(var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'active2';
        
    }


    // 侧边菜单栏鼠标进入显示

    var sideLi = document.querySelector('.sideNav').querySelectorAll('li');
    var sideItems = document.querySelector('.sideNav').querySelectorAll('.item');
   
    for(let i = 0; i < sideLi.length;i++) {
        sideLi[i].index = i;
        sideLi[i].onmouseover = function() {


            // 干掉每一个
            for (var i = 0;i < sideLi.length;  i++) {
                sideLi[i].className="";
               sideItems[i].classList.remove('active');
            }
            this.className = 'active';
            sideItems[this.index].classList.add('active');
        };
            sideItems[i].onmouseout = sideLi[i].onmouseout  = function () {
                
            for(var i =0;i < sideLi.length; i++) {
                sideLi[i].className = '';
                sideItems[i].classList.remove('active');

            }
        };

        sideItems[i].onmouseover = function () {
            this.classList.add('active');
            sideLi[i].className = 'active';

        };
    }
    // input框
    var ipt = document.querySelector('.searchContent').querySelector('input');
    var span = document.querySelector('.searchContent').querySelector('span');
    var i = document.querySelector('.searchContent').querySelector('i');
    ipt.value = '';
    ipt.addEventListener('focus',function() {
        
            span.style.display = 'none';
            i.style.display = 'none';
        
    });
    ipt.addEventListener('blur',function() {
        if(this.value == ''){
            span.style.display = 'block'; 
            i.style.display = 'block';
        } else {
            span.style.display = 'none';
            i.style.display = 'none';
        
        }
    });
    var ipt1 = document.querySelector('.searchfixed').querySelector('input');
    var span1 = document.querySelector('.searchfixed').querySelector('span');
    var i1 = document.querySelector('.searchfixed').querySelector('i');
    ipt1.value = '';
    ipt1.addEventListener('focus',function() {
        
            span1.style.display = 'none';
            i1.style.display = 'none';
        
    })
    ipt1.addEventListener('blur',function() {
        if(this.value == ''){
            span1.style.display = 'block'; 
            i1.style.display = 'block';
        } else {
            span1.style.display = 'none';
            i1.style.display = 'none';
        
        }
    });

    // 搜索框Tab点击切换
    
    
    $(".searchTab li").click(function() {
        $(this).addClass("active").siblings().removeClass("active");
    })


    // 关闭顶部广告
    var headAd = document.querySelector('#headAd');
    var closead = headAd.querySelector('.closead');
    
    closead.addEventListener('click',function(){
        headAd.style.display = 'none';
    });



    // 公告规则区域
    $(".title li").mouseover(function() {
        var index = $(this).index();
        $(this).addClass("active3").siblings().removeClass();
        $(".title-content ul").eq(index).show().siblings().hide();
        
    })
    

    // 电梯导航
    $(window).scroll(function() {
        $(".content .fix").each(function(i,ele){
            if(($(document).scrollTop() + 50) >= $(ele).offset().top){
                $(".btngo a").eq(i).addClass("active").siblings().removeClass("active");  
            }
        });
        
        
    });
    $(function(){
        $(".btngo a").click(function() {
            var current = $(".content .fix").eq($(this).index()).offset().top - 35 +"px";
            $("body,html").stop().animate({
                scrollTop:current
            });
            $(this).addClass("active").siblings().removeClass("active");
        })
    })

    // 有好货与爱逛街图片突出显示
    $(function() {
        $(".list li").hover(function() {
            $(this).siblings().stop().fadeTo(200,0.7);
        },function() {
            $(this).siblings().stop().fadeTo(200, 1);
        
        })
    })

    // 购物车模块


    $(function() {
    
        // 1.全选、全不选功能
        $(".checkall").change(function() {
            // console.log($(this).prop("checked"));
            $(".j-checkbox , .checkall").prop("checked",$(this).prop("checked"));
        });
        // 商品全选中，全选框选中
        $(".j-checkbox").change(function() {
            console.log(1);
            if($(".j-checkbox:checked").length === $(".j-checkbox").length){
                $(".checkall").prop("checked" , true);
            }else {
                $(".checkall").prop("checked" , false);
            }
        });
        
        // 计算总件数和总价格
        // 增加按钮
        $(".increment").click(function() {
            // 数量
            var n = $(this).siblings('.itxt').val();
            // console.log(n);
            n++;
            $(this).siblings('.itxt').val(n);
            // 价格
            var p = $(this).parents(".p-num").siblings(".p-price").html();
            // console.log(p);
            p = p.substr(1);
            $(this).parents(".p-num").siblings(".p-sum").html("¥" + (p*n).toFixed(2) );
            getSum();
            
        });
    
        // 减少商品数量
        $(".decrement").click(function() {
           
            // 数量
            var n = $(this).siblings('.itxt').val();
            // console.log(n);
            if(n == 1){
                return false;
            }
            n--;
            $(this).siblings('.itxt').val(n);
            // 价格
            var p = $(this).parents(".p-num").siblings(".p-price").html();
            // console.log(p);
            p = p.substr(1);
            $(this).parents(".p-num").siblings(".p-sum").html("¥" + (p*n).toFixed(2));
            getSum();
        });
        
        // 手动输入
        $(".itxt").change(function() {
            var n = $(this).val();
            var p = $(this).parents(".p-num").siblings(".p-price").html();
            p = p.substr(1);
            $(this).parents(".p-num").siblings(".p-sum").html("¥" + (p*n).toFixed(2));
            getSum();
        })
    
    
        // 计算函数getSum
        getSum();
        function getSum(i , ele) {
            var count = 0 ;
            var money = 0;
            $(".itxt").each(function(i,ele) {
             count += parseInt($(ele).val());
             });
            $(".amount-sum em").text(count);
    
             $(".p-sum").each(function(i,ele) {
                 money += parseFloat($(ele).text().substr(1));
             });
             $(".price-sum em").text("¥" + money.toFixed(2));
    
        }
        // 删除商品
        // 单个删除
        $(".p-action a").click(function() {
            $(this).parents(".cart-item").remove();
            getSum();
        })
        // 删除选中
        $(".remove-batch").click(function() {
            $(".j-checkbox:checked").parents(".cart-item").remove();
            getSum();
        })
        // 清理购物车
        $(".clear-all").click(function() {
            $(".cart-item").remove();
            getSum();
        })
    
    
    
    
    
    
    
    
    
    })

    
}
