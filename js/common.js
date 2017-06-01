/**
 * Created by 大丽丽 on 2017/5/9.
 */
//相关推荐
$(".propertyShow").on("change",".switchLink input",function(){
    if( $(this).prop("checked") ){
        $(this).parent().next().slideUp();
    }else{
        $(this).parent().next().slideDown();
    }
});
//    悬浮--新建，导入
$('[data-toggle="tooltip"]').tooltip();
//   页面高度，宽度
$(".main").css("width",(parseFloat( window.screen.availWidth )-230-230)+"px");
autoHeight();
function autoHeight(){
    $(".main").css("height",(parseFloat(window.screen.availHeight)-65-65)+"px");
    $(".partAll").css("height",(parseFloat(window.screen.availHeight)-65-65)+"px");
    $(".property").css("height",(parseFloat(window.screen.availHeight)-65-65)+"px");
}
//    对话框
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
$(".modalAlter .modalTxt").click(function(){
    $(this).siblings().removeClass("modalTxtSelect");
    $(this).siblings().children("i").removeClass("icon-check");
    $(this).children("i").addClass("icon-check");
    $(this).addClass("modalTxtSelect");
    $(this).parent().slideUp();
    $(this).parent().prev().removeClass("modalBorder");
    $(this).parent().prev().children("i").removeClass("icon-chevron-up").addClass("icon-chevron-down");
    $(this).parent().prev().children("span").html( $(this).children("span").html() );
});
//全屏
var fullS_flag = "no";
function gofullScreen(){
    var content = document.documentElement;
    if(fullS_flag == "no"){
        fullScreen(content);
        fullS_flag ="yes";
        $(".fullScreen").attr("src","../../img/editor/existFullScreen.png");
        $(".partAll").css("height",(parseFloat(window.screen.height))+"px");
        $(".main").css("height",(parseFloat(window.screen.height))+"px");
        $(".property").css("height",(parseFloat(window.screen.height))+"px");

    }else{
        exitFullScreen();
        fullS_flag ="no";
        $(".fullScreen").attr("src","../../img/editor/fullScreen.jpg");
        autoHeight();
    }
}
function fullScreen(el) {
    var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen,
        wscript;
    if(typeof rfs != "undefined" && rfs) {
        rfs.call(el);
        return;
    }
    if(typeof window.ActiveXObject != "undefined") {
        wscript = new ActiveXObject("WScript.Shell");
        if(wscript) {
            wscript.SendKeys("{F11}");
        }
    }
}
function exitFullScreen(el) {
    var el= document,
        cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen,
        wscript;
    if (typeof cfs != "undefined" && cfs) {
        cfs.call(el);
        return;
    }
    if (typeof window.ActiveXObject != "undefined") {
        wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
            wscript.SendKeys("{F11}");
        }
    }
}




//新建编辑器--带过来的数据
//var basePath="http://192.168.31.156:8400/";
var modalNewEditor;
//var modalLeadIn;
if( $.zui.store.get('modalNewEditorName')!==undefined ){
    modalNewEditor=$.zui.store.get('modalNewEditorName');
    console.log(modalNewEditor);
    $("#gridSize").val(modalNewEditor.gridSize);
    $("#blockStyle").val(modalNewEditor.blockStyle);
    $("#templateColor").val(modalNewEditor.templateColor);
    $("#templateId").val(modalNewEditor.templateId);
    $("#templateLayout").val(modalNewEditor.templateLayout);
    $("#templateName").val(modalNewEditor.templateName);
}else{
    console.log("空的");
}

//栅格系统
var gridSizeVal=$("#gridSize").val();
//创建script标签并引入js文件\
if( $("#WhetherDraft").val()=="0" ){
    var oS = document.createElement('script');
    oS.src = "../../js/common.Editor_"+gridSizeVal+"g.js";
    document.getElementById("gridSizeScript").innerHTML="";
    document.getElementById("gridSizeScript").appendChild(oS);

    var oS2 = document.createElement('script');
    oS2.src = "../../js/zui.dashboard_"+gridSizeVal+"g.js";
    document.getElementById("gridDashboardScript").innerHTML="";
    document.getElementById("gridDashboardScript").appendChild(oS2);
}
//组件风格
var blockStyleVal=$("#blockStyle").val();
//模板配色
var templateColorVal=$("#templateColor").val();
$("#templateColorLink").attr("href","../../css/"+templateColorVal+".css");
//模板Id
var templateIdVal=$("#templateId").val();
//模板布局
var templateLayoutVal=$("#templateLayout").val();
//模板名字
var templateName=$("#templateName").val();
//导入编辑器--带过来的数据
//if( $.zui.store.get('modalLeadInName')!==undefined ){
//    modalLeadIn=$.zui.store.get('modalLeadInName');
    //console.log(modalLeadIn);
    //$.zui.store.pageRemove('modalLeadInName');
    //$.zui.store.remove('modalNewEditor');
    //$("#templateLeadIn").val(modalLeadIn.templateLeadIn);
//}
//var modalLeadInVal=$("#templateLeadIn").val();
//console.log(modalLeadInVal);
//console.log(modalLeadIn);

