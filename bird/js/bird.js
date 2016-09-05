
    //先想好，这个bird我们要用来做什么，从而决定添加什么属性和方法
    //0、确定是在canvas的运行环境中（先初始化） (bird)
    //1、拍翅膀 (bird.prototype)
    //2、自由落体 (bird.aSpeed)
    //3、点击时，bird瞬间获得一个向上的初速度 (bird.speedUp)
    //4、上升下降时，头方向改变 (bird.prototype)
    //5、判断触底与触顶，停止定时器 ()

define(function (require,exports,module) {
    //新建一个bird对象
    function Bird(x,y,w,h,aSpeed,wingspeed){
        if(!Bird.isInit){
            throw "请先初始化brid类";
        }
        this.x=x*cvs.scaleFit;
        this.y=y*cvs.scaleFit;
        this.w=w*cvs.scaleFit;
        this.h=h*cvs.scaleFit;
        //给bird添加一个向下的加速度
        this.aSpeed=aSpeed*cvs.scaleFit;
        //小鸟的速度
        this.speed=0;
        //翅膀
        this.wingSta=0;
        //控制扇翅膀的速度（下降this.wingspeed倍）
        this.wingspeed=wingspeed;
    }

//给bird类添加初始化方法
    Bird.init= function (cvs,ctx,img) {
        this.cvs=cvs;
        this.ctx=ctx;
        this.img=img;
        if(cvs&&ctx){
            Bird.isInit=true;
        }
    }

//在bird的原型上添加各种的方法
    Bird.prototype={
        constructor:Bird,
        //绘制小鸟
        draw: function () {
            //先状态保存
            Bird.ctx.save();
            //获取小鸟的中心点
            var birdX=this.x+this.w/2;
            var birdY=this.y+this.h/2;
            //小鸟的角度随speed变化而变化
            Bird.ctx.translate(birdX,birdY);
            var angle=this.speed/12;
            //鸟头不能太转=。=
            angle=angle>Math.PI/3?Math.PI/3:angle;
            angle=angle<-Math.PI/3?-Math.PI/3:angle;
            Bird.ctx.rotate(angle);
            //绘制
            Bird.ctx.drawImage(Bird.img,9+52*(this.wingSta%this.wingspeed==0?this.wingSta/this.wingspeed:(this.wingSta-this.wingSta%this.wingspeed)/this.wingspeed),11,34,24,-this.w/2,-this.h/2,this.w,this.h);
            //绘制完小鸟后，回滚之前的状态
            Bird.ctx.restore();
        },
        //更新下一帧数据
        updata: function () {
            //扇翅膀
            this.wingSta++;
            this.wingSta=this.wingSta>2*this.wingspeed?0:this.wingSta;
            //自由落体
            this.y+=this.speed;
            this.speed+=this.aSpeed;
        },
        //绑定事件
        bind: function (upSpeed) {
            //将this传进监听器里
            var self=this;
            function flick(){
                //改变初速度，让鸟向上飞
                self.speed=-upSpeed*cvs.scaleFit;
                this.wingSta=2*this.wingspeed;
            }
            //添加事件监听
            cvs.addEventListener("click", function () {
                flick();
            });
            jump.addEventListener("touchstart", function () {
                flick();
            });
        }
    }

    //将bird对象暴露到全局中
    module.exports=Bird;
});




