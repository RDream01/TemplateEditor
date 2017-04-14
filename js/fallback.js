/**
 * Created by Administrator on 2017-4-11.
 */

var actionStack = [];//操作栈
var actionIndex = 0;//操作栈中当前操作的指针

//上一步
function undo(){
    if (actionIndex>0){
        if (actionStack[actionIndex-1].status != "done") return;
        if(actionStack[actionIndex-1].type == "text"){

        }else if(actionStack[actionIndex-1].type == "number"){

        }else if(actionStack[actionIndex-1].type == "select"){

        }else if(actionStack[actionIndex-1].type == "checkbox"){

        }else if(actionStack[actionIndex-1].type == "radio"){

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
        $('#sortableList').html(actionStack[actionIndex].newValue1);
        $('#htmlCode2').html(actionStack[actionIndex].newValue2);
        var options = {
            trigger: '[data-trigger="sortArea"]'
        };
        $('#sortableList').sortable(options);
        $('.newSection').dashboard();
        obj = actionStack[actionIndex].obj;
        actionStack[actionIndex].status = "done";
        actionIndex++;
    }
}

//保存html代码
function saveActionHistory(html1,html2,obj,type){
    if(actionIndex == 0){
        if(actionStack[0]){
            var ChangeAction = {newValue1:html1,
                oldValue1:actionStack[0].oldValue1,
                newValue2:html2,
                oldValue2:actionStack[0].oldValue2,
                type:type,
                obj:obj,
                status:"done"};
        }else{
            var ChangeAction = {newValue1:html1,
                oldValue1:'',
                newValue2:html2,
                oldValue2:'',
                type:type,
                obj:obj,
                status:"done"};
        }
        actionStack[actionIndex] = ChangeAction;
        actionIndex++;
    }else{
        var ChangeAction = {newValue1:html1,
            oldValue1:actionStack[actionIndex - 1].newValue1,
            newValue2:html2,
            oldValue2:actionStack[actionIndex - 1].newValue2,
            type:type,
            obj:obj,
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