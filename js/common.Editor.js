/**
 * Created by 大丽丽 on 2017/3/22.
 */

//callback
function callback( data ){
    var flag=data.flag;
    (eval(flag+'CallBack'))(data);

}
//1---引用文件
function blockLeftList(){
    $.ajax({
        async : false,
        cache:true,
        type: 'post',
        dataType : "jsonp",
        data:{dataType:"jsonp",gridSize:"3"},  //参数
        url:"http://192.168.31.156:8080/cmsNews/template_editor/blockLeftList.do",//请求的action路径
        error: function () {//请求失败处理函数
        },
        success:function(data){ //请求成功后处理函数。
        }
    });
}
function blockLeftListCallBack(data){
    //console.log(data);
    var list=data.dataList;
    for( var i=0;i<list.length;i++ ){
        var str='';
        if( list[i].blockType=="list" ){
            if( $("#listBlock").html()==undefined ){
                str = '<div id="listBlock" class="panel panel-default"><div class="panel-heading"><h4 class="panel-title">';
                str += '<a data-toggle="collapse" data-parent="#accordionPanels" href="#' + list[i].blockType + '">列表组件 </a></h4></div>'
                str += '<div id="' + list[i].blockType + '" class="panel-collapse collapse in">';
                str += '<div class="panel-body"><span onclick="importFile(\'' + list[i].blockId + '\',\'' + list[i].blockPath + '\')" class="secPart" id="' + list[i].blockId + '" name="list01">' + list[i].blockName + '</span></div></div></div>';
            }else{
                str += '<span onclick="importFile(\'' + list[i].blockId + '\',\'' + list[i].blockPath + '\')" class="secPart" id="' + list[i].blockId + '" name="list01">' + list[i].blockName + '</span>';
                $('#listBlock .panel-body').append(str);
                continue;
            }


        }else if( list[i].blockType=="adv" ){
            if( $("#advBlock").html()==undefined ){
                str = '<div id="advBlock" class="panel panel-default"><div class="panel-heading"><h4 class="panel-title">';
                str += '<a data-toggle="collapse" data-parent="#accordionPanels" href="#' + list[i].blockType + '">广告组件</a></h4></div>';
                str += '<div id="' + list[i].blockType + '" class="panel-collapse collapse in">';
                str += '<div class="panel-body"><span onclick="importFile(\'' + list[i].blockId + '\',\'' + list[i].blockPath + '\')" class="secPart" id="' + list[i].blockId + '" name="list01">' + list[i].blockName + '</span></div></div></div>';
            }else{
                str += '<span onclick="importFile(\'' + list[i].blockId + '\',\'' + list[i].blockPath + '\')" class="secPart" id="' + list[i].blockId + '" name="list01">' + list[i].blockName + '</span>';
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
//2---引用组件文件
function importFile(id,path ){
    $.get("../editorBlock/" + id + ".html", function (data) {

        var block_showId;
        var blockCur=$(".editorBlock ."+id);
        //console.log(blockCur)
        if(blockCur.length == 0){
            block_showId = id+"_0";
        }else{
            for(var i = 0; i<blockCur.length;i++){
                if( i==(blockCur.length-1) ){
                    i=i+1;
                    block_showId=id+"_"+i;
                }
            }
        }

        notNull();
        $(".indexAll .appendStr .panel").removeClass('appendCur');
        data=data.replace("<html>",'');
        data=data.replace("</html>",'');
        data=data.replace("panel","panel appendCur");
        data=data.replace(/vData/g,"vData_"+block_showId);

        $('.editorBlock div.row').append(data);

        optionSelect={};

        optionSelect.id = id;
        optionSelect.showId = block_showId;
        optionSelect.blockPath = path;
        $(".appendCur").parent().attr("data-showId",optionSelect.showId);

        obj.section.push(optionSelect);

        propertyRightList(id);
        $('.newSection').dashboard();
    });

}

//2---组件显示状态
$('.indexAll').on("click",".appendStr",function(){
    notNull();
    $(".indexAll .appendStr ").children(".panel").removeClass('appendCur');
    $(this).children(".panel").addClass("appendCur");
    var id=$(this).attr("id");
    propertyRightList(id);

});

//______________________________________right--属性
function propertyRightList(id){
    $.ajax({
        async : false,
        cache:true,
        type: 'post',
        dataType : "jsonp",
        data:{dataType:"jsonp",blockId:id},  //参数
        url:"http://192.168.31.156:8080/cmsNews/template_editor/propertyRightList.do",//请求的action路径
        error: function () {//请求失败处理函数

        },
        success:function(data){ //请求成功后处理函数。
        }
    });
}
function propertyRightListCallBack(data){
    //console.log(data);
    var list=data.dataList;

    $(".property").html("");

    var showId=$(".appendCur").parent().attr("data-showId");
    var blockProAll;
    for(var i= 0;i<obj.section.length;i++){
        if(obj.section[i].showId == showId){
            blockProAll=obj.section[i];
        }
    }

    for( var i=0;i<list.length;i++ ){
        var str="";
        if( list[i].propertyType=="text" ){
            str='<div class="row control-group">' ;
            str+='<label class="control-label col-xs-4" for="'+list[i].propertyId+'">';
            if( list[i].notNull=="yes" ){
                str+='<span class="notNullColor">* </span>';
            }
            str+=list[i].propertyName+'</label>';
            str+='<div class="controls col-xs-8"><input data-notNull="'+list[i].notNull+'" onchange="collectProperty(this,'+list[i].minValue+','+list[i].maxValue+')" type="text" id="'+list[i].propertyId+'"';
            var curId=list[i].propertyId;
            str+='value="';
            if( blockProAll[curId]!==undefined){
                str+=blockProAll[curId];
            }else if( list[i].defaultValue!==undefined ){
                str+=list[i].defaultValue;
            }
            str+='"';
            str+=' class="form-input" placeholder="区块名称"></div></div>';

        }else if( list[i].propertyType=="number" ){
            str='<div class="row control-group"><label class="control-label col-xs-4" for="'+list[i].propertyId+'">';
            if( list[i].notNull=="yes" ){
                str+='<span class="notNullColor">* </span>';
            }
            str+=list[i].propertyName+'</label>';
            str+='<div class="controls col-xs-8"><input data-notNull="'+list[i].notNull+'" onchange="collectProperty(this,'+list[i].minValue+','+list[i].maxValue+')" type="number" id="'+list[i].propertyId+'"' ;
            var curId=list[i].propertyId;
            str+='value="';
            if( blockProAll[curId]!==undefined){
                str+=blockProAll[curId];
            }else if( list[i].defaultValue!==undefined ){
                str+=list[i].defaultValue;
            }
            str+='"';
            str+=' class="form-input" placeholder="区块名称"></div></div>';
        }else if( list[i].propertyType == "select"){
            str='<div class="row control-group"><label class="control-label col-xs-4 " for="'+list[i].propertyId+'">';
            if( list[i].notNull=="yes" ){
                str+='<span class="notNullColor">* </span>';
            }
            str+=list[i].propertyName+'</label>';
            str+='<div class="controls col-xs-8"><select onchange="collectProperty(this)" data-notNull="'+list[i].notNull+'" id="'+list[i].propertyId+'" >';
            str+= '<option value="">请选择</option>';
            for(var j=0;j<list[i].data.length;j++){
                str += '<option value="'+list[i].data[j].value+'"' ;
                var curId=list[i].propertyId;
                if( (blockProAll[curId]!==undefined)&&(blockProAll[curId]!=="") ){
                    if( blockProAll[curId]==list[i].data[j].value ){
                        str+='selected';
                    }
                }else if( list[i].defaultValue!==undefined ){
                    if( list[i].defaultValue==list[i].data[j].value ){
                        str+='selected';
                    }
                }
                str+='>'+list[i].data[j].html+'</option>';
            }
            str+='</select></div></div>';

        }else if( list[i].propertyType == "radio"){
            str='<div class="row control-group"><p class="control-label col-xs-3 ">';
            if( list[i].notNull=="yes" ){
                str+='<span class="notNullColor">* </span>';
            }
            str+=list[i].propertyName+'</p>';

            if( list[i].notNull=="yes" ){
                var curId=list[i].propertyId;
                str+='<input type="hidden" id="'+list[i].propertyId+'_radio" value="' ;

                if(  (blockProAll[curId]!==undefined)&&(blockProAll[curId]!=="") ){
                    str+="1";
                }else if( list[i].defaultValue!==undefined ){
                    str+=list[i].defaultValue;
                }
                str+='" data-notNull="yes"/>';
            }

            for(var j=0;j<list[i].data.length;j++){
                str += '<label><input name="'+list[i].propertyId+'" onchange=collectProperty(this) type="radio" value="'+list[i].data[j].value+'" ';
                var curId=list[i].propertyId;
                if( (blockProAll[curId]!==undefined)&&(blockProAll[curId]!=="") ){
                    if( blockProAll[curId]==list[i].data[j].value ){
                        str+='checked';
                    }
                }else if( list[i].defaultValue!==undefined ){
                    if( list[i].defaultValue==list[i].data[j].value ){
                        str+='checked';
                    }
                }
                str+='/>'+list[i].data[j].html+'</label> ';
            }
            str+="</div>";

        }else if( list[i].propertyType == "checkbox"){
            str='<div class="row control-group"><p class="control-label col-xs-3 " for="'+list[i].propertyId+'">';
            if( list[i].notNull=="yes" ){
                str+='<span class="notNullColor">* </span>';
            }
            str+=list[i].propertyName+'</p>';

            if( list[i].notNull=="yes" ){

                var curId=list[i].propertyId;
                str+='<input type="hidden" id="'+list[i].propertyId+'_checkbox" value="' ;
                if( (blockProAll[curId]!==undefined)&&(blockProAll[curId]!=="") ){
                    console.log(blockProAll[curId])
                    str+="1";
                }else if( list[i].defaultValue!==undefined ){
                    str+=list[i].defaultValue;
                }
                str+='" data-notNull="yes"/>';
            }

            for(var j=0;j<list[i].data.length;j++){
                str += '<label><input name="'+list[i].propertyId+'" onclick=collectProperty(this) type="checkbox" value="'+list[i].data[j].value+'" ';
                var curId=list[i].propertyId;
                if( (blockProAll[curId]!==undefined)&&(blockProAll[curId]!=="") ){
                    for( var k=0;k<blockProAll[curId].length;k++ ){
                        if( blockProAll[curId][k]==list[i].data[j].value ){
                            str+='checked';
                        }
                    }
                }else if( list[i].defaultValue!==undefined ){
                    var arr=(list[i].defaultValue).split(",");
                    for( var k=0;k<arr.length;k++ ){
                        if( arr[k]==list[i].data[j].value ){
                            str+='checked';
                        }
                    }
                }
                str+='/>'+list[i].data[j].html+'</label>';
            }
            str+="</div>";
        }
        $('.property').append(str);
    }
    $(".property").append('<div class="deleteBlockDiv"><button class="deleteBlockBtn btn btn-primary" onclick="deleteBlock(\''+showId+'\')">删除此组件</button></div>');
}

//onfocus
$(".property").on("focus","input",function(){
    $(this).attr("data-prevVal",$(this).val());
});

//collectProperty
function collectProperty( property,min,max ){
    var showId=$(".appendCur").parent().attr("data-showId");
    //组件
    if( $(property).attr("type")=="radio" ){

        var propertyVal=$(property).val();
        var propertyId=$(property).attr("name");
        $("#"+propertyId+"_radio").val(propertyVal);


    }else if( $(property).attr("type")=="checkbox" ){

        var propertyId=$(property).attr("name");
        $("#"+propertyId+"_checkbox").val("");

        var propertyVal="";
        var box=$("[name="+propertyId+"]");
        for( var i=0;i<box.length;i++ ){
            if( $(box[i]).prop("checked") ){
                var propertyChecked=$(box[i]).val();
                propertyVal+=propertyChecked+",";
                $("#"+propertyId+"_checkbox").val("1");
            }
        }
        propertyVal=propertyVal.substring(0,propertyVal.length-1);

    }else if( $(property).attr("type")=="number" ){
        var val=$(property).val();
        var propertyId=$(property).attr("id");
        if( ((/^[1-9]\d*$/).test(val))&&(val>=min)&&(val<=max) ){
            var propertyVal=val;
            $(".appendCur .v_"+propertyId).val(propertyVal);
            eval("vData_"+showId)();
        }else{
            $(property).val($(property).attr("data-prevVal"));
            alert("数量范围为"+min+"~"+max+"的正整数");
            return;
        }

    }else if( $(property).attr("type")=="text" ){
        var val=$(property).val();
        var propertyId=$(property).attr("id");
        if( (val.length>=min)&&(val.length<=max) ){
            var propertyVal=val;
            $(".appendCur .v_"+propertyId).val(propertyVal);
            eval("vData_"+showId)();
        }else{
            $(property).val($(property).attr("data-prevVal"));
            alert("范围为"+min+"~"+max+"个文字");
            return;
        }

    }else{
        var propertyVal=$(property).val();
        var propertyId=$(property).attr("id");

    }

    for(var i= 0;i<obj.section.length;i++){
        if(obj.section[i].showId == showId){
            //obj.section[i][propertyId]=propertyVal;
            //console.log( propertyVal )
            if( (propertyVal==undefined)||(propertyVal=="") ){
                //alert(1)
                delete obj.section[i][propertyId];
            }else{
                obj.section[i][propertyId]=propertyVal;
            }
            break;
        }
    }

    notNull(1);
}

//nouNull
function notNull(flag){
    var notNull=$("[data-notNull]");
    //console.log(notNull);
    var notCur='yes';
    for( var i=0;i<notNull.length;i++ ){
        if( $(notNull[i]).attr("data-notNull")=="yes" ){
            if( $(notNull[i]).val()=="" ){
                if( flag=="1" ) {
                    //alert($(notNull[i]).val());
                    //alert("必填项不能为空");
                }
                //$(notNull[i]).addClass("notNull");
                notCur="no";
            }else{
                //$(notNull[i]).removeClass("notNull");
            }
        }
    }

    if(  notCur=="no" ){
        $(".appendCur").addClass("appendNot");
    }else{
        $(".appendCur").removeClass("appendNot");
    }

}

//deleteBlock
function  deleteBlock(removeShowId){
    if( confirm("确认删除此组件") ){
        var j;
        for(var i= 0;i<obj.section.length;i++){
            if(obj.section[i].showId == removeShowId){
                j=i;
                break;
            }
        }
        obj.section.splice(j,1);

        $("[data-showId="+removeShowId+"]").remove();
        $(".property").html("")

    }


}


//存储container
window.onload=function(){
    //left
    blockLeftList();
    //保存
    $('#keep').click(function(){

        console.log( JSON.stringify(obj) );

        var appendStr=$(".appendStr .panel");
        var notCur='yes';

        for( var i=0;i<appendStr.length;i++ ){
            //console.log($(appendStr[i]).hasClass("appendNot"));
            if( $(appendStr[i]).hasClass("appendNot") ){
                $(".appendStr .panel").removeClass("appendCur");
                $(".property").html("");
                notCur="no";
            }
        }

        if(notCur=='no'){
            alert("标记蓝色的组件有必填项没有填写");
        }else if( notCur=='yes' ){
            var str=(JSON.stringify(obj)),
                order="";
            $(".editorBlock .appendStr").each(function(){
                if( $(this).css("display")!=="none" ){
                    order=order+$(this).attr("data-showId")+',';
                }
            });
            order=order.substring(0,order.length-1);
            console.log(str,order);

            $.ajax({
                async : false,
                cache:true,
                type: 'POST',
                dataType : "jsonp",
                data:{strKey:str,order:order,dataType :"jsonp"},  //参数
                url:"http://192.168.31.156:8080/cmsNews/template_editor/saveTemplate.do",//请求的action路径
                error: function () {//请求失败处理函数

                },
                success:function(data){ //请求成功后处理函数。
                    alert("成功了")
                }
            });
        }
    })
};

function saveTemplateCallBack(){

}

    //function callback(){
//        var str=$('.main').html();
//        str = str.replace(/<(script)[\S\s]*?\/\1>/gi, '');
//        $('.main').html( str );
//        $.zui.store.set('name', str);
//        window.location.href="container.html";
//        console.log( $('.main').html() );
//    }


