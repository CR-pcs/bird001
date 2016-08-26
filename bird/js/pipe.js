/**
 * Created by Administrator on 2016/8/12.
 */
(function(w){
    //创建一个pipe对象
    function Pipe(x,space,speed,aSpeed){
        if(!Pipe.isInit){
            throw "请先初始化Pipe类";
        }
        this.x=x;
        //速度
        this.speed=speed*cvs.scaleFit;
        //加速度
        this.aSpeed=aSpeed*cvs.scaleFit;
        //先随机生成上面柱子的可视长度
        this.downVisualY=(Math.random()*180+50)*cvs.scaleFit;
        //计算出上下柱子的y轴坐标
        this.downY=this.downVisualY-Pipe.downImg.height;
        this.upY=this.downVisualY+space*cvs.scaleFit;
    }
    Pipe.init= function (cvs,ctx,downImg,upImg) {
        Pipe.cvs=cvs;
        Pipe.ctx=ctx;
        Pipe.downImg=downImg;
        Pipe.upImg=upImg;
        if(cvs&&ctx&&downImg&&upImg){
            Pipe.isInit=true;
        }
    }
    Pipe.prototype={
        constructor:Pipe,
        drawDown: function () {
            Pipe.ctx.drawImage(Pipe.downImg,this.x,this.downY,Pipe.downImg.width,Pipe.downImg.height);
            //绘制虚拟的方形
            Pipe.ctx.rect(this.x,this.downY,Pipe.downImg.width,Pipe.downImg.height);
        },
        drawUp: function () {
            Pipe.ctx.drawImage(Pipe.upImg,this.x,this.upY,Pipe.upImg.width,Pipe.upImg.height);
            //绘制虚拟的方形
            Pipe.ctx.rect(this.x,this.upY,Pipe.upImg.width,Pipe.upImg.height);
        },
        updata: function () {
            this.speed+=this.aSpeed;
            this.x-=this.speed;
            if(this.x<=-(this.x+Pipe.downImg.width*2)){
                this.x=Pipe.cvs.width+2*Pipe.downImg.width;
            }
        }
    }
    w.Pipe=Pipe;
}(window));