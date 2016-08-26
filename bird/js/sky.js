/**Created by Administrator on 2016/8/11.*/
(function(w){
    function Sky(x,y,speed){
        this.x=x;
        this.y=y;
        this.startX=x;
        this.speed=speed*cvs.scaleFit;
        if(!Sky.isInit){
            throw "请先初始化Sky类";
        }
    }

    /**
     * 给Sky类添加初始化方法init
     * @param cvs画布
     * @param ctx绘制环境
     * @param img图片
     */
    Sky.init= function (cvs,ctx,img) {
        Sky.cvs=cvs;
        Sky.ctx=ctx;
        Sky.img=img;
        if(cvs&&ctx&&img){
            Sky.isInit=true;
        }
        //获取img的宽高
        Sky.imgWidth=img.width;
        Sky.imgHeight=img.height;
    }

    Sky.prototype={
        constructor:Sky,

        draw:function () {
            //给Sky类的原型添加绘制方法draw
            Sky.ctx.drawImage(Sky.img,this.x,this.y*cvs.scaleFit,Sky.imgWidth,Sky.imgHeight);
        },

        updata: function () {
            this.x-=this.speed;
            //当第一张图快移动结束的时候，瞬间切换回起点
            if(this.x<=-Sky.imgWidth){
                this.x=+Sky.imgWidth*2-6;
                //如果把this.x设为0的话，第二张图片会跟第一张瞬间重叠
                //因此这里用加法
            }
        }
    }

    //将Sky对象暴露到全局
    w.Sky=Sky;
}(window));
