/**
 * Created by 大丽丽 on 2017/5/5.
 */

//    悬浮--新建，导入
$('[data-toggle="tooltip"]').tooltip();

//页面高度
$(".main").css("width",(parseFloat( window.screen.availWidth )-230-230)+"px");
$(".main").css("height",(parseFloat(window.screen.availHeight)-65-65)+"px");
$(".partAll").css("height",(parseFloat(window.screen.availHeight)-65-65)+"px");
$(".property").css("height",(parseFloat(window.screen.availHeight)-65-65)+"px");

// 对话框--样式
$(".modalCon .modalSelect").click(function(){
    if( $(this).children("i").hasClass("icon-chevron-down") ){
        $(this).children("i").removeClass("icon-chevron-down");
        $(this).children("i").addClass("icon-chevron-up");
        $(this).addClass("modalBorder");

    }else if( $(this).children("i").hasClass("icon-chevron-up") ){
        $(this).children("i").removeClass("icon-chevron-up");
        $(this).children("i").addClass("icon-chevron-down");
        $(this).removeClass("modalBorder");
    }
    $(this).parent().siblings().children(".modalAlter").hide();
    $(this).parent().siblings().children(".modalSelect").removeClass("modalBorder");
    $(this).parent().siblings().children(".modalSelect").children("i").removeClass("icon-chevron-up").addClass("icon-chevron-down");
    $(this).next().slideToggle();
});

//对话框数据--导入
$("#modalLeadIn .modalAlter .modalTxt").click(function(){
    $(this).siblings().removeClass("modalTxtSelect");
    $(this).siblings().children("i").removeClass("icon-check");
    $(this).children("i").addClass("icon-check");
    $(this).addClass("modalTxtSelect");
    $(this).parent().slideUp();
    $(this).parent().prev().removeClass("modalBorder");
    $(this).parent().prev().children("i").removeClass("icon-chevron-up").addClass("icon-chevron-down");
    $(this).parent().prev().children("span").html( $(this).children("span").html() );

    //var spanData=$(this).parent().prev().children("span").attr("data-option");
    //var spanOption=$(this).parent().prev().children("span").html();
    //console.log(spanData);
    //console.log(spanOption);
});


var modalNewEditor ={};
//对话框数据--新建
$("#modalNewEditor .modalAlter .modalTxt").click(function(){
    $(this).siblings().removeClass("modalTxtSelect");
    $(this).siblings().children("i").removeClass("icon-check");
    $(this).children("i").addClass("icon-check");
    $(this).addClass("modalTxtSelect");
    $(this).parent().slideUp();
    $(this).parent().prev().removeClass("modalBorder");
    $(this).parent().prev().children("i").removeClass("icon-chevron-up").addClass("icon-chevron-down");

    $(this).parent().prev().children("span").html( $(this).children("span").html() );
    $(this).parent().prev().children("span").attr( "data-value",$(this).children("span").attr("data-value") );

    var spanValue=$(this).parent().prev().children("span").attr("data-value");
    var spanOption=$(this).parent().prev().children("span").attr("data-option");

    //收集数据
    if( (spanValue == undefined) || (spanValue == "")  ){
        $(this).parent().prev().children("span").attr("data-must","no");
        //$(this).parent().prev().css("borderColor","#c33");
    }else{
        modalNewEditor[spanOption] = spanValue;
        $(this).parent().prev().children("span").attr("data-must","yes");
        $(this).parent().prev().css("borderColor","#cbcbcb");

    }

});

//新建--input
function templateNameChange(obj){
    if( $(obj).val()!=="" ) {
        console.log("yes");
        console.log( $(obj).val() );
        $(obj).attr("data-must","yes");
        $(obj).parent().css("borderColor","#cbcbcb");
        var spanValue=$(obj).val();
        var spanOption=$(obj).attr("data-option");
        modalNewEditor[spanOption] = spanValue;
    }else{
        $(obj).attr("data-must","no");
        //$(obj).parent().css("borderColor","#c33");
        console.log("no");
    }
    //console.log( $(obj).val() );
}
//判断
$("#modalNewEditorBtn").click(function(){
    var dataMusts=$("#modalNewEditor .dataMust");
    var must="yes";
    for( var i=0;i<dataMusts.length;i++ ){
        if( $(dataMusts[i]).attr("data-must")=="no" ){
            $(dataMusts[i]).parent().css("borderColor","#c33");
            must="no";
        }
    }
    if( must=="no" ){
        alert("请填写完整");
    }else{
        $("#modalNewEditor").modal("hide");
        console.log( modalNewEditor );
    }
});
































