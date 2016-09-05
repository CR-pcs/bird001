//游戏入口函数
define(function (require,exports,module) {
    //加载子模块
    var Bird=require('./bird.js');
    var getImgs=require('./getDatas.js');
    var Land=require('./land.js');
    var Pipe=require('./pipe.js');
    var Sky=require('./sky.js');

    exports.main=function(){
        var winWidth=document.body.clientWidth;
        cvs.width=winWidth;
        cvs.height=winWidth/4*3;
//        计算图片的尺寸比（显示大小/实际大小）
        cvs.scaleFit=document.body.clientWidth/800;
        //获取图片
        getImgs(function (imgObj) {
//            按比例改变图片宽高
            var key;
            for(key in imgObj){
                imgObj[key].width=imgObj[key].width*cvs.scaleFit;
                imgObj[key].height=imgObj[key].height*cvs.scaleFit;
            }

//            初始化Sky类
            Sky.init(cvs,ctx,imgObj.sky);
//            创建Sky实例
            var sky1=new Sky(0,0,2);
            var sky2=new Sky(imgObj.sky.width,0,2);
            var sky3=new Sky(imgObj.sky.width*2,0,2);
//            初始化Land类
            Land.init(cvs,ctx,imgObj.land);
//            创建land实例
            var landHeight=cvs.height-imgObj.land.height;
            var land1=new Land(0,landHeight,2);
            var land2=new Land(imgObj.land.width,landHeight,2);
            var land3=new Land(imgObj.land.width*2,landHeight,2);
            var land4=new Land(imgObj.land.width*3,landHeight,2);
//            初始化Pipe类
            Pipe.init(cvs,ctx,imgObj.pipeDown,imgObj.pipeUp);
//            创建pipe实例
            var pipe1=new Pipe(imgObj.pipeDown.width*3,120,2,0.0002);
            var pipe2=new Pipe(imgObj.pipeDown.width*6,120,2,0.0002);
            var pipe3=new Pipe(imgObj.pipeDown.width*9,120,2,0.0002);
            var pipe4=new Pipe(imgObj.pipeDown.width*12,120,2,0.0002);
            var pipe5=new Pipe(imgObj.pipeDown.width*15,120,2,0.0002);
            var pipe6=new Pipe(imgObj.pipeDown.width*18,120,2,0.0002);
//            初始化Bird类
            Bird.init(cvs,ctx,imgObj.bird);
//            创建bird实例
            var bird=new Bird(40,100,32,24,0.2,8);
//            开始动画的函数
            function start() {
                //先获得小鸟在画布上的X,Y坐标
                var birdCvsX=bird.x+bird.w/2;
                var birdCvsY=bird.y+bird.h/2;
                //判断小鸟是否飞出画布，若飞出，则停止定时器
                if(birdCvsY<bird.h/2||
                    birdCvsY>landHeight-bird.h/2||
                    ctx.isPointInPath(birdCvsX,birdCvsY)
                ){
                    clearInterval(timerId);
                    isMoving=false;
                }
                //先清除画布
                ctx.clearRect(0,0,cvs.width,cvs.height);
                //绘制天空
                sky1.draw();
                sky2.draw();
                sky3.draw();
                sky1.updata();
                sky2.updata();
                sky3.updata();
                //每刷新一遍柱子，把之前的路径清楚一遍
                ctx.beginPath();
                //绘制柱子
                pipe1.drawDown();
                pipe1.drawUp();
                pipe2.drawDown();
                pipe2.drawUp();
                pipe3.drawDown();
                pipe3.drawUp();
                pipe4.drawDown();
                pipe4.drawUp();
                pipe5.drawDown();
                pipe5.drawUp();
                pipe6.drawDown();
                pipe6.drawUp();

                pipe1.updata();
                pipe2.updata();
                pipe3.updata();
                pipe4.updata();
                pipe5.updata();
                pipe6.updata();
                //绘制地板
                land1.draw();
                land2.draw();
                land3.draw();
                land4.draw();
                land1.updata();
                land2.updata();
                land3.updata();
                land4.updata();
                //绘制小鸟
                bird.bind(3.5);
                bird.draw();
                bird.updata();
            }
            var timerId=setInterval(start,1000/60);
            var isMoving=true;//定时器存在与否的 判断条件
//            给重新开始按钮绑定事件
            restart.addEventListener("click", function () {
                if(!isMoving){//确定没有定时器时，才重新开始
//                    重新设定初始参数
                    bird.y=100*cvs.scaleFit;
                    bird.speed=0;
                    bird.aSpeed=0.2*cvs.scaleFit;
                    pipe1.x=imgObj.pipeDown.width*3;
                    pipe2.x=imgObj.pipeDown.width*6;
                    pipe3.x=imgObj.pipeDown.width*9;
                    pipe4.x=imgObj.pipeDown.width*12;
                    pipe5.x=imgObj.pipeDown.width*15;
                    pipe6.x=imgObj.pipeDown.width*18;
//                    清除之前的路径
                    ctx.beginPath();
                    timerId=setInterval(start,1000/60);
                    isMoving=true;
                }
            });
        })
    }
});