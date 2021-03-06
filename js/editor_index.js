/**
 * Created by 大丽丽 on 2017/5/5.
 */
//模板类型
//var basePath="http://192.168.31.156:8400/";
function templateType() {
    $.ajax({
        async: false,
        cache: true,
        type: 'post',
        dataType : "jsonp",
        data:{callBack:"templateTypeCallback"},  //参数
        url:basePath+"template_editor/templateType.do"//请求的action路径
    });
}
function templateTypeCallback(data) {
    var list=data;
    $(".templateTypeList").html("");
    var str='<p class="modalSelect modalAct">';
    str+='<span class="dataMust" data-option="templateType" data-value="" data-must="no">选择模板类型</span>';
    str+='<i class="icon icon-chevron-down"></i>';
    str+='</p>';
    str+='<div class="modalAlter">';
    str+='<p class="modalTxt modalNew modalLeadIn">';
    str+='<i class="icon"></i>';
    str+='<span data-value="">选择模板类型</span>';
    str+='</p>';
    for( var i=0;i<data.length;i++ ){
        str+='<p class="modalTxt modalNew modalLeadIn">';
        str+='<i class="icon"></i>';
        str+='<span data-value="'+list[i].value+'">'+list[i].html+'</span>';
        str+='</p>';
    }
    str+='</div>';

    $(".templateTypeList").append(str);
}
templateType();

//模板类型----导入下边那个接口
function templateSonList() {
    var templateType=$("#modalLeadIn [data-option='templateType']").attr("data-value");
    if( (templateType!=='')&&(templateType!==undefined) ){
        //console.log( templateType );
        $.ajax({
            async: false,
            cache: true,
            type: 'post',
            dataType : "jsonp",
            data:{callBack:"templateSonListCallback",templateType:templateType},  //参数
            url:basePath+"template_editor/templateSonList.do"//请求的action路径
        });
    }
}
function templateSonListCallback(data) {
    //console.log("ok");
    var list=data;
    //console.log(list);
    $(".templateLeadIn").html("");
    var str='<p class="modalSelect modalAct">';
    str+='<span class="dataMust" data-option="templateLeadIn" data-value="" data-must="no">选择要导入的模板</span>';
    str+='<i class="icon icon-chevron-down"></i>';
    str+='</p>';
    str+='<div class="modalAlter">';
    str+='<p class="modalTxt modalLeadIn">';
    str+='<i class="icon"></i>';
    str+='<span data-value="">选择要导入的模板</span>';
    str+='</p>';
    for( var i=0;i<data.length;i++ ){
        str+='<p class="modalTxt modalLeadIn">';
        str+='<i class="icon"></i>';
        str+='<span data-value="'+list[i].value+'">'+list[i].html+'</span>';
        str+='</p>';
    }
    str+='</div>';

    $(".templateLeadIn").append(str);
}


//模板风格
function blockStyleList() {
    $.ajax({
        async: false,
        cache: true,
        type: 'post',
        dataType : "jsonp",
        data:{callBack:"blockStyleListCallback"},  //参数
        url:basePath+"template_editor/blockStyleList.do"//请求的action路径
    });
}
function blockStyleListCallback(data) {
    var list=data;
    //console.log(list);
    $("#blockStyleList").html("");
    var str='<p class="modalSelect modalAct">';
    str+='<span class="dataMust" data-option="blockStyle" data-value="" data-must="no">选择界面风格</span>';
    str+='<i class="icon icon-chevron-down"></i>';
    str+='</p>';
    str+='<div class="modalAlter">';
    str+='<p class="modalTxt modalNew">';
    str+='<i class="icon"></i>';
    str+='<span data-value="">选择界面风格</span>';
    str+='</p>';
    for( var i=0;i<data.length;i++ ){
        str+='<p class="modalTxt modalNew">';
        str+='<i class="icon"></i>';
        str+='<span data-value="'+list[i].value+'">'+list[i].html+'</span>';
        str+='</p>';
    }
    str+='</div>';

    $("#blockStyleList").append(str);
}
blockStyleList();

//栅格+布局
function templateLayoutStr(){
    var templateLayoutStr='';
    console.log($('[data-option="gridSize"]').attr("data-value"));
    if( $('[data-option="gridSize"]').attr("data-value")=="3" ){
        console.log(3);
        templateLayoutStr='';
        $("#templateLayoutList .modalAlter").html("");
        $('[data-option="templateLayout"]').html("选择页面布局");
        $('[data-option="templateLayout"]').attr("data-value","");
        templateLayoutStr='<p class="modalTxt modalLayout modalNew">';
        templateLayoutStr+='<img src="../../img/editor/layout01.png" alt=""/>';
        templateLayoutStr+='<span data-value="layout01_3g">界面布局1</span>';
        templateLayoutStr+='</p>';
        templateLayoutStr+='<p class="modalTxt modalImg modalLayout modalNew">';
        templateLayoutStr+='<img src="../../img/editor/layout02.png" alt=""/>';
        templateLayoutStr+='<span data-value="layout02_3g">界面布局2</span>';
        templateLayoutStr+='</p>';
        templateLayoutStr+='<p class="modalTxt modalImg modalLayout modalNew">';
        templateLayoutStr+='<img src="../../img/editor/layout03.png" alt=""/>';
        templateLayoutStr+='<span data-value="layout03_3g">界面布局3</span>';
        templateLayoutStr+='</p>';
        templateLayoutStr+='<p class="modalTxt modalImg modalLayout modalNew">';
        templateLayoutStr+=' <img src="../../img/editor/layoutNew.png" alt=""/>';
        templateLayoutStr+='<span  data-value="layoutCustom_3g">自定义布局</span>';
        templateLayoutStr+='</p>';
        $("#templateLayoutList .modalAlter").append(templateLayoutStr);
    }else if( $('[data-option="gridSize"]').attr("data-value")=="4" ){
        console.log(4);
        templateLayoutStr='';
        $("#templateLayoutList .modalAlter").html("");
        $('[data-option="templateLayout"]').html("选择页面布局");
        $('[data-option="templateLayout"]').attr("data-value","");
        templateLayoutStr='<p class="modalTxt modalLayout modalNew">';
        templateLayoutStr+='<img src="../../img/editor/layout01_4g.png" alt=""/>';
        templateLayoutStr+='<span data-value="layout01_4g">界面布局1</span>';
        templateLayoutStr+='</p>';
        templateLayoutStr+='<p class="modalTxt modalImg modalLayout modalNew">';
        templateLayoutStr+='<img src="../../img/editor/layout02_4g.png" alt=""/>';
        templateLayoutStr+='<span data-value="layout02_4g">界面布局2</span>';
        templateLayoutStr+='</p>';
        //templateLayoutStr+='<p class="modalTxt modalImg modalLayout modalNew">';
        //templateLayoutStr+='<img src="../../img/editor/layout03.png" alt=""/>';
        //templateLayoutStr+='<span data-value="layout03_4g">界面布局3</span>';
        //templateLayoutStr+='</p>';
        templateLayoutStr+='<p class="modalTxt modalImg modalLayout modalNew">';
        templateLayoutStr+=' <img src="../../img/editor/layoutNew.png" alt=""/>';
        templateLayoutStr+='<span  data-value="layoutCustom_4g">自定义布局</span>';
        templateLayoutStr+='</p>';
        $("#templateLayoutList .modalAlter").append(templateLayoutStr);
    }
}






//新建模板--名字的重复判断
function judgeTemplateName() {
    var templateName=$("#templateName").val();
    var templateType=$("#modalNewEditor [data-option='templateType']").attr("data-value");
    if( (templateName!==undefined)&&(templateName!=='')&&(templateType!=='')&&(templateType!==undefined) ){
        $.ajax({
            async: false,
            cache: true,
            type: 'post',
            dataType : "jsonp",
            data:{callBack:"judgeTemplateNameCallback",templateName:templateName,templateType:templateType},  //参数
            url:basePath+"template_editor/judgeTemplateName.do"//请求的action路径
        });
    }
}
function judgeTemplateNameCallback(data){
    var list=data;
    if( list.exist=="yes" ){
        $(".existAlert").css("display","block");
        $(".templateNameCon").css("borderBottomColor","#ea4335");
    }else if(list.exist=="no"){
        $(".existAlert").css("display","none");
        $(".templateNameCon").css("borderBottomColor","#cbcbcb");
    }
}

//    悬浮--新建，导入
$('[data-toggle="tooltip"]').tooltip();

//页面高度
$(".main").css("width",(parseFloat( window.screen.availWidth )-230-230)+"px");
$(".main").css("height",(parseFloat(window.screen.availHeight)-65-65)+"px");
$(".partAll").css("height",(parseFloat(window.screen.availHeight)-65-65)+"px");
$(".property").css("height",(parseFloat(window.screen.availHeight)-65-65)+"px");

// 对话框--样式
$(".myModal").on("click",".modalCon .modalSelect",function(){
    console.log(1);
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

var modalLeadIn ={};
var modalNewEditor ={};
//对话框数据--新建,对话框数据--导入
$(".myModal").on("click",".modalAlter .modalTxt",function(){
    console.log(2);
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

    if( $(this).parent().attr("id")=="gridSizeParent" ){
        templateLayoutStr();
    }

    //收集数据
    if( (spanValue == undefined) || (spanValue == "")  ){
        $(this).parent().prev().children("span").attr("data-must","no");
        //$(this).parent().prev().css("borderColor","#c33");
    }else{
        if( $(this).hasClass("modalNew") ){
            modalNewEditor[spanOption] = spanValue;
        }
        if($(this).hasClass("modalLeadIn")){
            modalLeadIn[spanOption] = spanValue;
        }

        $(this).parent().prev().children("span").attr("data-must","yes");
        $(this).parent().prev().css("borderColor","#cbcbcb");
    }

    judgeTemplateName();

    if( (($(this).parents("div")[$(this).parents("div").length-1].id)=="modalLeadIn")&&($(this).hasClass("modalNew"))&&($(this).hasClass("modalLeadIn")) ){
        templateSonList();
        //console.log($(this));
    }

});


//新建--input
function templateNameChange(obj){
    if( ($(obj).val()!=="") ) {
        //console.log("yes");
        //console.log( $(obj).val() );
        $(obj).attr("data-must","yes");
        //$(obj).parent().css("borderColor","#cbcbcb");
        var spanValue=$(obj).val();
        var spanOption=$(obj).attr("data-option");
        modalNewEditor[spanOption] = spanValue;
        judgeTemplateName();
    }else{
        $(obj).attr("data-must","no");
        //$(obj).parent().css("borderColor","#c33");
        console.log("no");
    }
}

var templateId;
// 新建确认按钮---判断
$("#modalNewEditorBtn").click(function(){
    var templateName=$("#templateName").val();
    var templateType=$("#modalNewEditor [data-option='templateType']").attr("data-value");
    var dataMusts=$("#modalNewEditor .dataMust");
    var must="yes";
    for( var i=0;i<dataMusts.length;i++ ){
        if( $(dataMusts[i]).attr("data-must")=="no" ){
            $(dataMusts[i]).parent().css("borderColor","#c33");
            must="no";
        }
    }
    if( (must=="no")||($(".existAlert").css("display")=="block") ){
        alert("请填写完整");
    }else{
        $.ajax({
            async: false,
            cache: true,
            type: 'post',
            dataType : "jsonp",
            data:{callBack:"saveTemplateDataCallback",templateName:templateName,templateType:templateType},  //参数
            url:basePath+"template_editor/saveTemplateData.do"//请求的action路径
        });



    }
});
function saveTemplateDataCallback(data){
    if(data.templateId=="no"){
        $(".existAlert").css("display","block");
        $(".templateNameCon").css("borderBottomColor","#ea4335");
    }else{
        $(".existAlert").css("display","none");
        $(".templateNameCon").css("borderBottomColor","#cbcbcb");
        templateId=data.templateId;
        modalNewEditor["templateId"]=templateId;
        $("#modalNewEditor").modal("hide");

        $.zui.store.set('modalNewEditorName', modalNewEditor);
        console.log( modalNewEditor );
        //window.open('index.html');
        window.location.href="index.html";
    }
}



// 导入确认按钮---判断
$("#modalLeadInBtn").click(function(){
    var dataMusts=$("#modalLeadIn .dataMust");
    var must="yes";
    for( var i=0;i<dataMusts.length;i++ ){
        if( $(dataMusts[i]).attr("data-must")=="no" ){
            $(dataMusts[i]).parent().css("borderColor","#c33");
            must="no";
        }
    }
    if( (must=="no")||($(".existAlert").css("display")=="block") ){
        alert("请填写完整");
    }else{
        var templateIdVal=$('[data-option="templateLeadIn"]').attr("data-value");
        $.ajax({
            async: false,
            cache: true,
            type: 'post',
            dataType : "jsonp",
            data:{callBack:"getTemplateCodeCallback",templateId:templateIdVal},  //参数
            url:basePath+"template_editor/getTemplateCode.do"//请求的action路径
        });
    }
});

function getTemplateCodeCallback(data){
    var templateIdVal=$('[data-option="templateLeadIn"]').attr("data-value");
    $("#modalLeadIn").modal("hide");
    var importData=data.templateCode;
    $.zui.store.set('importName',importData);
    window.location.href="import.html?templateId="+templateIdVal;
}











