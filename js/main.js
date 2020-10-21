//User-Agent作为识别方式在这种前端为主的项目中并不是很好的选择，该方式存在一个问题，即可能无法完全正确识别QQ/微信/B站/知乎等应用程序内置浏览器。
//正确的方法应该是根据页面尺寸进行样式的变化，同时该改动便于在PC端进行自适应的调试。
/*var browser = {
    versions: function() {
        var u = navigator.userAgent, app = navigator.appVersion;         //移动设备浏览器版本信息
        return {
            //IE内核
            trident: u.indexOf('Trident') > -1,
            //opera内核
            presto: u.indexOf('Presto') > -1,
            //苹果、谷歌内核
            webKit: u.indexOf('AppleWebKit') > -1,
            //火狐内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
            //是否为移动终端
            mobile: u.match(/AppleWebKit.*Mobile./),
            //ios终端
            ios: u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            //android终端或者uc浏览器
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
            //是否为iPhone或者QQHD浏览器
            iPhone: u.indexOf('iPhone') > -1,
            //是否iPad
            iPad: u.indexOf('iPad') > -1,
            //是否web应该程序，没有头部与底部
            webApp: u.indexOf('Safari') == -1
        };
    } (),
    language: (navigator.browserLanguage  ||  navigator.language).toLowerCase()
}
if (browser.versions.mobile  ||  browser.versions.ios  ||  browser.versions.android  ||  browser.versions.iPhone  ||  browser.versions.iPad) {
    cssChange();
}
function cssChange() {
    var link  =  document.getElementsByTagName('link')[0];
    //PC端应用的样式文件：style_A.css
    //Mobile端应用样式文件：style_B.css
    //注意保持link0是style
    link.setAttribute('href', 'css/style_B.css');
    console.log(document.getElementsByTagName('link')[0]);
}  //Torrekie: 以及另外一件事情，我也不知道为什么它会格式化成这个鬼模样
*/
//---------------------------------------界面按钮功能触发--------------------------------------
function FAQ() {
    alert("Q:图片可以下载吗？\nA:由于开发时间有限，您只能截图（无限高清放大）而不是直接下载图片。\nQ:如何制作格裙样机？\nA:。\nQ:如何制作格裙？\nA:找别人帮你做。\nQ:成图可以商用吗？\nA:我认为店主不会要。\nQ:这个工具怎么使用？\nA:点击页面下方\'月亮猹\'观看教程视频。\nQ:为什么有的图有bug？\nA:因为开发者累了。\nQ:你还有什么问题？\nA:你没有了。");
}
function onMask(isMaskOn) {
    var MaskArray = [ "bag", "Bigunderpants", "bottle", "bowtie", "camera", "fakeskirt", "notebook", "Ordinaryskirt" ];
    if (isMaskOn) {
        var parent = document.getElementById("img_mask");
        var maskimg = document.getElementById("img_current");
        var lastOne;
        if (maskimg) { //替换
            var masknumber = Math.ceil(Math.random()*MaskArray.length);
            lastOne = masknumber;
            maskimg.src = "img/" + MaskArray[masknumber-1] + ".png"; //随机mask
        } else {  //新建
            var maskimg = document.createElement("img");
            var masknumber = Math.ceil(Math.random()*MaskArray.length);
            maskimg.id = "img_current";
            maskimg.src = "img/" + MaskArray[masknumber-1] + ".png"; //随机mask
            if (window.innerWidth<window.innerHeight) {
                maskimg.width = window.innerHeight*0.26+1;  //比svg稍微大一些
                maskimg.height = window.innerHeight*0.26+1;
            } else {
                maskimg.width = window.innerWidth*0.26+1;
                maskimg.height = window.innerWidth*0.26+1;
            }
            parent.appendChild(maskimg);
        }
    } else {  //取消
        var maskimg = document.createElement("img");
        var maskimg = document.getElementById("img_current");
        maskimg.src = "img/none.png"; //none
    }
}
function onName() {
    //语料来自往期分析
    //Torrekie: We should always avoid putting all the resources into one file, I moved the content of variable 'name' to res/CustomNameStrings.json
    //Also, POS(Part of Speech) has been classified.
    //Oh sucks, I realized I'm not writing Node.js, local testing was unable to read files because browsers doesn't like it if you didn't disable security.
    //I will comment those code if Git Page can't solve this issue.
    //GIT PAGE TESTING PASSED
    var request;
    if (window.XMLHttpRequest) {
        // code for all new browsers
        request = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        // code for IE5 and IE6
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (request != null) {
        request.open("GET", "res/CustomNameStrings.json", false);
        request.send(null);
        //200 here was not a magic number, it represents "OK" in HTTP Status Code.
        if (request.status == 200) {
            var name = JSON.parse(request.responseText).nouns;
            var btn = document.getElementById("namebutton");
            var span = document.getElementById("namebutton_span");
            span.innerHTML=name[Math.floor(Math.random() * (name.length))] + name[Math.floor(Math.random() * (name.length))];
        } else if (request.status == 0) {
            alert("Status: " + request.status + "\nHTTP Status should never be 0, please refresh page or restart your browser.");
        } else {
            alert("Status: " + request.status + "\nResponse: " + request.responseText);
        }
    } else {
        alert("Your environment does not support XMLHTTP.");
    }
}
function onLoad(random) {
    //---------------------------------------------------------准备颜色、密度、按钮显示-------------------------------------
    //定义宏观变量
    var color1,color2,color3;
    var colorAuxiliary =new Array();
    var AuxiliaryNumber;
    
    if (random) {
        //console.log("调用随机模式",random)
        //随机3主色
        color1 = '#'+Math.floor(Math.random()*16777215).toString(16);
        color2 = '#'+Math.floor(Math.random()*16777215).toString(16);
        color3 = '#'+Math.floor(Math.random()*16777215).toString(16);
        //判断随机色的可用性,会出现少一位数无法识别的颜色
        if (color1.length==6) {color1 = "#0"+color1.substr(1,5)}
        if (color2.length==6) {color2 = "#0"+color2.substr(1,5)}
        if (color3.length==6) {color3 = "#0"+color3.substr(1,5)}
        
        document.getElementById("color1").value = color1; //赋值
        document.getElementById("color2").value = color2; //赋值
        document.getElementById("color3").value = color3; //赋值
        
        //console.log("随机颜色",color1,color2,color3)
        
        //随机生成密度上限（针对所有颜色）
        var number1 = Math.random();
        var numbercolorButton = document.getElementById("numbercolor");
        numbercolorButton.value = numbercolor1 = Math.ceil(number1 * 6);
        
        //console.log("随机密度",numbercolor1)
    } else {
        //半随机状态
        //console.log("调用半自动模式",random)
        //读取手动输入的颜色
        color1 = document.getElementById("color1").value;
        color2 = document.getElementById("color2").value;
        color3 = document.getElementById("color3").value;
        //console.log("几种颜色",color1,color2,color3)
        //每个颜色，随机生成几条线,可以手动输入密集度 （针对所有颜色）
        var number1 = Math.random();
        numbercolor1 = Math.ceil(number1 * (document.getElementById("numbercolor").value));
        //console.log("密度",document.getElementById("numbercolor").value)
    }
    ////动态主色背景样式
    var body = document.body;
    body.setAttribute('style', "background-color:"+color1);
    //  var svgBorder =document.getElementById("div_svg");
    //  svgBorder.setAttribute('style', "border:2px solid "+color2);
    //body.setAttribute("background-color",color1);
    //随机的辅色数量
    AuxiliaryNumber =  Math.ceil(Math.random()*5); //辅助色系数量 5以内随机
    //console.log("辅助色数量"+AuxiliaryNumber)
    //为了正确显示每次的辅色，清除之前的随机辅助色
    if (document.getElementsByName("colorAdd")) {
        var parent = document.getElementById("colorCnotroll");
        var child = document.getElementsByName("colorAdd");
        for(var j=0;j<child.length;j++){
            parent.removeChild(child[j]);
        }
    }
    //无论是全随机还是半随机都是随机辅色,生成随机辅色并且显示为不可使用的按钮
    for (var i = 1;i<=AuxiliaryNumber;i++) {
        var tempColr = '#'+Math.floor(Math.random()*16777215).toString(16);
        colorAuxiliary.push(tempColr);
        var addColor = document.getElementById("colorCnotroll");
        //创建input
        var input = document.createElement("input");
        input.type = "color";
        input.id = "colorAdds";//"questions[" + count + "]";
        input.value=tempColr;
        input.className="colorbuttonsmall"; //是classname 不是class
        input.name = "colorAdd";//"questions[" + count + "].name";
        input.disabled="disabled";
        addColor.appendChild(input);
    }
    //console.log("辅助色"+colorAuxiliary)
    //--------------------------------------------------------------开始绘制--------------------------------------------------
    //生成SVG,保持标题、svg、色盘居中
    var mysvg = document.getElementById("svg_my");
    var mymask = document.getElementById("img_mask");
    //适应手机
    //console.log(window.innerWidth,window.innerHeight,document.body.clientWidth,window.screen.width)
    if (window.innerWidth<window.innerHeight) {
        var mysvgWidth = window.innerHeight*0.26;//300;
    } else {
        var mysvgWidth = window.innerWidth*0.26;//300;
    }
    mysvg.setAttribute("style", "width:" + mysvgWidth + "px;" + "height:" + mysvgWidth + "px;margin-top:" + window.innerHeight * 0.1 + "px;");//相对于当前窗口高度下移
    mymask.setAttribute("style", "margin-top:" + window.innerHeight * 0.1 + "px;");//相对于当前窗口高度下移
    var colorbuttonCenter = document.getElementById("capture");
    colorbuttonCenter.setAttribute("style","width:"+mysvgWidth+"px;");
    var latticeLeft = document.getElementById("div_svg");
    if(window.innerWidth<window.innerHeight){
        latticeLeft.setAttribute("style","margin-left:"+window.screen.width*0.40+"px;");  //手机
    } else {
        latticeLeft.setAttribute("style","margin-left:"+window.screen.width*0.26+"px;");  //pc
    }
    
    var title_center = document.getElementById("title_img");
    title_center.setAttribute("style","width:"+mysvgWidth+"px;position: absolute;margin-top:15px;");
    
    //绘制横纹背景色
    var rectObj0 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rectObj0.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#petal');
    rectObj0.setAttribute("width",mysvgWidth);
    rectObj0.setAttribute("height",mysvgWidth);
    rectObj0.setAttribute("style","fill:"+color1+";stroke-width:0;stroke:"+color1);  //color 1
    document.querySelector('svg').appendChild(rectObj0);
    
    //绘制横纹
    
    //主色1
    var rectObj1Array =   new Array(); //动态数组记录横纹1位置
    for (var i = 1; i <= numbercolor1; i += 1) {
        var rectObj1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rectObj1.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#petal');
        rectObj1.setAttribute("width",mysvgWidth);
        var temph = Math.ceil(Math.random()*50);
        var tempy = Math.ceil(Math.random()*mysvgWidth);
        //首先判断主色1自己与自己是否重叠
        for (var m = 0; m < rectObj1Array.length; m += 1) {  //判断y的位置与自己是否重叠、包裹
            for (var j=0;j<10000;j++) //设定最多判断10000次 万次后可能出现交叉错误
            {
                if(rectObj1Array[m][1]<tempy&&tempy<rectObj1Array[m][0]+rectObj1Array[m][1])
                {
                    tempy = Math.ceil(Math.random()*mysvgWidth); //如果有重叠，重新生成
                } else {
                    //console.log(rectObj1Array[m][1],rectObj1Array[m][0]+rectObj1Array[m][1],tempy)
                    break;}
            }
        }
        //console.log("y的最终数值"+tempy);
        
        for (var m = 0; m < rectObj1Array.length; m += 1) {  //判断y+h的位置是否超出
            for (var j=0;j<10000;j++) //判断10000次
            {
                if(rectObj1Array[m][1]<(temph+tempy)&&tempy<rectObj1Array[m][1])
                {
                    temph = Math.ceil(Math.random()*(rectObj1Array[m][1]-tempy)); //重新生成,宽度不能超过
                } else {
                    //console.log(rectObj1Array[m][1],rectObj1Array[m][0]+rectObj1Array[m][1],temph)
                    break;}
            }
        }
        //console.log("h的最终数值"+temph);
        
        //赋值
        rectObj1.setAttribute("height",temph);
        rectObj1.setAttribute('y',tempy );
        rectObj1Array.push([temph,tempy]);
        rectObj1.setAttribute("style","fill:"+color2+";stroke-width:0;stroke:"+color2);  //color 2
        document.querySelector('svg').appendChild(rectObj1);
    }
    
    
    //主色2
    var rectObj2Array = new Array(); //动态数组记录横纹2位置
    var rectObj1_2Array = rectObj1Array.concat(); //动态数组记录横纹位置,1_2拼合  js复制数组,原数组不变,直接相等会导致地址被复制
    for (var i = 1; i <= numbercolor1; i += 1) {
        var rectObj2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rectObj2.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#petal');
        rectObj2.setAttribute("width",mysvgWidth);
        
        var temph = Math.ceil(Math.random()*50);
        var tempy = Math.ceil(Math.random()*mysvgWidth);
        
        //判断主色2横纹与自己、主色1是否交叠
        //这些判断不能分开进行，否则满足了下一个条件又不能满足上一个条件，所以需要拼接两个数组进行判断，按照这个思路多一个颜色也可以了
        //先判断好y，再y+h
        //[#1]
        //判断重叠
        for (var m = 0; m < rectObj1_2Array.length; m += 1) {  //判断y的位置与自己活上一个颜色是否重叠
            for (var j=0;j<10000;j++) //判断10000次 万次后可能出现交叉错误
            {
                if(rectObj1_2Array[m][1]<tempy&&tempy<rectObj1_2Array[m][0]+rectObj1_2Array[m][1])
                {
                    tempy = Math.ceil(Math.random()*mysvgWidth); //重新生成
                } else {
                    //console.log(rectObj1_2Array[m][1],rectObj1_2Array[m][0]+rectObj1_2Array[m][1],tempy)
                    break;}
            }
        }
        //console.log("color 3 y的最终数值"+tempy);
        
        
        for (var m = 0; m < rectObj1_2Array.length; m += 1) {  //判断y+h的位置，不能进入或者包裹
            for (var j=0;j<10000;j++) //判断10000次
            {
                if(rectObj1_2Array[m][1]<(temph+tempy)&&tempy<rectObj1_2Array[m][1])
                {
                    temph = Math.ceil(Math.random()*(rectObj1_2Array[m][1]-tempy)); //重新生成,宽度不能超过
                } else {
                    //console.log(tempy,rectObj1_2Array[m][1],temph+tempy,"最终结果")
                    break;}
            }
        }
        //console.log("h的最终数值"+temph);
        
        
        
        //赋值
        rectObj2.setAttribute("height",temph);
        rectObj2.setAttribute('y', tempy);
        rectObj1_2Array.push([temph,tempy]);
        rectObj2Array.push([temph,tempy]);
        rectObj2.setAttribute("style","fill:"+color3+";stroke-width:0;stroke:"+color3);  //color 3
        document.querySelector('svg').appendChild(rectObj2);
    }
    
    
    //竖纹
    
    //主色1
    for (var i = 1; i <= numbercolor1; i += 1) {
        var rectObj3 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rectObj3.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#petal');
        rectObj3.setAttribute("height",mysvgWidth);
        rectObj3.setAttribute("width",rectObj1Array[i-1][0]);
        rectObj3.setAttribute('x', rectObj1Array[i-1][1]);
        rectObj3.setAttribute("style","fill:"+color2+";stroke-width:0;stroke:"+color2);  //color 2
        document.querySelector('svg').appendChild(rectObj3);
    }
    
    //主色2
    for (var i = 1; i <= numbercolor1; i += 1) {
        var rectObj4 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rectObj4.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#petal');
        rectObj4.setAttribute("height",mysvgWidth);
        rectObj4.setAttribute("width",rectObj2Array[i-1][0]);
        rectObj4.setAttribute('x', rectObj2Array[i-1][1]);
        rectObj4.setAttribute("style","fill:"+color3+";stroke-width:0;stroke:"+color3);  //color 3
        document.querySelector('svg').appendChild(rectObj4);
    }
    //[#2]
    //——————————————————————————————————————————————————————————————————————美化————————————————————————————————————————————————————————————
    
    //像素化蒙版方案  -显示白色的区域 不显示黑色的区域  进行图像计算  ，不转jpg 直接对svg修改/或者重新生成/控制像素canvas？背景色线条line
    //【定义一个方阵矩阵】  蒙版蒙在横纹上  矩阵计算  对横纹填充图案 https://www.douban.com/group/topic/172691860/?author=1
    //对每个像素填充吗？ 其实就是对横纹的剪贴蒙版  消除黑纹区域的图案
    
    
    
    
    //绘制svg斜纹-
    
    //右上斜纹
    for (var i = 1; i <= mysvgWidth; i += 2) {
        var rectObjline = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        rectObjline.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#petal');
        rectObjline.setAttribute("x1",i);
        rectObjline.setAttribute("x2",mysvgWidth);
        rectObjline.setAttribute("y1",0);
        rectObjline.setAttribute("y2",mysvgWidth-i);
        rectObjline.setAttribute("style","stroke-width:0.5;stroke:"+color1);
        document.querySelector('svg').appendChild(rectObjline);
    }
    //左下斜纹
    for (var i = 1; i <= mysvgWidth; i += 2) {
        var rectObjline2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        rectObjline2.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#petal');
        rectObjline2.setAttribute("x1",0);
        rectObjline2.setAttribute("x2",mysvgWidth-i);
        rectObjline2.setAttribute("y1",i);
        rectObjline2.setAttribute("y2",mysvgWidth);
        rectObjline2.setAttribute("style","stroke-width:0.5;stroke:"+color1);
        document.querySelector('svg').appendChild(rectObjline2);
    }
    
    
    
    
    //绘制不同色交叠处
    //不同颜色交叠 横纹在上 透出底部的竖纹 条纹
    
    for (var i = 0; i < rectObj1Array.length; i += 1) {  //横着一次
        for (var j = 0; j < rectObj2Array.length; j += 1) {
            var rectObjNotSame = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rectObjNotSame.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#petal');
            rectObjNotSame.setAttribute("height",rectObj1Array[i][0]);
            rectObjNotSame.setAttribute("width",rectObj2Array[j][0]);
            rectObjNotSame.setAttribute('x', rectObj2Array[j][1]);
            rectObjNotSame.setAttribute('y', rectObj1Array[i][1]);
            rectObjNotSame.setAttribute("style","fill:"+color2+";stroke-width:0;stroke:"+color2+";fill-opacity:0.5");  //color 2
            document.querySelector('svg').appendChild(rectObjNotSame);
        }
    }
    
    for (var i = 0; i < rectObj2Array.length; i += 1) { //竖着一次
        for (var j = 0; j < rectObj1Array.length; j += 1) {
            var rectObjNotSame_a = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rectObjNotSame_a.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#petal');
            rectObjNotSame_a.setAttribute("height",rectObj2Array[i][0]);
            rectObjNotSame_a.setAttribute("width",rectObj1Array[j][0]);
            rectObjNotSame_a.setAttribute('x', rectObj1Array[j][1]);
            rectObjNotSame_a.setAttribute('y', rectObj2Array[i][1]);
            rectObjNotSame_a.setAttribute("style","fill:"+color3+";stroke-width:0;stroke:"+color3+";fill-opacity:0.5");  //color 3
            document.querySelector('svg').appendChild(rectObjNotSame_a);
        }
    }
    
    
    //绘制同色交叠处绘制实色，这一步一定在上一步后，否则将会有不同颜色交叠的错色块出现在上方
    //相同颜色处无线条  直接判断矩阵即可
    
    //rectObj1Array  主色1
    for (var i = 0; i < rectObj1Array.length; i += 1) {
        for (var j = rectObj1Array.length-1; j >= 0; j -= 1) {
            var rectObjSame = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rectObjSame.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#petal');
            rectObjSame.setAttribute("height",rectObj1Array[i][0]);
            rectObjSame.setAttribute("width",rectObj1Array[j][0]);
            rectObjSame.setAttribute('x', rectObj1Array[j][1]);
            rectObjSame.setAttribute('y', rectObj1Array[i][1]);
            rectObjSame.setAttribute("style","fill:"+color2+";stroke-width:0;stroke:"+color2);  //color 2
            document.querySelector('svg').appendChild(rectObjSame);
        }
    }
    
    //rectObj2Array  主色2
    for (var i = 0; i < rectObj2Array.length; i += 1) {
        for (var j = rectObj1Array.length-1; j >= 0; j -= 1) {
            var rectObjSame2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rectObjSame2.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#petal');
            rectObjSame2.setAttribute("height",rectObj2Array[i][0]);
            rectObjSame2.setAttribute("width",rectObj2Array[j][0]);
            rectObjSame2.setAttribute('x', rectObj2Array[j][1]);
            rectObjSame2.setAttribute('y', rectObj2Array[i][1]);
            rectObjSame2.setAttribute("style","fill:"+color3+";stroke-width:0;stroke:"+color3);  //color 3
            document.querySelector('svg').appendChild(rectObjSame2);
        }
    }
    
    
    //绘制辅助色横竖纹，随机的透明度（0~0.5）&随机的宽度（0~5），尽量不影响主色彩
    //这一步在最上层，避免有被上一块切断的效果，但是透明度也要低一些
    
    for (var i = 0; i < colorAuxiliary.length; i += 1) {
        //横纹
        var rectObjAx = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rectObjAx.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#petal');
        var temph = Math.ceil(Math.random()*5);
        var tempy = Math.ceil(Math.random()*mysvgWidth);
        var temptrans =Math.random()/2;
        rectObjAx.setAttribute("height",temph);
        rectObjAx.setAttribute("width",mysvgWidth);
        //rectObjAx.setAttribute('x',0);
        rectObjAx.setAttribute('y',tempy);
        rectObjAx.setAttribute("style","fill:"+colorAuxiliary[i]+";stroke-width:0;stroke:"+colorAuxiliary[i]+";fill-opacity:"+temptrans);  //color 2
        document.querySelector('svg').appendChild(rectObjAx);
        //竖纹
        var rectObjAx_a = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rectObjAx_a.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#petal');
        rectObjAx_a.setAttribute("width",temph);
        rectObjAx_a.setAttribute("height",mysvgWidth);
        rectObjAx_a.setAttribute('x', tempy);
        rectObjAx_a.setAttribute("style","fill:"+colorAuxiliary[i]+";stroke-width:0;stroke:"+colorAuxiliary[i]+";fill-opacity:"+temptrans);  //color 2
        document.querySelector('svg').appendChild(rectObjAx_a);
    }
}
window.onload = onLoad;

//[#1]
/*
 //判断自己
 for (var m = 0; m < rectObj1_2Array.length; m += 1) {  //判断y的位置与自己和他人是否重叠
 console.log("自己还在循环")
 for (var j=0;j<10000;j++) //判断10000次 万次后可能出现交叉错误
 {
 if(rectObj1_2Array[m][1]<tempy&&tempy<rectObj1_2Array[m][0]+rectObj1_2Array[m][1])
 {
 tempy = Math.ceil(Math.random()*200); //重新生成
 }
 else {
 console.log(rectObj1_2Array[m][1],rectObj1_2Array[m][0]+rectObj1_2Array[m][1],tempy)
 break;}
 }
 }
 for (var m = 0; m < rectObj1Array.length; m += 1) {  //判断y+h的位置
 for (var j=0;j<10000;j++) //判断10000次
 {
 if(rectObj1Array[m][1]<(temph+tempy)&&tempy<rectObj1Array[m][1])
 {
 console.log(tempy,rectObj1Array[m][1],temph+tempy,"比较并重新生成")
 temph = Math.ceil(Math.random()*(rectObj1Array[m][1]-tempy)); //重新生成,宽度不能超过
 }
 else {
 console.log(rectObj1Array[m][1],rectObj1Array[m][0]+rectObj1Array[m][1],temph)
 break;}
 }
 }
*/
//[#2]
//像素化
//var  svgHtml=document.getElementById("div_svg").innerHTML.trim();
// console.log(svgHtml);
// var canvasId=document.getElementById("canvas");
// console.log(canvasId);
//canvg(canvasId,svgHtml);
/*
 var svg = document.getElementById('div_svg').innerHTML;
 var canvas = document.getElementById('canvas');
 var c = canvas.getContext('2d');
 
 //新建Image对象
 var img = new Image();
 
 //svg内容
 img.src = 'data:image/svg+xml,' + unescape(encodeURIComponent(svg));//svg内容中可以有中文字符
 img.src = 'data:image/svg+xml,' + svg;//svg内容中不能有中文字符
 
 
 //svg编码成base64
 img.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svg)));//svg内容中可以有中文字符
 img.src = 'data:image/svg+xml;base64,' + window.btoa(svg);//svg内容中不能有中文字符
 
 //img.src = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602439783273&di=7ab8f861ce5d3437d29a365537782ac6&imgtype=0&src=http%3A%2F%2Fstatic.open-open.com%2Flib%2FuploadImg%2F20170301%2F20170301142335_522.png"
 //console.log(img)
 
 //图片初始化完成后调用
 img.onload = function() {
 //将canvas的宽高设置为图像的宽高
 setTimeout("alert('对不起, 要你久候')", 3000 )
 //alert('加载完毕')
 canvas.width = img.width;
 canvas.height = img.height;
 console.log(img)
 //canvas画图片
 c.drawImage(img, 0, 0);
 //将图片添加到body中
 document.body.appendChild(img)
 }
*/
//body放前面
//svg转png  canvg html2canvas
// html2canvas(document.querySelector("#div1")).then(canvas =>
// {document.body.appendChild(canvas)});
//     window.onload = function() {
// var  svgHtml=document.getElementById("div_svg").innerHTML.trim();
//     console.log(svgHtml);
//     var canvasId=document.getElementById("canvas");
//    //canvg(canvasId,svgHtml);
// //canvg(document.getElementById('svg_my'), '<svg>...</svg>')
// }
//canvg(canvasId,svgHtml);

//发布 上传后 index页面 设置githubpages https://moonmooncha.github.io/Lattice-Generator/

//Torrekie: 2020.10.20 4:14 为提升可读性，决定将大篇幅注释移动至尾部并添加索引。