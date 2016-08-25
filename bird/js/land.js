/**
 * Created by Administrator on 2016/8/12.
 */
(function(w){

    function Land(x,y,speed){
        if(!Land.isInit){
            throw "请先初始化Land";
        }
        this.x=x;
        this.y=y;
        this.speed=speed;
        //记录下图片的起始位置
        this.startX=x;
    }
    Land.init=function(cvs,ctx,img){
        Land.cvs=cvs;
        Land.ctx=ctx;
        Land.img=img;
        if(cvs&&ctx&&img){
            Land.isInit=true;
        }
    }
    Land.prototype={
        constructor:Land,
        draw: function () {
            Land.ctx.drawImage(Land.img,this.x,this.y,Land.img.width,Land.img.height);
        },
        updata: function () {
            this.x-=this.speed;
            if(this.x<=this.startX-Land.img.width){
                this.x+=Land.img.width;
            }
        }
    }
 w.Land=Land;
}(window));