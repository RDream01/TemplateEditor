
var option = [];
var optionSelect={};
var obj ="";
var input=$("#objInput").val();
var objInput=eval("("+input+")");
obj=objInput;

var  baseShowId = $("#baseShowId").val();
var  baseGroupId = $("#baseGroupId").val();

//页面布局
function layout(){
    //页面布局
    var layoutStr='';
    if( gridSizeVal=="3" ){
        if( templateLayoutVal=="layout01_3g" ){
            importGroupDiv(3);
            importGroupDiv(2);
            importGroupDiv(1);
            importGroupDiv(3);
        }else if( templateLayoutVal=="layout02_3g" ){
            importGroupDiv(3);
            importGroupDiv(1);
            importGroupDiv(1);
            importGroupDiv(1);
            importGroupDiv(3);
        }else if( templateLayoutVal=="layout03_3g" ){
            importGroupDiv(3);
            importGroupDiv(1);
            importGroupDiv(2);
            importGroupDiv(3);
        }
    }else if( gridSizeVal=="4" ){
        if( templateLayoutVal=="layout01_4g" ){
            importGroupDiv(4);
            importGroupDiv(1);
            importGroupDiv(1);
            importGroupDiv(1);
            importGroupDiv(1);
            importGroupDiv(4);
        }else if( templateLayoutVal=="layout02_4g" ){
            importGroupDiv(4);
            importGroupDiv(3);
            importGroupDiv(1);
            importGroupDiv(4);
        }
        //else if( templateLayoutVal=="layout03_4g" ){
        //    importGroupDiv(4);
        //    importGroupDiv(3);
        //    importGroupDiv(1);
        //    importGroupDiv(4);
        //}
    }

}

//1---引用文件
function blockLeftList( selectObj,inputObj ) {
    //左边组件类型
    var selectVal=$(selectObj).val();
    //左边查询组件
    var inputVal=$(inputObj).val();
    $.ajax({
        async: false,
        cache: true,
        type: 'post',
        dataType : "jsonp",
        data:{gridSize:gridSizeVal,blockType:selectVal,searchBlockName:inputVal,blockStyleEng:blockStyleVal,callBack:"blockLeftListCallback"},  //参数
        url:basePath+"template_editor/blockLeftList",//请求的action路径
        error: function () {//请求失败处理函数
        },
        success: function (data) { //请求成功后处理函数。
        }
    });
}
//模板名字
var editorName=$("#templateName").val();
$(".editorName span").html("——"+editorName);

function blockLeftListCallback(data) {
    $(".partClassify").html("");
    var list = data;
    for (var i = 0; i < list.length; i++) {
        var str = '';
        //if (list[i].blockType == "list") {
            if ($("#"+list[i].blockType +"Block").html() == undefined) {
                str='<div class="partOption" id="'+list[i].blockType +'Block"><p class="partOptionTitle">'+list[i].typeName+'</p>';
                str+='<div class="with-padding">' ;
                str+='<p class="partImg secPart btn-droppable" data-blockId="'+list[i].blockId+'" data-blockSize="'+list[i].blockSize+'" id="' + list[i].blockId + '">' ;
                str+='<img src="../../img/editor/part01.png" alt=""/><span>'+ list[i].blockName + '</span></p>';
                str+='</div></div>';
            }else{
                str+='<p class="partImg secPart btn-droppable" data-blockId="'+list[i].blockId+'" data-blockSize="'+list[i].blockSize+'" id="' + list[i].blockId + '">' ;
                str+='<img src="../../img/editor/part01.png" alt=""/><span>'+ list[i].blockName + '</span></p>';
                $('#'+list[i].blockType +'Block .with-padding').append(str);
                continue;
            }
        $('.partClassify').append(str);
    }
}

//左边组件库铺数据
function blockTypeList() {
    $.ajax({
        async: false,
        cache: true,
        type: 'post',
        dataType : "jsonp",
        data:{callBack:"blockTypeListCallback"}, //参数
        //url:"http://192.168.31.2/template_editor/blockTypeList.do",//请求的action路径
        url:basePath+"template_editor/blockTypeList",//请求的action路径
        error: function () {//请求失败处理函数
        },
        success: function (data) { //请求成功后处理函数。
        }
    });
}
function blockTypeListCallback(data){
    var list = data;
    for (var i = 0; i < list.length; i++) {
        var data="";
        data+='<option value="'+list[i].value+'">'+list[i].html+'</option>';
        $('.partSelect').append(data);
    }
}

//组合框文件引用
function importGroupDiv(num){
    var data="";
    if(num == '1'){
        data ='<div class="col-xs-3 row groupDiv list-group-item droppable-target" data-groupSize="3" style="min-height:300px;">'
        +'<div data-trigger="sortArea" class="sortArea col-md-12 col-sm-12"><span class="area-name">组合框1，</span>拖拽我--1<span class="deleteGroup" onclick="openGroupConfirm(this)">X</span></div>'
        +'<div class="col-md-12 col-sm-12 firstLocation"  id="groupDiv" style="position:absolute;z-index:-1">'
        +'<div class="panel">'
        +'<div class="panel-heading">'
        +'<span class="title"></span>'
        +'</div>'
        +'<div class="panel-body"></div>'
        +'</div>'
        +'</div>'
        +'</div>';
    }else if(num == '2'){
        data ='<div class="col-xs-6 row groupDiv list-group-item droppable-target" data-groupSize="6" style="min-height:300px;">'
        +'<div data-trigger="sortArea"  class="sortArea col-md-12 col-sm-12"><span class="area-name">组合框2，</span>拖拽我--2<span class="deleteGroup" onclick="openGroupConfirm(this)">X</span></div>'
        + '<div class="col-md-12 col-sm-12 firstLocation" id="groupDiv" style="position:absolute;z-index:-1">'
        + '<div class="panel">'
        + '<div class="panel-heading">'
        + '<span class="title"></span>'
        + '</div>'
        + '<div class="panel-body"></div>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>';
    } else if (num == '3') {
        data = '<div class="col-xs-9 row groupDiv list-group-item droppable-target"  data-groupSize="9" style="min-height:300px;">'
        + '<div data-trigger="sortArea" class="sortArea col-md-12 col-sm-12"><span class="area-name">组合框3，</span>拖拽我--3<span class="deleteGroup" onclick="openGroupConfirm(this)">X</span></div>'
        + '<div class="col-md-12 col-sm-12 firstLocation"  id="groupDiv" style="position:absolute;z-index:-1">'
        + '<div class="panel">'
        + '<div class="panel-heading">'
        + '<span class="title"></span>'
        + '</div>'
        + '<div class="panel-body"></div>'
        + '</div>'
        + '</div>'
        + '</div>';
    }else if (num == '4') {
        data = '<div class="col-xs-12 row groupDiv list-group-item droppable-target"  data-groupSize="12" style="min-height:100px;">'
        + '<div data-trigger="sortArea" class="sortArea col-md-12 col-sm-12"><span class="area-name">组合框4，</span>拖拽我--4<span class="deleteGroup" onclick="openGroupConfirm(this)">X</span></div>'
        + '<div class="col-md-12 col-sm-12 firstLocation"  id="groupDiv" style="position:absolute;z-index:-1">'
        + '<div class="panel">'
        + '<div class="panel-heading">'
        + '<span class="title"></span>'
        + '</div>'
        + '<div class="panel-body"></div>'
        + '</div>'
        + '</div>'
        + '</div>';
    }
    $('.editorBlock>div>div.row').append(data);
    $('.groupDiv:last-child').attr("data-groupShowId",num+"group"+baseGroupId);
    baseGroupId++;

    moveAll();
    var optionsTrigger = {
        selector:'.list-group-item',
        trigger: '[data-trigger="sortArea"]'
    };
    $('#sortableList').sortable(optionsTrigger);

    saveActionHistory($('#sortableList').html().trim(),$('#htmlCode2').html().trim(),obj);//undo redo
}
//栅格系统铺数据
function gridSize(){
    var gridSizeStr='';
    if( gridSizeVal=="3" ){
        gridSizeStr='<p onclick="importGroupDiv(\''+1+'\')" class="secPart layoutImg" id="groupDiv1">';
        gridSizeStr+='<img src="../../img/editor/layout_3g1.png" alt=""/>';
        gridSizeStr+='</p>';
        gridSizeStr+='<p onclick="importGroupDiv(\''+2+'\')" class="secPart layoutImg" id="groupDiv2">';
        gridSizeStr+='<img src="../../img/editor/layout_3g2.png" alt=""/>';
        gridSizeStr+='</p>';
        gridSizeStr+='<p onclick="importGroupDiv(\''+3+'\')" class="secPart layoutImg" id="groupDiv3">';
        gridSizeStr+='<img src="../../img/editor/layout_3g3.png" alt=""/>';
        gridSizeStr+='</p>';
        $(".main").addClass("gridSizeThree");
        $(".main").removeClass("gridSizeFour");
        $('#gridSizeStr').append(gridSizeStr);
    }else if( gridSizeVal=="4" ){
        gridSizeStr='<p onclick="importGroupDiv(\''+1+'\')" class="secPart layoutImg" id="groupDiv1">';
        gridSizeStr+='<img src="../../img/editor/layout_4g1.png" alt=""/>';
        gridSizeStr+='</p>';
        gridSizeStr+='<p onclick="importGroupDiv(\''+2+'\')" class="secPart layoutImg" id="groupDiv2">';
        gridSizeStr+='<img src="../../img/editor/layout_4g2.png" alt=""/>';
        gridSizeStr+='</p>';
        gridSizeStr+='<p onclick="importGroupDiv(\''+3+'\')" class="secPart layoutImg" id="groupDiv3">';
        gridSizeStr+='<img src="../../img/editor/layout_4g3.png" alt=""/>';
        gridSizeStr+='</p>';
        gridSizeStr+='<p onclick="importGroupDiv(\''+4+'\')" class="secPart layoutImg" id="groupDiv3">';
        gridSizeStr+='<img src="../../img/editor/layout_4g4.png" alt=""/>';
        gridSizeStr+='</p>';
        $(".main").addClass("gridSizeFour");
        $(".main").removeClass("gridSizeThree");
        $('#gridSizeStr').append(gridSizeStr);
    }
}

//删除组合框
function openGroupConfirm(obj){
    $("#groupDelete").modal('show', 'fit');
    var groupId=$(obj).parent().parent().attr("data-groupShowId");
    $("#groupDelete #groupBlockBtn").attr("onclick","deleteGroup('"+groupId+"')");
}
function deleteGroup(groupId){
    $("[data-groupshowid='"+groupId+"']").remove();
    saveActionHistory($('#sortableList').html().trim(),$('#htmlCode2').html().trim(),$("[data-groupshowid='"+groupId+"']").find(".deleteGroup"));//undo redo
    $("#groupDelete").modal('hide');
}

//right--属性
function propertyRightList(id) {
    $.ajax({
        async: false,
        cache: true,
        type: 'post',
        dataType : "jsonp",
        data:{blockId:id,callBack:'propertyRightListCallback'}, //参数
        //url:"http://192.168.31.2/template_editor/propertyRightList.do",//请求的action路径
        url:basePath+"template_editor/propertyRightList",//请求的action路径
        error: function () {//请求失败处理函数

        },
        success: function (data) { //请求成功后处理函数。
        }
    });
}

//拖拽
function importFile(id, nextShowId, size,groupDiv) {
    //找到源文件
    $.get("../../editorBlock/"+blockStyleVal+"/"+ id + ".html", function (data) {
        var block_showId;
        var GroupShowId = $(groupDiv).attr("data-groupShowId");
        block_showId = id+ "_" + baseShowId+"_"+GroupShowId;
        baseShowId ++;
        //增加是否填写属性必选项的框
        notNull();
        //清楚所有选中框
        $(".indexAll .appendStr .panel").removeClass('appendCur');
        //固定替换流程
        data = data.replace(/&lt;/g,'<');
        data = data.replace(/&gt;/g,'>');
        data = data.replace(/showId/g, '');
        data = data.replace(/"exist"/g, '');
        data = data.replace("panel", "panel appendCur");
        data = data.replace(/vData/g, "vData_" + block_showId);
        //判断区块是否可以添加到组合框内
        var ids = block_showId.split("_");
        var blockWidth = 3;
        if(ids[1] == "4g2"){
            blockWidth = 6;
        }else if(ids[1] == "4g3" ){
            blockWidth = 9;
        }else if(ids[1] == "4g4"){
            blockWidth = 12;
        }
        //通过下一个组件的showID，append到拖拽之前的位置
        if (nextShowId == "") {
            $(groupDiv).append(data);
        } else {
            $("[data-showId=" + nextShowId + "]").before(data);
        }
        //增加showId
        optionSelect = {};
        optionSelect.id = id;
        optionSelect.showId = block_showId;

        if( $(".appendCur").attr("data-header")=="header" ){
            optionSelect.blockType = "header";
        }else if( $(".appendCur").attr("data-footer")=="footer" ){
            optionSelect.blockType = "footer";
        }

        $(".appendCur").parent().attr("data-showId", optionSelect.showId);
        $(".appendCur").parent().attr("data-size", size);
        $(".appendCur").attr("data-id", optionSelect.showId);  //zui ***
        var blockSize = $(".appendCur").parent().attr("data-blockSize");
        var groupDivSize = $(".appendCur").parent().parent().attr("data-groupSize");
        var finalSize = countSize(blockSize, groupDivSize);
        if (finalSize == -1) {
            console.log("尴尬，放不进去");
            var j;
            for (var i = 0; i < obj.section.length; i++) {
                if (obj.section[i].showId == block_showId) {
                    j = i;
                    break;
                }
            }
            obj.section.splice(j, 1);

            $("[data-showId=" + block_showId + "]").remove();
            $(".property .propertyShow").html("");
            return;
        } else {
            var md = "col-md-" + finalSize;
            var sm = "col-sm-" + finalSize;
            if (blockSize == 3) {
                $(".appendCur").parent().removeClass("col-md-3");
                $(".appendCur").parent().removeClass("col-sm-3");
            } else if (blockSize == 6) {
                $(".appendCur").parent().removeClass("col-md-6");
                $(".appendCur").parent().removeClass("col-sm-6");
            } else if (blockSize == 9) {
                $(".appendCur").parent().removeClass("col-md-9");
                $(".appendCur").parent().removeClass("col-sm-9");
            }else if (blockSize == 12) {
                $(".appendCur").parent().removeClass("col-md-12");
                $(".appendCur").parent().removeClass("col-sm-12");
            }
            $(".appendCur").parent().addClass(md);
            $(".appendCur").parent().addClass(sm);
        }
        obj.section.push(optionSelect);
        //属性
        propertyRightList(id);
        $('.newSection').dashboard();
    });
}
//占比算法
function countSize(blockSize, groupDivSize) {
    var finalSize = 12 / (groupDivSize / blockSize);
    if (finalSize > 12) {
        return -1;
    }
    return finalSize;
}

//2---组件显示状态
$('.indexAll').on("click", ".appendStr", function () {
    notNull();
    $(".indexAll .appendStr ").children(".panel").removeClass('appendCur');
    $(this).children(".panel").addClass("appendCur");
    var id = $(this).attr("id");
    propertyRightList(id);

});
//right--属性
function propertyRightList(id) {
    $.ajax({
        async: false,
        cache: true,
        type: 'post',
        dataType : "jsonp",
        data:{blockId:id,callBack:'propertyRightListCallback'},  //参数
        //url:"http://192.168.31.2/template_editor/propertyRightList.do",//请求的action路径
        url:basePath+"template_editor/propertyRightList",//请求的action路径
        error: function () {//请求失败处理函数

        },
        success: function (data) { //请求成功后处理函数。
        }
    });
}

//    相关推荐
$(".property").on("change",".propertyRelatedAll input",function(){
    if( $(this).prop("checked") ){
        $(this).parent().next().slideDown();
    }else{
        $(this).parent().next().slideUp();
    }
});
function propertyRightListCallback(data) {
    var list = data;
    $(".property .propertyShow").html("");
    var showId = $(".appendCur").parent().attr("data-showId");
    var blockProAll;
    for (var i = 0; i < obj.section.length; i++) {
        if (obj.section[i].showId == showId) {
            blockProAll = obj.section[i];
        }
    }
    for (var i = 0; i < list.length; i++) {
        var str = "";
        if (list[i].propertyType == "text") {
            str = '<div class="propertyOption">';
            str += '<label class="propertyLabel" for="' + list[i].propertyId + '">';
            if (list[i].notNull == "yes") {
                str += '<span class="notNullColor">* </span>';
            }
            str += list[i].propertyName + '</label>';
            str += '<input class="propertyInputBig" data-notNull="' + list[i].notNull + '" onchange="collectProperty(this,' + list[i].minValue + ',' + list[i].maxValue + ')" type="text" id="' + list[i].propertyId + '"';
            var curId = list[i].propertyId;
            str += 'value="';
            if (blockProAll[curId] !== undefined) {
                str += blockProAll[curId];
            } else if (list[i].defaultValue !== undefined && list[i].defaultValue != "null") {
                str += list[i].defaultValue;
            }
            str += '"';
            str += ' placeholder="'+list[i].propertyName+'">';
            str += '<input type="hidden" id="' + list[i].propertyId + '_undoRedo" value="';//undo redo 存储修改之前的属性值
            if (blockProAll[curId] !== undefined ) {
                str += blockProAll[curId];
            } else if (list[i].defaultValue !== undefined && list[i].defaultValue != "null") {
                str += list[i].defaultValue;
            }
            str += '" /></div>';
        } else if (list[i].propertyType == "number") {
            str = '<div class="propertyOption"><label class="propertyLabel" for="' + list[i].propertyId + '">';
            if (list[i].notNull == "yes") {
                str += '<span class="notNullColor">* </span>';
            }
            str += list[i].propertyName + '</label>';
            str += '<input data-notNull="' + list[i].notNull + '" onchange="collectProperty(this,' + list[i].minValue + ',' + list[i].maxValue + ')" type="number" id="' + list[i].propertyId + '"';
            var curId = list[i].propertyId;
            str += 'value="';
            if (blockProAll[curId] !== undefined) {
                str += blockProAll[curId];
            } else if (list[i].defaultValue !== undefined) {
                str += list[i].defaultValue;
            }
            str += '"';
            str += ' class="propertyInputSm" placeholder="'+list[i].propertyName+'">';
            str += '<input type="hidden" id="' + list[i].propertyId + '_undoRedo" value="';//undo redo 存储修改之前的属性值
            if (blockProAll[curId] !== undefined) {
                str += blockProAll[curId];
            } else if (list[i].defaultValue !== undefined) {
                str += list[i].defaultValue;
            }
            str += '" /></div>';
        } else if (list[i].propertyType == "select") {
            str = '<div class="propertyOption"><label class="propertyLabel" for="' + list[i].propertyId + '">';
            if (list[i].notNull == "yes") {
                str += '<span class="notNullColor">* </span>';
            }
            str += list[i].propertyName + '</label>';
            str += '<select class="propertyInputBig" onchange="collectProperty(this)" data-notNull="' + list[i].notNull + '" id="' + list[i].propertyId + '" >';
            str += '<option value="">请选择</option>';
            for (var j = 0; j < list[i].data.length; j++) {
                str += '<option value="' + list[i].data[j].value + '"';
                var curId = list[i].propertyId;
                if ((blockProAll[curId] !== undefined) && (blockProAll[curId] !== "")) {
                    if (blockProAll[curId] == list[i].data[j].value) {
                        str += 'selected';
                    }
                } else if (list[i].defaultValue !== undefined) {
                    if (list[i].defaultValue == list[i].data[j].value) {
                        str += 'selected';
                    }
                }
                str += '>' + list[i].data[j].html + '</option>';
            }
            str += '</select>';
            str += '<input type="hidden" id="' + list[i].propertyId + '_undoRedo" value="';//undo redo 存储修改之前的属性值
            for (var j = 0; j < list[i].data.length; j++) {
                if ((blockProAll[curId] !== undefined) && (blockProAll[curId] !== "")) {
                    if (blockProAll[curId] == list[i].data[j].value) {
                        str += blockProAll[curId];
                    }
                } else if (list[i].defaultValue !== undefined) {
                    if (list[i].defaultValue == list[i].data[j].value) {
                        str += list[i].defaultValue;
                    }
                }
            }
            str += '" /></div>';
        } else if (list[i].propertyType == "radio") {
            str = '<div class="row control-group"><p class="control-label col-xs-3 ">';
            if (list[i].notNull == "yes") {
                str += '<span class="notNullColor">* </span>';
            }
            str += list[i].propertyName + '</p>';

            if (list[i].notNull == "yes") {
                var curId = list[i].propertyId;
                str += '<input type="hidden" id="' + list[i].propertyId + '_radio" value="';

                if ((blockProAll[curId] !== undefined) && (blockProAll[curId] !== "")) {
                    str += "1";
                } else if (list[i].defaultValue !== undefined) {
                    str += list[i].defaultValue;
                }
                str += '" data-notNull="yes"/>';
            }

            for (var j = 0; j < list[i].data.length; j++) {
                str += '<label><input name="' + list[i].propertyId + '" onchange=collectProperty(this) type="radio" value="' + list[i].data[j].value + '" ';
                var curId = list[i].propertyId;
                if ((blockProAll[curId] !== undefined) && (blockProAll[curId] !== "")) {
                    if (blockProAll[curId] == list[i].data[j].value) {
                        str += 'checked';
                    }
                } else if (list[i].defaultValue !== undefined) {
                    if (list[i].defaultValue == list[i].data[j].value) {
                        str += 'checked';
                    }
                }
                str += '/>' + list[i].data[j].html + '</label> ';
            }
            str += '<input type="hidden" id="' + list[i].propertyId + '_undoRedo" value="';//undo redo 存储修改之前的属性值
            for (var j = 0; j < list[i].data.length; j++) {
                if ((blockProAll[curId] !== undefined) && (blockProAll[curId] !== "")) {
                    if (blockProAll[curId] == list[i].data[j].value) {
                        str += blockProAll[curId];
                    }
                } else if (list[i].defaultValue !== undefined) {
                    if (list[i].defaultValue == list[i].data[j].value) {
                        str += list[i].defaultValue;
                    }
                }
            }
            str += '" /></div>';

        } else if (list[i].propertyType == "checkbox") {
            str = '<div class="row control-group"><p class="control-label col-xs-3 " for="' + list[i].propertyId + '">';
            //是否必填
            if (list[i].notNull == "yes") {
                str += '<span class="notNullColor">* </span>';
            }
            str += list[i].propertyName + '</p>';
            if (list[i].notNull == "yes") {
                var curId = list[i].propertyId;
                str += '<input type="hidden" id="' + list[i].propertyId + '_checkbox" value="';
                if ((blockProAll[curId] !== undefined) && (blockProAll[curId] !== "")) {
                    str += "1";
                } else if (list[i].defaultValue !== undefined) {
                    str += list[i].defaultValue;
                }
                str += '" data-notNull="yes"/>';
            }

            for (var j = 0; j < list[i].data.length; j++) {
                str += '<label><input name="' + list[i].propertyId + '" onclick=collectProperty(this) type="checkbox" value="' + list[i].data[j].value + '" ';
                if ((blockProAll[curId] !== undefined) && (blockProAll[curId] !== "")) {
                    var blockPro = blockProAll[curId].split(",");
                    for (var k = 0; k < blockPro.length; k++) {
                        if (blockPro[k] == list[i].data[j].value) {
                            str += 'checked';
                        }
                    }
                } else if (list[i].defaultValue !== undefined) {
                    var arr = (list[i].defaultValue).split(",");
                    for (var k = 0; k < arr.length; k++) {
                        if (arr[k] == list[i].data[j].value) {
                            str += 'checked';
                        }
                    }
                }
                str += '/>' + list[i].data[j].html + '</label>';
            }
            str += '<input type="hidden" id="' + list[i].propertyId + '_undoRedo" value="';//undo redo 存储修改之前的属性值
            if ((blockProAll[curId] !== undefined) && (blockProAll[curId] !== "")) {
                str += "1";
            } else if (list[i].defaultValue !== undefined) {
                str += list[i].defaultValue;
            }
            str += '" /></div>';
        }else if( list[i].propertyType == "switch" ){
            if( list[i].propertyId=="isCommon" ){
                str+='<div class="propertyRelatedAll">';
                str='<div class="switch switchLink text-left propertyOption">' ;
                str+='<input data-type="switch" type="checkbox" onchange="collectProperty(this)" data-notNull="' + list[i].notNull + '" id="' + list[i].propertyId + '"/><label>';
                if (list[i].notNull == "yes") {
                    str += '<span class="notNullColor">* </span>';
                }
                str+=''+list[i].propertyName+'</label>';

                str += '<input type="hidden" id="' + list[i].propertyId + '_undoRedo" value="';//undo redo 存储修改之前的属性值
                if ((blockProAll[curId] !== undefined) && (blockProAll[curId] !== "")) {
                    str += "1";
                } else if (list[i].defaultValue !== undefined) {
                    str += list[i].defaultValue;
                }
                str += '" /></div></div>';

            }else{
                str='<div class="propertyRelatedAll">';
                str+='<div class="switch text-left propertyOption">';
                str+='<input data-type="switch" type="checkbox" ';
                if(list[i].defaultValue=="yes"){
                    str+='checked ';
                }
                str+='onchange="collectProperty(this)" data-notNull="' + list[i].notNull + '" id="' + list[i].propertyId + '"/><label>' ;
                if (list[i].notNull == "yes") {
                    str += '<span class="notNullColor">* </span>';
                }
                str+=''+list[i].propertyName+'</label>';

                str += '<input type="hidden" id="' + list[i].propertyId + '_undoRedo" value="';//undo redo 存储修改之前的属性值
                if ((blockProAll[curId] !== undefined) && (blockProAll[curId] !== "")) {
                    str += "1";
                } else if (list[i].defaultValue !== undefined) {
                    str += list[i].defaultValue;
                }
                str += '" /></div>';

               if( list[i].childPropertyList!==undefined ){
                   if(list[i].childPropertyList != undefined && list[i].childPropertyList != undefined && list[i].childPropertyList.length > 0){
                   for(var h = 0;h<list[i].childPropertyList.length;h++){
                       if(list[i].childPropertyList[h].propertyType == "number"){
                           str += '<div ' ;
                           if(list[i].defaultValue=="yes"){
                               str+="style='display:block;'";
                           }
                           str+='class="propertyOption propertyRelated"><label class="propertyLabel" for="' + list[i].childPropertyList[h].propertyId + '">';
                           if (list[i].childPropertyList[h].notNull == "yes") {
                               str += '<span class="notNullColor">* </span>';
                           }
                           str += list[i].childPropertyList[h].propertyName + '</label>';
                           str += '<input data-notNull="' + list[i].childPropertyList[h].notNull + '" onchange="collectProperty(this,' + list[i].childPropertyList[h].minValue + ',' + list[i].childPropertyList[h].maxValue + ')" type="number" id="' + list[i].childPropertyList[h].propertyId + '"';
                           var curId = list[i].childPropertyList[h].propertyId;
                           str += 'value="';
                           if (blockProAll[curId] !== undefined) {
                               str += blockProAll[curId];
                           } else if (list[i].childPropertyList[h].defaultValue !== undefined) {
                               str += list[i].childPropertyList[h].defaultValue;
                           }
                           str += '"';
                           str += ' class="propertyInputSm" placeholder="'+list[i].childPropertyList[h].propertyName+'">';
                           str += '<input type="hidden" id="' + list[i].childPropertyList[h].propertyId + '_undoRedo" value="';//undo redo 存储修改之前的属性值
                           if (blockProAll[curId] !== undefined) {
                               str += blockProAll[curId];
                           } else if (list[i].childPropertyList[h].defaultValue !== undefined) {
                               str += list[i].childPropertyList[h].defaultValue;
                           }
                           str += '" /></div>';
                       }
                   }
                   }
               }
                str+='</div>';
            }
        }


        if( list[i].propertyId.indexOf("SS")>=0 ){
            $('.propertyLink .propertyShow').append(str);//下
        }else{
            if( list[i].propertyId=="isCommon" ){
                $('.propertyLink .propertyShow').prepend(str);//通用的开关
            }else{
                $('.propertyOptionAll .propertyShow').append(str); //上
            }

        }

    }
    $(".propertyShow").children(":odd").addClass("propertyBackDark");
    //$(".property").append('<div class="deleteBlockDiv"><button class="deleteBlockBtn btn btn-primary" onclick="deleteBlock(\'' + showId + '\')">删除此组件</button></div>');
    saveActionHistory($('#sortableList').html().trim(),$('#htmlCode2').html().trim(),obj);//undo redo
}
//onfocus
$(".property").on("focus", "input", function () {
    $(this).attr("data-prevVal", $(this).val());
});
//判断v_data函数是否存在
function isExitsFunction(funcName) {
    try {
        if (typeof(eval(funcName)) == "function") {
            return true;
        }
    } catch(e) {}
    return false;
}
//collectProperty
function collectProperty(property, min, max) {
    var showId = $(".appendCur").parent().attr("data-showId");
    //组件
    if ($(property).attr("type") == "radio") {

        var propertyVal = $(property).val();
        var propertyId = $(property).attr("name");
        $(".appendCur .v_" + propertyId).val(propertyVal);
        if( isExitsFunction( "vData_" + showId ) ){
            eval("vData_" + showId)();
        }

        $("#" + propertyId + "_radio").val(propertyVal);
        $("#htmlCode2 input[name="+propertyId+"]").each(function(){
            if (this.checked == false) {
                $(this).removeAttr("checked");
            }
        });
        $("#htmlCode2 input[name="+propertyId+"]").each(function(){
            if($(this).val() == propertyVal){
                $(this).attr("checked",true);
                $(this).prop("checked",true);
            }
        });
        saveActionHistory($('#sortableList').html().trim(),$('#htmlCode2').html().trim(),obj,'radio',propertyVal+"|"+$("#" + propertyId + "_undoRedo").val()+"|"+propertyId);//undo redo save
        $("#" + propertyId + "_undoRedo").val(propertyVal);//undo redo 将修改之后的值放入页面中 为了拿到修改之前的值
    } else if (($(property).attr("type") == "checkbox") && ($(property).attr("data-type") !== "switch")  ) {
        var propertyId = $(property).attr("name");
        $("#" + propertyId + "_checkbox").val("");
        var propertyVal = "";
        var box = $("[name=" + propertyId + "]");
        for (var i = 0; i < box.length; i++) {
            if ($(box[i]).prop("checked")) {
                var propertyChecked = $(box[i]).val();
                propertyVal += propertyChecked + ",";
                $("#" + propertyId + "_checkbox").val("1");
            }
        }
        propertyVal = propertyVal.substring(0, propertyVal.length - 1);

        var propertys = propertyVal.split(',');
        $("#htmlCode2 input[name="+propertyId+"]").each(function(){
            //移除之前选中的html代码中checkbox选项中checked属性
            $(this).removeAttr("checked");
            //在html代码中checkbox选项中添加checked属性
            for(var i=0;i<propertys.length;i++){
                if(this.value == propertys[i]){
                    $(this).attr("checked",true);
                    $(this).prop("checked",true);
                }
            }
        });
        saveActionHistory($('#sortableList').html().trim(),$('#htmlCode2').html().trim(),obj,'checkbox',propertyVal+"|"+$("#" + propertyId + "_undoRedo").val()+"|"+propertyId);//undo redo save
        $("#" + propertyId + "_undoRedo").val(propertyVal);//undo redo 将修改之后的值放入页面中 为了拿到修改之前的值
    } else if ($(property).attr("type") == "number") {
        var val = $(property).val();
        var propertyId = $(property).attr("id");
        if (((/^[1-9]\d*$/).test(val)) && (val >= min) && (val <= max)) {
            var propertyVal = val;
            $("#htmlCode2 #" + propertyId).attr("value",propertyVal);//undo redo 当修改属性之后的区块页面在新增区块时使用
            $(".appendCur .v_" + propertyId).val(propertyVal);
            if( isExitsFunction( "vData_" + showId ) ){
                eval("vData_" + showId)();
            }
            saveActionHistory($('#sortableList').html().trim(),$('#htmlCode2').html().trim(),obj,'number',propertyVal+"|"+$("#" + propertyId + "_undoRedo").val()+"|"+propertyId);//undo redo save
            $("#" + propertyId + "_undoRedo").val(propertyVal);//undo redo 将修改之后的值放入页面中 为了拿到修改之前的值
        } else {
            $(property).val($(property).attr("data-prevVal"));
            alert("数量范围为" + min + "~" + max + "的正整数");
            return;
        }

    } else if ($(property).attr("type") == "text") {
        var val = $(property).val();
        var propertyId = $(property).attr("id");
        if ((val.length >= min) && (val.length <= max)) {
            var propertyVal = val;
            $("#htmlCode2 #" + propertyId).attr("value",propertyVal);//undo redo 当修改属性之后的区块页面在新增区块时使用
            $(".appendCur .v_" + propertyId).val(propertyVal);
            if( isExitsFunction( "vData_" + showId ) ){
                eval("vData_" + showId)();
            }
            saveActionHistory($('#sortableList').html().trim(),$('#htmlCode2').html().trim(),obj,'text',propertyVal+"|"+$("#" + propertyId + "_undoRedo").val()+"|"+propertyId);//undo redo save
            $("#" + propertyId + "_undoRedo").val(propertyVal);//undo redo 将修改之后的值放入页面中 为了拿到修改之前的值
        } else {
            $(property).val($(property).attr("data-prevVal"));
            alert("范围为" + min + "~" + max + "个文字");
            return;
        }

    } else if( ($(property).attr("data-type") == "switch") && ($(property).attr("type") == "checkbox") ){
        if( $(property).attr("id")=="isCommon" ){
            var propertyId = $(property).attr("id");
            if( $(property).prop("checked") ){
                var propertyVal = "yes";
                $(property).parent().next().find("select").attr("data-notNull","no");
                var nextInputId=$(property).parent().next().find("select.propertyInputBig").attr("id");
                for (var i = 0; i < obj.section.length; i++) {
                    delete obj.section[i][nextInputId];
                    break;
                }
            }else{
                var propertyVal = "no";
                $(property).parent().next().find("select").attr("data-notNull","yes");
                var nextInputId=$(property).parent().next().find("select.propertyInputBig").attr("id");
                var nextInputIdVal=$(property).parent().next().find("select.propertyInputBig").val();
                for (var i = 0; i < obj.section.length; i++) {
                    obj.section[i][nextInputId] = nextInputIdVal;
                    break;
                }
            }
        }else{
            var propertyId = $(property).attr("id");
            if( $(property).prop("checked") ){
                var propertyVal = "yes";
                $(".appendCur .v_" + propertyId).val(propertyVal);
                var nextInputId=$(property).parent().next().find("input.propertyInputSm").attr("id");
                var nextInputIdVal=$(property).parent().next().find("input.propertyInputSm").val();
                for (var i = 0; i < obj.section.length; i++) {
                    obj.section[i][nextInputId] = nextInputIdVal;
                    break;
                }
                if( isExitsFunction( "vData_" + showId ) ){
                    eval("vData_" + showId)();
                }
            }else{
                var propertyVal = "no";
                $(".appendCur .v_" + propertyId).val(propertyVal);
                var nextInputId=$(property).parent().next().find("input.propertyInputSm").attr("id");
                for (var i = 0; i < obj.section.length; i++) {
                        delete obj.section[i][nextInputId];
                        break;
                }
                if( isExitsFunction( "vData_" + showId ) ){
                    eval("vData_" + showId)();
                }
            }
        }

        //var propertys = propertyVal.split(',');
        //$("#htmlCode2 #"+propertyId).each(function(){
        //    //移除之前选中的html代码中checkbox选项中checked属性
        //    $(this).removeAttr("checked");
        //    //在html代码中checkbox选项中添加checked属性
        //    for(var i=0;i<propertys.length;i++){
        //        if(this.value == propertys[i]){
        //            $(this).attr("checked",true);
        //            $(this).prop("checked",true);
        //        }
        //    }
        //});
        saveActionHistory($('#sortableList').html().trim(),$('#htmlCode2').html().trim(),obj,'switch',propertyVal+"|"+$("#" + propertyId + "_undoRedo").val()+"|"+propertyId);//undo redo save
        $("#" + propertyId + "_undoRedo").val(propertyVal);//undo redo 将修改之后的值放入页面中 为了拿到修改之前的值

    } else {
        var propertyVal = $(property).val();
        var propertyId = $(property).attr("id");

        //移除之前选中的option选项
        if($("#" + propertyId + "_undoRedo").val() != undefined && $("#" + propertyId + "_undoRedo").val() != ''){
            $("#htmlCode2 #" + propertyId + " [value="+$("#" + propertyId + "_undoRedo").val()+"]").removeAttr("selected");
        }
        //undo redo 当修改属性之后的区块页面在新增区块时使用
        $("#htmlCode2 #" + propertyId + " [value="+propertyVal+"]").attr("selected","true");
        saveActionHistory($('#sortableList').html().trim(),$('#htmlCode2').html().trim(),obj,'select',propertyVal+"|"+$("#" + propertyId + "_undoRedo").val()+"|"+propertyId);//undo redo save
        //undo redo 将修改之后的值放入页面中 为了拿到修改之前的值
        $("#" + propertyId + "_undoRedo").val(propertyVal);
    }

    for (var i = 0; i < obj.section.length; i++) {
        if (obj.section[i].showId == showId) {
            if ((propertyVal == undefined) || (propertyVal == "")) {
                delete obj.section[i][propertyId];
            } else {
                obj.section[i][propertyId] = propertyVal;
            }
            break;
        }
    }

    notNull(1);
}

//判断必选项是否填写(red,blule)
function notNull(flag) {
    var notNull = $("[data-notNull]");
    var notCur = 'yes';
    for (var i = 0; i < notNull.length; i++) {
        if ($(notNull[i]).attr("data-notNull") == "yes") {
            if ($(notNull[i]).val() == "") {
                if (flag == "1") {
                    //alert($(notNull[i]).val());
                    //alert("必填项不能为空");
                }
                //$(notNull[i]).addClass("notNull");
                notCur = "no";
            } else {
                //$(notNull[i]).removeClass("notNull");
            }
        }
    }

    if (notCur == "no") {
        $(".appendCur").addClass("appendNot");
    } else {
        $(".appendCur").removeClass("appendNot");
    }

}

//deleteBlock---删除组件
$("#widgetBottomDelete").on('click',function(){
    var showId = $(".appendCur").parent().attr("data-showId");
    if( showId==undefined ){
        $('#partDelete').modal('hide');
        alert("没有选择组件。");
    }else{
        $('#partDelete').modal('show', 'fit');
    }
});
$("#deleteBlockBtn").on("click",function(){
    var showId = $(".appendCur").parent().attr("data-showId");
    if( showId!==undefined ){
        deleteBlock(showId);
    }
});
function deleteBlock(removeShowId) {
    var j;
    for (var i = 0; i < obj.section.length; i++) {
        if (obj.section[i].showId == removeShowId) {
            j = i;
            break;
        }
    }
    obj.section.splice(j, 1);

    $("[data-showId=" + removeShowId + "]").remove();
    $(".property .propertyShow").html("");
    //关闭对话框
    $('#partDelete').modal('hide');
    saveActionHistory($('#sortableList').html().trim(),$('#htmlCode2').html().trim(),obj);//undo redo

}

//删除模板
$("#deleteModuleBtn").click(function(){
    $.ajax({
        async: false,
        cache: true,
        type: 'post',
        dataType : "jsonp",
        data:{callBack:"deleteTemplateCallback",templateId:templateIdVal},  //参数
        url:basePath+"template_editor/deleteTemplate.do"//请求的action路径
    });
});
function deleteTemplateCallback(data){
    if( data.exist=="yes" ){
        $(".main .mainCanvas").html("");
        $("#modalDelete").modal("hide");
        obj.section=[];
        $.zui.store.remove('modalNewEditorName');
        //$.zui.store.remove('modalLeadInName');
        window.location.href="editor_index.html";
    }
}

//所有移动的js
function moveAll(){
    $('.newSection').dashboard();
    //var optionsTrigger = {
    //    selector:'.list-group-item',
    //    trigger: '[data-trigger="sortArea"]'
    //};
    //$('#sortableList').sortable(optionsTrigger);
    //拖动组件
    $('#multiDroppableContainer').droppable({
        selector: '.btn-droppable', // 定义允许拖放的元素
        target: '.droppable-target',
        drop: function(event) {
            $('.editorBlock').find('.heightLight').removeClass('heightLight');  //取消高亮框
            var msg = '真棒！';
            if(event.target) {
                //像画布中添加组件方法
                var id=$(event.element).attr("data-blockId");
                var size=$(event.element).attr("data-blockSize");
                importFile(id,'',size,event.target.find('.area-name').parent().parent());
                var elementId = event.element.text();
                msg += '成功拖动【' + elementId + '】到区域 ' + event.target.find('.area-name').text();
            }
            //$.zui.messager.show(msg);
        },
        drag: function(event){
            var id=$(event.element).attr("data-blockId");
            var ts= id.split("_");
            var thisSize = "3";
            if(ts[1] == '4g2'){
                thisSize="6";
            }else if(ts[1] == '4g3') {
                thisSize = "9";
            }else if(ts[1] == '4g4'){
                thisSize = "12";
            }
            var divs = $('.editorBlock>div>div>div.row');
            for(var i=0;i<divs.length;i++){
                var rowWidth=  $(divs[i]).attr("data-groupSize");
                if(eval(rowWidth) >= eval(thisSize)){
                    $(divs[i]).addClass("heightLight");
                }
            }
        }
    });
}

//存为草稿
var closeFlag;
if( $("#WhetherDraft").val()=="0" ) {
    closeFlag = true;
}
function saveDraft(draftBtn){

    $("#baseGroupId").val( baseGroupId );
    $("#baseShowId").val( baseShowId );

    $("#WhetherDraft").val("1");
    if( $("#WhetherDraft").val()=="1" ) {
        closeFlag=false;
    }
    $(draftBtn).find("img").tooltip('hide');
    $(draftBtn).find("img").next().remove();
    var str = (JSON.stringify(obj));
    $("#objInput").val(str);
    //草稿str
    var draft=$("html").prop("outerHTML");
    var formdata=new FormData();
    formdata.append('templateId',templateIdVal);
    formdata.append('templateCode',draft);
    $.ajax({
        url:basePath+"template_editor/saveTemplateCode.do",//远程url
        async :false,
        type:"POST",
        dataType: 'json',
        contentType: false,
        processData: false,
        data: formdata,
        success:function(data){
            if( data.exist=="yes" ){
                alert("草稿保存成功");
                //window.location.href="editor_index.html";
            }else{
                alert("程序异常");
            }
        }
    });
}
//保存
$('#keep').click(function () {
    if( $(".mainCanvas").text()!=="" ){
        var appendStr = $(".appendStr .panel");
        var notCur = 'yes';

        for (var i = 0; i < appendStr.length; i++) {
            if ($(appendStr[i]).hasClass("appendNot")) {
                $(".appendStr .panel").removeClass("appendCur");
                $(".property .propertyShow").html("");
                notCur = "no";
            }
        }
        if (notCur == 'no') {
            alert("标记蓝色的组件有必填项没有填写");
        } else if (notCur == 'yes') {
            var str = (JSON.stringify(obj)),
                order = "";
            $(".editorBlock .appendStr").each(function () {
                if ($(this).css("display") !== "none") {
                    order = order + $(this).attr("data-showId") + ',';
                }
            });
            order = order.substring(0, order.length - 1);
            var groupDivOrder ="";
            for(var i = 0;i<$('.groupDiv').length;i++){
                var pp = $('.groupDiv')[i];
                groupDivOrder += $(pp).attr("data-groupShowId")+",";
            }
            groupDivOrder = groupDivOrder.substring(0, groupDivOrder.length - 1);
            console.log(str);
            console.log(order);
            console.log(groupDivOrder);
            console.log(templateIdVal);
            console.log(templateColorVal);
            console.log(gridSizeVal);
            //return;
            $.ajax({
                async: false,
                cache: true,
                type: 'POST',
                dataType : "jsonp",
                data:{callBack:"saveTemplateCallback",strKey:str,order:order,groupDivOrder:groupDivOrder,
                    templateId:templateIdVal,templateColor:templateColorVal,gridSize:gridSizeVal },  //参数
                url:basePath+"template_editor/saveTemplate"//请求的action路径
            });
        }
    }else{
        alert("当前没有可保存项");
    }
});
function saveTemplateCallback(data){
    alert("保存成功~");
    window.location.href="editor_index.html";
}
//preview---预览
$("#previewtest").click(function(){
    var main=$('.main').clone();
    var strSection="";
    var strHeader="";
    var strFooter="";
    $(main).find(".editorBlock").removeClass("container").addClass("sectionContainer");
    $(main).find(".panel-heading").remove();
    $(main).find(".resize-handle").remove();
    $(main).find(".sortArea").remove();
    $(main).find(".firstLocation").remove();
    $(main).find(".mainAct").remove();

    var groupDivs=$(main).find(".groupDiv ");
    for( var i=0;i<groupDivs.length;i++ ){
        $(groupDivs[i]).removeClass("list-group-item");
        $(groupDivs[i]).find(".panel-body").removeClass("panel-body");

        if( $(groupDivs[i]).find(".panel").attr("data-header")=="header" ){
            strHeader+=$(groupDivs[i]).prop("outerHTML");
        }else if( $(groupDivs[i]).find(".panel").attr("data-footer")=="footer" ){
            strFooter+=$(groupDivs[i]).prop("outerHTML");
        }else{
            strSection+=$(groupDivs[i]).prop("outerHTML");
        }
        $(groupDivs[i]).find(".panel").removeClass("panel");
    }

    $(main).find(".editorBlock").html("").html(strSection).removeClass("editorBlock").addClass("section");
    $(main).find(".editorHeader").html("").html(strHeader).removeClass("editorHeader").addClass("header");
    $(main).find(".editorFooter").html("").html(strFooter).removeClass("editorFooter").addClass("footer");

    var strAll=$(main).html();

    $.zui.store.set('previewName', strAll);
    window.open('preview.html');
});

//鼠标拖动上下移动
function mouseCoords(event) {
    return {
        x:event.clientX ,
        y:event.clientY
    };
}

//onload
window.onload = function () {
    //left
    blockLeftList("");
    blockTypeList();
    if( $("#WhetherDraft").val()=="0"){
        layout();
        gridSize();
    }
    moveAll();
};

//关闭浏览器提示
//console.log(closeFlag);
//window.onbeforeunload=function(event){
//    if( closeFlag ){
//        return '模板信息没有保存为草稿将不会被保存';
//    }
//};












