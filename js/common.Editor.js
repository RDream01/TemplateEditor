
var option = [];
var optionSelect={};
var obj = {"header":[],"section":[],"footer":[]};
var  baseShowId = 0;
var  baseGroupId = 0;
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
                str += '<div class="panel-body"><span data-blockId="'+list[i].blockId+'"  data-blockSize="'+list[i].blockSize+'" class="secPart btn-droppable" id="' + list[i].blockId + '">' + list[i].blockName + '</span></div></div></div>';
            } else {
                str += '<span data-blockId="'+list[i].blockId+'"  data-blockSize="'+list[i].blockSize+'" class="secPart btn-droppable" id="' + list[i].blockId + '">' + list[i].blockName + '</span>';
                $('#listBlock .panel-body').append(str);
                continue;
            }

        } else if (list[i].blockType == "adv") {
            if ($("#advBlock").html() == undefined) {
                str = '<div id="advBlock" class="panel panel-default"><div class="panel-heading"><h4 class="panel-title">';
                str += '<a data-toggle="collapse" data-parent="#accordionPanels" href="#' + list[i].blockType + '">广告组件</a></h4></div>';
                str += '<div id="' + list[i].blockType + '" class="panel-collapse collapse in">';
                str += '<div class="panel-body"><span data-blockId="'+list[i].blockId+'"  data-blockSize="'+list[i].blockSize+'" class="secPart btn-droppable" id="' + list[i].blockId + '">' + list[i].blockName + '</span></div></div></div>';
            } else {
                str += '<span data-blockId="'+list[i].blockId+'"  data-blockSize="'+list[i].blockSize+'" class="secPart btn-droppable" id="' + list[i].blockId + '">' + list[i].blockName + '</span>';
                $('#advBlock .panel-body').append(str);
                continue;
            }
        }else if (list[i].blockType == "header") {
            if ($("#headerBlock").html() == undefined) {
                str = '<div id="headerBlock" class="panel panel-default"><div class="panel-heading"><h4 class="panel-title">';
                str += '<a data-toggle="collapse" data-parent="#accordionPanels" href="#' + list[i].blockType + '">头部组件</a></h4></div>';
                str += '<div id="' + list[i].blockType + '" class="panel-collapse collapse in">';
                str += '<div class="panel-body"><span data-blockId="'+list[i].blockId+'"  data-blockSize="'+list[i].blockSize+'" class="secPart btn-droppable" id="' + list[i].blockId + '">' + list[i].blockName + '</span></div></div></div>';
            } else {
                str += '<span data-blockId="'+list[i].blockId+'"  data-blockSize="'+list[i].blockSize+'" class="secPart btn-droppable" id="' + list[i].blockId + '">' + list[i].blockName + '</span>';
                $('#headerBlock .panel-body').append(str);
                continue;
            }
        }else if (list[i].blockType == "footer") {
            if ($("#footerBlock").html() == undefined) {
                str = '<div id="footerBlock" class="panel panel-default"><div class="panel-heading"><h4 class="panel-title">';
                str += '<a data-toggle="collapse" data-parent="#accordionPanels" href="#' + list[i].blockType + '">尾部组件</a></h4></div>';
                str += '<div id="' + list[i].blockType + '" class="panel-collapse collapse in">';
                str += '<div class="panel-body"><span data-blockId="'+list[i].blockId+'"  data-blockSize="'+list[i].blockSize+'" class="secPart btn-droppable" id="' + list[i].blockId + '">' + list[i].blockName + '</span></div></div></div>';
            } else {
                str += '<span data-blockId="'+list[i].blockId+'"  data-blockSize="'+list[i].blockSize+'" class="secPart btn-droppable" id="' + list[i].blockId + '">' + list[i].blockName + '</span>';
                $('#footerBlock .panel-body').append(str);
                continue;
            }
        }

        $('.partAll .panel-group').append(str);
    }
}


//组合框文件引用
function importGroupDiv(num){
    var data="";
    if(num == '1'){
        data ='<div class="col-xs-4 row groupDiv list-group-item droppable-target" data-groupSize="4" style="min-height:100px;">'
            +'<div data-trigger="sortArea" class="sortArea col-md-12 col-sm-12"><span class="area-name">组合框1，</span>拖拽我--1<span class="deleteGroup">X</span></div>'
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
        data ='<div class="col-xs-8 row groupDiv list-group-item droppable-target" data-groupSize="8" style="min-height:100px;">'
            +'<div data-trigger="sortArea"  class="sortArea col-md-12 col-sm-12"><span class="area-name">组合框2，</span>拖拽我--2<span class="deleteGroup">X</span></div>'
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
        data = '<div class="col-xs-12 row groupDiv list-group-item droppable-target"  data-groupSize="12" style="min-height:100px;">'
            + '<div data-trigger="sortArea" class="sortArea col-md-12 col-sm-12"><span class="area-name">组合框3，</span>拖拽我--3<span class="deleteGroup">X</span></div>'
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
    var optionsTrigger = {
        selector:'.list-group-item',
        trigger: '[data-trigger="sortArea"]'
    };


    $('#sortableList').sortable(optionsTrigger);
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
            var thisSize = "4";
            if(ts[1] == '3g2'){
                thisSize="8";
            }else if(ts[1] == '3g3') thisSize = "12";
            var divs = $('.editorBlock>div>div>div.row');
            for(var i=0;i<divs.length;i++){
                var rowWidth=  $(divs[i]).attr("data-groupSize");
                if(eval(rowWidth) >= eval(thisSize)){
                    $(divs[i]).addClass("heightLight");
                }
            }
        }
    });

    $('.newSection').dashboard();

    saveActionHistory($('#sortableList').html().trim(),$('#htmlCode2').html().trim(),obj);//undo redo
}

//删除组合框
$(".newSection").on("click",'.deleteGroup',function(){
    //alert(1);
    if( confirm("确定要删除此组件框（包含其中所有组件）吗？") ){
        $(this).parent().parent().remove();
        saveActionHistory($('#sortableList').html().trim(),$('#htmlCode2').html().trim(),obj);//undo redo
    }
});


//拖拽
function importFile(id, nextShowId, size,groupDiv) {
    //找到源文件
    $.get("../editorBlock/" + id + ".html", function (data) {
            var block_showId;
            var GroupShowId = $(groupDiv).attr("data-groupShowId");
            block_showId = id+ "_" + baseShowId+"_"+GroupShowId;
             baseShowId ++;
            //增加是否填写属性必选项的框
            notNull();
            //清楚所有选中框
            $(".indexAll .appendStr .panel").removeClass('appendCur');
            //固定替换流程
            data = data.replace(/showId/g, '');
            data = data.replace(/"exist"/g, '');
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
                $(".property").html("");
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
    console.log(list)
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
            } else if (list[i].defaultValue !== undefined && list[i].defaultValue != "null") {
                str += list[i].defaultValue;
            }
            str += '"';
            str += ' class="form-input" placeholder="'+list[i].propertyName+'">';
            str += '<input type="hidden" id="' + list[i].propertyId + '_undoRedo" value="';//undo redo 存储修改之前的属性值
            if (blockProAll[curId] !== undefined ) {
                str += blockProAll[curId];
            } else if (list[i].defaultValue !== undefined && list[i].defaultValue != "null") {
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
            str += '<input type="hidden" id="' + list[i].propertyId + '_undoRedo" value="';//undo redo 存储修改之前的属性值
            if ((blockProAll[curId] !== undefined) && (blockProAll[curId] !== "")) {
                str += "1";
            } else if (list[i].defaultValue !== undefined) {
                str += list[i].defaultValue;
            }
            str += '" /></div>';
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

        $(".appendCur .v_" + propertyId).val(propertyVal);
        eval("vData_" + showId)();

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
            $("#htmlCode2 #" + propertyId).attr("value",propertyVal);//undo redo 当修改属性之后的区块页面在新增区块时使用
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
            console.log(order)
            var groupDivOrder ="";
            for(var i = 0;i<$('.groupDiv').length;i++){
                var pp = $('.groupDiv')[i];
                groupDivOrder += $(pp).attr("data-groupShowId")+",";
            }
            groupDivOrder = groupDivOrder.substring(0, groupDivOrder.length - 1);
            console.log(groupDivOrder)
            $.ajax({
                async: false,
                cache: true,
                type: 'POST',
                dataType : "jsonp",
                data:{strKey:str,order:order,groupDivOrder:groupDivOrder,dataType :"jsonp"},  //参数
                url:"http://192.168.31.156:8080/cmsNews/template_editor/saveTemplate.do"//请求的action路径
            });
        }
    })
};



function saveTemplateCallBack(data){
    alert("保存成功~");
}


//鼠标拖动上下移动
function mouseCoords(event) {
    return {
        x:event.clientX ,
        y:event.clientY
    };
}

//preview---预览
$(".preview").click(function(){

    var main=$('.main').clone();
    var strSection="";
    var strHeader="";
    var strFooter="";
    $(main).find(".editorBlock").removeClass("container").addClass("sectionContainer");
    $(main).find(".panel-heading").remove();
    $(main).find(".resize-handle").remove();
    $(main).find(".sortArea").remove();
    $(main).find(".firstLocation").remove();

    var groupDivs=$(main).find(".groupDiv ");
    for( var i=0;i<groupDivs.length;i++ ){
        //if( $(groupDivs[i]).children().hasClass("appendStr") ){
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

        //}
    }

    $(main).find(".editorBlock").html("").html(strSection).removeClass("editorBlock").addClass("section");
    $(main).find(".editorHeader").html("").html(strHeader).removeClass("editorHeader").addClass("header");
    $(main).find(".editorFooter").html("").html(strFooter).removeClass("editorFooter").addClass("footer");

    var strAll=$(main).html();

    $.zui.store.set('name', strAll);
    window.open('preview.html');
    //console.log( $('.main').html() )
});

















