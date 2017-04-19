/**
 * Created by Administrator on 2017-4-11.
 */

var actionStack = [];//操作栈
var actionIndex = 0;//操作栈中当前操作的指针

//上一步
function undo(){
    if (actionIndex>0){
        if (actionStack[actionIndex-1].status != "done") return;
        if(actionStack[actionIndex-1].type == "text" || actionStack[actionIndex-1].type == "number"
            ||actionStack[actionIndex-1].type == "select"){
            var propertyId = actionStack[actionIndex-1].value.split("|")[2];//拿到选项ID
            $(".col-xs-3 #" + propertyId).val(actionStack[actionIndex-1].value.split("|")[1]);//修改页面上的input框变为原来的值
            $(".appendCur .v_" + propertyId).val(actionStack[actionIndex-1].value.split("|")[1]);//修改区块
            eval("vData_" + $(".appendCur").parent().attr("data-showId"))();//修改区块
        }else if(actionStack[actionIndex-1].type == "checkbox"){
            var propertyId = actionStack[actionIndex-1].value.split("|")[2];//拿到选项ID
            var propertys = actionStack[actionIndex-1].value.split("|")[1].split(',');
            $(".col-xs-3 input[name="+propertyId+"]").each(function(){
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
        }else if(actionStack[actionIndex-1].type == "radio"){
            var propertyId = actionStack[actionIndex-1].value.split("|")[2];//拿到选项ID
            $(".col-xs-3 input[name="+propertyId+"]").each(function() {
                if (this.checked) {
                    $(this).removeAttr("checked");
                }
            });
            $(".col-xs-3 input[name="+propertyId+"]").each(function(){
                if($(this).val() == actionStack[actionIndex-1].value.split("|")[1]){
                    $(this).prop("checked",true);
                }
            });
            $("#" + propertyId + "_radio").val(actionStack[actionIndex-1].value.split("|")[1]);
        }else{
            $('#sortableList').html(actionStack[actionIndex-1].oldValue1);
            $('#htmlCode2').html(actionStack[actionIndex-1].oldValue2);
            var options = {
                trigger: '[data-trigger="sortArea"]'
            };
            $('#sortableList').sortable(options);
            $('.newSection').dashboard();
        }
        obj = actionStack[actionIndex-1].obj;
        actionStack[actionIndex-1].status = "undone";
        --actionIndex;
    }
}

//下一步
function redo(){
    if (actionIndex<actionStack.length){
        if (actionStack[actionIndex].status != "undone") return;
        if(actionStack[actionIndex].type == "text" || actionStack[actionIndex].type == "number"
            || actionStack[actionIndex].type == "select"){
            var propertyId = actionStack[actionIndex].value.split("|")[2];//拿到选项ID
            $(".col-xs-3 #" + propertyId).val(actionStack[actionIndex].value.split("|")[0]);//修改页面上的input框变为原来的值
            $(".appendCur .v_" + propertyId).val(actionStack[actionIndex].value.split("|")[0]);//修改区块
            eval("vData_" + $(".appendCur").parent().attr("data-showId"))();//修改区块
        }else if(actionStack[actionIndex].type == "checkbox"){
            var propertyId = actionStack[actionIndex].value.split("|")[2];//拿到选项ID
            var propertys = actionStack[actionIndex].value.split("|")[0].split(',');
            $(".col-xs-3 input[name="+propertyId+"]").each(function(){
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
        }else if(actionStack[actionIndex].type == "radio"){
            var propertyId = actionStack[actionIndex].value.split("|")[2];//拿到选项ID
            $(".col-xs-3 input[name="+propertyId+"]").each(function() {
                if (this.checked) {
                    $(this).removeAttr("checked");
                }
            });
            $(".col-xs-3 input[name="+propertyId+"]").each(function(){
                if($(this).val() == actionStack[actionIndex].value.split("|")[0]){
                    $(this).prop("checked",true);
                }
            });
            $("#" + propertyId + "_radio").val(actionStack[actionIndex].value.split("|")[0]);
        }else{
            $('#sortableList').html(actionStack[actionIndex].newValue1);
            $('#htmlCode2').html(actionStack[actionIndex].newValue2);
            var options = {
                trigger: '[data-trigger="sortArea"]'
            };
            $('#sortableList').sortable(options);
            $('.newSection').dashboard();
        }
        obj = actionStack[actionIndex].obj;
        actionStack[actionIndex].status = "done";
        actionIndex++;
    }
}

//保存html代码
function saveActionHistory(html1,html2,obj,type,value){
    var order = createBlockOrder();
    if(actionIndex == 0){
        if(actionStack[0]){
            var ChangeAction = {newValue1:html1,
                oldValue1:actionStack[0].oldValue1,
                newValue2:html2,
                oldValue2:actionStack[0].oldValue2,
                value:value,
                type:type,
                obj:obj,
                order:order,
                status:"done"};
        }else{
            var ChangeAction = {newValue1:html1,
                oldValue1:'',
                newValue2:html2,
                oldValue2:'',
                value:value,
                type:type,
                obj:obj,
                order:order,
                status:"done"};
        }
        actionStack[actionIndex] = ChangeAction;
        actionIndex++;
    }else{
        var ChangeAction = {newValue1:html1,
            oldValue1:actionStack[actionIndex - 1].newValue1,
            newValue2:html2,
            oldValue2:actionStack[actionIndex - 1].newValue2,
            value:value,
            type:type,
            obj:obj,
            order:order,
            status:"done"};
        actionStack[actionIndex] = ChangeAction;
        actionIndex++;
    }
    actionStack.length = actionIndex;
    if(actionStack.length > 5){
        actionStack.shift();
        --actionIndex;
    }
}

function createBlockOrder(){
    var order = "";
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
    return order +"|"+ groupDivOrder;
}