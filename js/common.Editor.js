/**
 * Created by 大丽丽 on 2017/3/22.
 */

//callback
function callback(data) {
    var flag = data.flag;
    (eval(flag + 'CallBack'))(data);

}
//1---引用文件
function blockLeftList() {
    $.ajax({
        async: false,
        cache: true,
        type: 'post',
        dataType : "jsonp",
        data:{dataType:"jsonp",gridSize:"3"},  //参数
        url:"http://192.168.31.2/template_editor/blockLeftList.do",//请求的action路径
        error: function () {//请求失败处理函数
        },
        success: function (data) { //请求成功后处理函数。
        }
    });
}
function blockLeftListCallBack(data) {
    var list = data.dataList;
    for (var i = 0; i < list.length; i++) {
        var str = '';
        if (list[i].blockType == "list") {
            if ($("#listBlock").html() == undefined) {
                str = '<div id="listBlock" class="panel panel-default"><div class="panel-heading"><h4 class="panel-title">';
                str += '<a data-toggle="collapse" data-parent="#accordionPanels" href="#' + list[i].blockType + '">列表组件 </a></h4></div>'
                str += '<div id="' + list[i].blockType + '" class="panel-collapse collapse in">';
                str += '<div class="panel-body"><span onclick="importFile(\'' + list[i].blockId + '\',\'\',\'' + list[i].blockSize + '\')" class="secPart" id="' + list[i].blockId + '" name="list01">' + list[i].blockName + '</span></div></div></div>';
            } else {
                str += '<span onclick="importFile(\'' + list[i].blockId + '\',\'\',\'' + list[i].blockSize + '\')" class="secPart" id="' + list[i].blockId + '" name="list01">' + list[i].blockName + '</span>';
                $('#listBlock .panel-body').append(str);
                continue;
            }


        } else if (list[i].blockType == "adv") {
            if ($("#advBlock").html() == undefined) {
                str = '<div id="advBlock" class="panel panel-default"><div class="panel-heading"><h4 class="panel-title">';
                str += '<a data-toggle="collapse" data-parent="#accordionPanels" href="#' + list[i].blockType + '">广告组件</a></h4></div>';
                str += '<div id="' + list[i].blockType + '" class="panel-collapse collapse in">';
                str += '<div class="panel-body"><span onclick="importFile(\'' + list[i].blockId + '\',\'\',\'' + list[i].blockSize + '\')" class="secPart" id="' + list[i].blockId + '" name="list01">' + list[i].blockName + '</span></div></div></div>';
            } else {
                str += '<span onclick="importFile(\'' + list[i].blockId + '\',\'\',\'' + list[i].blockSize + '\')" class="secPart" id="' + list[i].blockId + '" name="list01">' + list[i].blockName + '</span>';
                $('#advBlock .panel-body').append(str);
                continue;
            }
        }

        $('.partAll .panel-group').append(str);
    }
}

var option = [];
var optionSelect={};
var obj = {"section":[]};

$(".partAll").on("mousemove",".secPart",function(){
    //console.log(1);
});
$(".partAll").on("mouseup",".secPart",function(){
    //console.log(2);
});


//组合框文件引用
function importGroupDiv(num){
    var data="";
    if(num == '1'){
        data ='<div class="col-xs-4 row groupDiv list-group-item" data-groupSize="4" style="min-height:100px;">'
            +'<div data-trigger="sortArea" class="sortArea col-md-12 col-sm-12">拖拽我--1<span class="deleteGroup">X</span></div>'
            +'<div class="col-md-12 col-sm-12"  id="groupDiv" style="position:absolute;z-index:-1">'
            +'<div class="panel">'
            +'<div class="panel-heading">'
            +'<span class="title"></span>'
                +'</div>'
                +'<div class="panel-body"></div>'
            +'</div>'
            +'</div>'
            +'</div>';
    }else if(num == '2'){
        data ='<div class="col-xs-8 row groupDiv list-group-item" data-groupSize="8" style="min-height:100px;">'
            +'<div data-trigger="sortArea" class="sortArea col-md-12 col-sm-12">拖拽我--2<span class="deleteGroup">X</span></div>'
            + '<div class="col-md-12 col-sm-12"  id="groupDiv" style="position:absolute;z-index:-1">'
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
        data = '<div class="col-xs-12 row groupDiv list-group-item"  data-groupSize="12" style="min-height:100px;">'
            + '<div data-trigger="sortArea" class="sortArea col-md-12 col-sm-12">拖拽我--3<span class="deleteGroup">X</span></div>'
            + '<div class="col-md-12 col-sm-12"  id="groupDiv" style="position:absolute;z-index:-1">'
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
    var options = {
        trigger: '[data-trigger="sortArea"]'
    };
    $('#sortableList').sortable(options);
    $('.newSection').dashboard();
    saveActionHistory($('#sortableList').html().trim(),$('#htmlCode2').html().trim(),obj);//undo redo
}

//删除组合框
$(".newSection").on("click",'.deleteGroup',function(){
    if( confirm("确定要删除此组件框（包含其中所有组件）吗？") ){
        $(this).parent().parent().remove();
        console.log($(this).parent());
        //if( $(this).parent().find(".appendCur") ){
        //    $(".property").html("");
        //}
        saveActionHistory($('#sortableList').html().trim(),$('#htmlCode2').html().trim(),obj);//undo redo
    }
});


//2---引用组件文件
function importFile(id, nextShowId, size) {
    //找到源文件
    $.get("../editorBlock/" + id + ".html", function (data) {
            var block_showId;
            var blockCur = $(".editorBlock ." + id);
            //console.log(blockCur)
            if (blockCur.length == 0) {
                block_showId = id + "_0";
            } else {
                for (var i = 0; i < blockCur.length; i++) {
                    if (i == (blockCur.length - 1)) {
                        i = i + 1;
                        block_showId = id + "_" + i;
                    }
                }
            }
            //增加是否填写属性必选项的框
            notNull();
            //清楚所有选中框
            $(".indexAll .appendStr .panel").removeClass('appendCur');

            //固定替换流程
            data = data.replace("<html>", '');
            data = data.replace("</html>", '');
            data = data.replace("panel", "panel appendCur");
            data = data.replace(/vData/g, "vData_" + block_showId);
            //判断区块是否可以添加到组合框内
            var ids = block_showId.split("_");
            var blockWidth = 4;
            if(ids[1] == "3g2"){
                blockWidth = 8;
            }else if(ids[1] == "3g3" ){
                blockWidth = 12;
            }
            //通过下一个组件的showID，append到拖拽之前的位置
            if (nextShowId == "") {
                if ($('.editorBlock>div>div>div.row').length == 0) {
                    alert("请先添加组合框");
                    return;
                } else {
                    var divs = $('.editorBlock>div>div>div.row');
                    var fla="no";
                    for(var i=0;i<divs.length;i++){
                        var rowWidth=  $(divs[i]).attr("data-groupSize");
                        if(rowWidth >= blockWidth){
                            $(divs[i]).append(data);
                            var fla="yes";
                            break;
                        }
                    }
                    if(fla =="no"){
                        alert("没有合适的组合框");
                        return;
                    }
                }
            } else {
                $("[data-showId=" + nextShowId + "]").before(data);
            }
            //增加showId
            optionSelect = {};
            optionSelect.id = id;
            optionSelect.showId = block_showId;
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
                $(".property").html("")
                return;
            } else {
                var md = "col-md-" + finalSize;
                var sm = "col-sm-" + finalSize;
                if (blockSize == 4) {
                    $(".appendCur").parent().removeClass("col-md-4");
                    $(".appendCur").parent().removeClass("col-sm-4");
                } else if (blockSize == 8) {
                    $(".appendCur").parent().removeClass("col-md-8");
                    $(".appendCur").parent().removeClass("col-sm-8");
                } else if (blockSize == 12) {
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

//______________________________________right--属性
function propertyRightList(id) {
    $.ajax({
        async: false,
        cache: true,
        type: 'post',
        dataType : "jsonp",
        data:{dataType:"jsonp",blockId:id},  //参数
        url:"http://192.168.31.2/template_editor/propertyRightList.do",//请求的action路径
        error: function () {//请求失败处理函数

        },
        success: function (data) { //请求成功后处理函数。
        }
    });
}
function propertyRightListCallBack(data) {
    var list = data.dataList;
    $(".property").html("");
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
            str = '<div class="row control-group">';
            str += '<label class="control-label col-xs-4" for="' + list[i].propertyId + '">';
            if (list[i].notNull == "yes") {
                str += '<span class="notNullColor">* </span>';
            }
            str += list[i].propertyName + '</label>';
            str += '<div class="controls col-xs-8"><input data-notNull="' + list[i].notNull + '" onchange="collectProperty(this,' + list[i].minValue + ',' + list[i].maxValue + ')" type="text" id="' + list[i].propertyId + '"';
            var curId = list[i].propertyId;
            str += 'value="';
            if (blockProAll[curId] !== undefined) {
                str += blockProAll[curId];
            } else if (list[i].defaultValue !== undefined) {
                str += list[i].defaultValue;
            }
            str += '"';
            str += ' class="form-input" placeholder="区块名称">';
            str += '<input type="hidden" id="' + list[i].propertyId + '_undoRedo" value="';//undo redo 存储修改之前的属性值
            if (blockProAll[curId] !== undefined) {
                str += blockProAll[curId];
            } else if (list[i].defaultValue !== undefined) {
                str += list[i].defaultValue;
            }
            str += '" /></div></div>';

        } else if (list[i].propertyType == "number") {
            str = '<div class="row control-group"><label class="control-label col-xs-4" for="' + list[i].propertyId + '">';
            if (list[i].notNull == "yes") {
                str += '<span class="notNullColor">* </span>';
            }
            str += list[i].propertyName + '</label>';
            str += '<div class="controls col-xs-8"><input data-notNull="' + list[i].notNull + '" onchange="collectProperty(this,' + list[i].minValue + ',' + list[i].maxValue + ')" type="number" id="' + list[i].propertyId + '"';
            var curId = list[i].propertyId;
            str += 'value="';
            if (blockProAll[curId] !== undefined) {
                str += blockProAll[curId];
            } else if (list[i].defaultValue !== undefined) {
                str += list[i].defaultValue;
            }
            str += '"';
            str += ' class="form-input" placeholder="区块名称">';
            str += '<input type="hidden" id="' + list[i].propertyId + '_undoRedo" value="';//undo redo 存储修改之前的属性值
            if (blockProAll[curId] !== undefined) {
                str += blockProAll[curId];
            } else if (list[i].defaultValue !== undefined) {
                str += list[i].defaultValue;
            }
            str += '" /></div></div>';
        } else if (list[i].propertyType == "select") {
            str = '<div class="row control-group"><label class="control-label col-xs-4 " for="' + list[i].propertyId + '">';
            if (list[i].notNull == "yes") {
                str += '<span class="notNullColor">* </span>';
            }
            str += list[i].propertyName + '</label>';
            str += '<div class="controls col-xs-8"><select onchange="collectProperty(this)" data-notNull="' + list[i].notNull + '" id="' + list[i].propertyId + '" >';
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
            str += '" /></div></div>';
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
            str += "</div>";
        }
        $('.property').append(str);
    }
    $(".property").append('<div class="deleteBlockDiv"><button class="deleteBlockBtn btn btn-primary" onclick="deleteBlock(\'' + showId + '\')">删除此组件</button></div>');
    saveActionHistory($('#sortableList').html().trim(),$('#htmlCode2').html().trim(),obj);//undo redo
}

//onfocus
$(".property").on("focus", "input", function () {
    $(this).attr("data-prevVal", $(this).val());
});

//collectProperty
function collectProperty(property, min, max) {
    var showId = $(".appendCur").parent().attr("data-showId");
    //组件
    if ($(property).attr("type") == "radio") {

        var propertyVal = $(property).val();
        var propertyId = $(property).attr("name");
        $("#" + propertyId + "_radio").val(propertyVal);
        //移除之前选中的option选项
        //$(".col-xs-3 #" + propertyId + " [value="+$("#" + propertyId + "_undoRedo").val()+"]").removeAttr("checked");
        //undo redo 当修改属性之后的区块页面在新增区块时使用
        //$(".col-xs-3 #" + propertyId + " [value="+propertyVal+"]").attr("checked","true");
        //saveActionHistory($('#sortableList').html().trim(),$('#htmlCode2').html().trim(),obj,'number',propertyVal+"|"+$("#" + propertyId + "_undoRedo").val()+"|"+propertyId);//undo redo save
        //$("#" + propertyId + "_undoRedo").val(propertyVal);//undo redo 将修改之后的值放入页面中 为了拿到修改之前的值
    } else if ($(property).attr("type") == "checkbox") {
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

    } else if ($(property).attr("type") == "number") {
        var val = $(property).val();
        var propertyId = $(property).attr("id");
        if (((/^[1-9]\d*$/).test(val)) && (val >= min) && (val <= max)) {
            var propertyVal = val;
            $(".col-xs-3 #" + propertyId).attr("value",propertyVal);//undo redo 当修改属性之后的区块页面在新增区块时使用
            $(".appendCur .v_" + propertyId).val(propertyVal);
            eval("vData_" + showId)();
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
            $(".col-xs-3 #" + propertyId).attr("value",propertyVal);//undo redo 当修改属性之后的区块页面在新增区块时使用
            $(".appendCur .v_" + propertyId).val(propertyVal);
            eval("vData_" + showId)();
            saveActionHistory($('#sortableList').html().trim(),$('#htmlCode2').html().trim(),obj,'text',propertyVal+"|"+$("#" + propertyId + "_undoRedo").val()+"|"+propertyId);//undo redo save
            $("#" + propertyId + "_undoRedo").val(propertyVal);//undo redo 将修改之后的值放入页面中 为了拿到修改之前的值
        } else {
            $(property).val($(property).attr("data-prevVal"));
            alert("范围为" + min + "~" + max + "个文字");
            return;
        }

    } else {
        var propertyVal = $(property).val();
        var propertyId = $(property).attr("id");

        //移除之前选中的option选项
        $(".col-xs-3 #" + propertyId + " [value="+$("#" + propertyId + "_undoRedo").val()+"]").removeAttr("selected");
        //undo redo 当修改属性之后的区块页面在新增区块时使用
        $(".col-xs-3 #" + propertyId + " [value="+propertyVal+"]").attr("selected","true");
        saveActionHistory($('#sortableList').html().trim(),$('#htmlCode2').html().trim(),obj,'select',propertyVal+"|"+$("#" + propertyId + "_undoRedo").val()+"|"+propertyId);//undo redo save
        //undo redo 将修改之后的值放入页面中 为了拿到修改之前的值
        $("#" + propertyId + "_undoRedo").val(propertyVal);
    }

    for (var i = 0; i < obj.section.length; i++) {
        if (obj.section[i].showId == showId) {
            //obj.section[i][propertyId]=propertyVal;
            //console.log( propertyVal )
            if ((propertyVal == undefined) || (propertyVal == "")) {
                //alert(1)
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

//deleteBlock
function deleteBlock(removeShowId) {
    if (confirm("确认删除此组件")) {
        var j;
        for (var i = 0; i < obj.section.length; i++) {
            if (obj.section[i].showId == removeShowId) {
                j = i;
                break;
            }
        }
        obj.section.splice(j, 1);

        $("[data-showId=" + removeShowId + "]").remove();
        $(".property").html("")
        saveActionHistory($('#sortableList').html().trim(),$('#htmlCode2').html().trim(),obj);//undo redo
    }


}


//存储container
window.onload = function () {
    //left
    blockLeftList();
    //保存
    $('#keep').click(function () {

        console.log(JSON.stringify(obj));

        var appendStr = $(".appendStr .panel");
        var notCur = 'yes';

        for (var i = 0; i < appendStr.length; i++) {
            //console.log($(appendStr[i]).hasClass("appendNot"));
            if ($(appendStr[i]).hasClass("appendNot")) {
                $(".appendStr .panel").removeClass("appendCur");
                $(".property").html("");
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
            console.log(str, order);

            $.ajax({
                async: false,
                cache: true,
                type: 'POST',
                dataType : "jsonp",
                data:{strKey:str,order:order,dataType :"jsonp"},  //参数
                url:"http://192.168.31.2/template_editor/saveTemplate.do",//请求的action路径
                error: function () {//请求失败处理函数

                },
                success: function (data) { //请求成功后处理函数。
                    alert("成功了")
                }
            });
        }
    })
};

//function saveTemplateCallBack() {
//
//}

//function callback(){
//        var str=$('.main').html();
//        str = str.replace(/<(script)[\S\s]*?\/\1>/gi, '');
//        $('.main').html( str );
//        $.zui.store.set('name', str);
//        window.location.href="container.html";
//        console.log( $('.main').html() );
//    }


