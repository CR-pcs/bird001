define(function (require,exports,module) {
    var imgObj={},key,img,Cb;
    var num=0;
    $.ajax({
        url:"js/picsLcation.json",
        data:"",
        type:"GET",
        error: function (datas) {
            console.log(datas);
            console.log("请求失败");
        },
        success: function (datas) {
            for(key in datas){
                img=new Image();
                img.src=datas[key];
                imgObj[key]=img;
                img.addEventListener("load", function () {
                    fn();
                })
            }
        }
    });
    function fn(){
        num++;
        if(num===5){
            Cb(imgObj);
        }
    }
    module.exports= function (fn) {
        Cb=fn;
    }
    //w.getImgs= function (fn) {
    //    Cb=fn;
    //};
});
