/**
 * Created by 大丽丽 on 2017/3/22.
 */

//callback
function callback( data ){
    var flag=data.flag;
    (eval(flag+'CallBack'))(data);

}
//1---引用文件
function testLeft(){
    $.ajax({
        async : false,
        cache:true,
        type: 'post',
        dataType : "jsonp",
        data:{dataType:"jsonp"},  //参数
        url:"http://192.168.31.156:8080/cmsNews/demo_data/testLeft.do",//请求的action路径
        error: function () {//请求失败处理函数
        },
        success:function(data){ //请求成功后处理函数。
        }
    });
}
function testLeftCallBack(data){
    //console.log(data)
    var list=data.dataList,
        str="";
    for( var i=0;i<list.length;i++ ){
        if( list[i].blockType=="list" ){
            str= '<div class="panel panel-default"><div class="panel-heading"><h4 class="panel-title">'
            str+='<a data-toggle="collapse" data-parent="#accordionPanels" href="#'+list[i].blockType+'">列表组件 </a></h4></div>'
            str+='<div id="'+list[i].blockType+'" class="panel-collapse collapse in">'
            str+='<div class="panel-body"><span onclick="importFile(\''+list[i].blockId+'\',\''+list[i].blockPath+'\')" class="secPart" id="'+list[i].blockId+'" name="list01">'+list[i].blockName+'</span></div></div></div>'

        }
        $('.partAll .panel-group').append(str);
    }
}

var option = [];
var optionSelect={};
var obj = {"header":[],"section":[],"footer":[]};
//2---引用组件文件
function importFile(id,path ){
    $.get("../editorBlock/" + id + ".html", function (data) {

        $(".indexAll .appendStr .panel").removeClass('appendCur');
        data=data.replace("<html>",'');
        data=data.replace("</html>",'');
        data=data.replace("panel","panel appendCur");

        $('.editorBlock div.row').append(data);

        optionSelect={};

        var blockId=$('.appendCur #myId').val();
        var block_showId;

        var blockCur=$(".editorBlock ."+$('.appendCur #myId').val());
        for(var i = 0; i<blockCur.length;i++){
            if( i==(blockCur.length-1) ){
                block_showId=blockId+"_"+i;
            }
        }
        optionSelect.id = blockId;
        optionSelect.showId = block_showId;
        optionSelect.blockPath = path;
        $(".appendCur").parent().attr("data-showId",optionSelect.showId);

        obj.section.push(optionSelect);

        testRight(id);
        $('.newSection').dashboard();
    });

}

//2---组件显示状态
$('.indexAll').on("click",".appendStr",function(){

    $(".indexAll .appendStr ").children(".panel").removeClass('appendCur');
    $(this).children(".panel").addClass("appendCur");
    var id=$(this).attr("id");
    testRight(id);

});

//______________________________________right--属性
function testRight(id){
    $.ajax({
        async : false,
        cache:true,
        type: 'post',
        dataType : "jsonp",
        data:{dataType:"jsonp",blockId:id},  //参数
        url:"http://192.168.31.156:8080/cmsNews/demo_data/testRight.do",//请求的action路径
        error: function () {//请求失败处理函数

        },
        success:function(data){ //请求成功后处理函数。
        }
    });
}
function testRightCallBack(data){
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
        var str="<div>删除</div>";
        if( list[i].propertyType=="text" ){
            str='<div class="row control-group"><label class="control-label col-xs-3" for="'+list[i].propertyId+'">'+list[i].propertyName+'</label>';
            str+='<div class="controls col-xs-9"><input onchange="collectProperty(this)" type="text" id="'+list[i].propertyId+'"';
            var curId=list[i].propertyId;
            if( blockProAll[curId]!==undefined){
                str+='value="'+blockProAll[curId]+'"';
            }
            str+=' class="form-input" placeholder="区块名称"></div></div>';
        }else if( list[i].propertyType=="number" ){
            str='<div class="row control-group"><label class="control-label col-xs-3" for="'+list[i].propertyId+'">'+list[i].propertyName+'</label>';
            str+='<div class="controls col-xs-9"><input onchange="collectProperty(this)" type="number" id="'+list[i].propertyId+'"' ;
            var curId=list[i].propertyId;
            if( blockProAll[curId]!==undefined){
                str+='value="'+blockProAll[curId]+'"';
            }
            str+=' class="form-input" placeholder="区块名称"></div></div>';
        }else if( list[i].propertyType == "select"){
            str='<div class="row control-group"><label class="control-label col-xs-3 " for="'+list[i].propertyId+'">'+list[i].propertyName+'</label>';
            str+='<div class="controls col-xs-9"><select onchange="collectProperty(this)" id="'+list[i].propertyId+'" >';
            str+= '<option value="">请选择</option>';
            for(var j=0;j<list[i].data.length;j++){
                str += '<option value="'+list[i].data[j].value+'"' ;
                var curId=list[i].propertyId;
                if( blockProAll[curId]!==undefined){
                    if( blockProAll[curId]==list[i].data[j].value ){
                        str+='selected';
                    }
                }
                str+='>'+list[i].data[j].html+'</option>';
            }
            str+='</select></div></div>';
        }else if( list[i].propertyType == "radio"){
            str='<div class="row control-group"><p class="control-label col-xs-3 ">'+list[i].propertyName+'</p>';
            for(var j=0;j<list[i].data.length;j++){
                str += '<label><input name="'+list[i].propertyId+'" onchange=collectProperty(this) type="radio" value="'+list[i].data[j].value+'" ';
                var curId=list[i].propertyId;
                if( blockProAll[curId]!==undefined){
                    if( blockProAll[curId]==list[i].data[j].value ){
                        str+='checked';
                    }
                }
                str+='/>'+list[i].data[j].html+'</label> ';
            }
            str+="</div>";
        }else if( list[i].propertyType == "checkbox"){
            str='<div class="row control-group"><p class="control-label col-xs-3 " for="'+list[i].propertyId+'">'+list[i].propertyName+'</p>';
            for(var j=0;j<list[i].data.length;j++){
                str += '<label><input name="'+list[i].propertyId+'" onclick=collectProperty(this) type="checkbox" value="'+list[i].data[j].value+'" ';
                var curId=list[i].propertyId;
                if( blockProAll[curId]!==undefined){
                    for( var k=0;k<blockProAll[curId].length;k++ ){
                        if( blockProAll[curId][k]==list[i].data[j].value ){
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

//collectProperty

function collectProperty( property ){
    //组件
    if( $(property).attr("type")=="radio" ){
        var propertyVal=$(property).val()
        var propertyId=$(property).attr("name");

    }else if( $(property).attr("type")=="checkbox" ){
        var propertyArr=[];
        var propertyName=$(property).attr("name");
        var box=$("[name="+propertyName+"]");
        for( var i=0;i<box.length;i++ ){
            if( $(box[i]).prop("checked") ){
                var propertyChecked=$(box[i]).val();
                propertyArr.push(propertyChecked);
            }
        }
        var propertyVal=propertyArr;
        var propertyId=$(property).attr("name");

    }else{
        var propertyVal=$(property).val();
        //console.log(propertyVal);
        var propertyId=$(property).attr("id");

        var showId=$(".appendCur").parent().attr("data-showId");
        //console.log($("[data-showId="+showId+"]").html())

        //$(".appendCur").parent().find($("#"+propertyId)).val(propertyVal);
        //console.log($(".appendCur").parent().find(("#"+propertyId)).html(propertyVal))
    }

    var showId=$(".appendCur").parent().attr("data-showId");
    for(var i= 0;i<obj.section.length;i++){
        if(obj.section[i].showId == showId){
            obj.section[i][propertyId]=propertyVal;
            break;
        }
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
    testLeft();

    //保存
    $('#keep').click(function(){

        var str=(JSON.stringify(obj)),
            order="";
        $(".editorBlock .appendStr").each(function(){
            if( $(this).css("display")!=="none" ){
                order=order+$(this).attr("data-showId")+',';
            }
            //console.log($(this))
        });
        order=order.substring(0,order.length-1);

        console.log(str,order);



        //var str=$('.main').html();
        //str = str.replace(/<(script)[\S\s]*?\/\1>/gi, '');
        //$('.main').html( str );
        //$.zui.store.set('name', str);
        //window.location.href="container.html";

    })
};


//    function callback(){
//        var str=$('.main').html();
//        str = str.replace(/<(script)[\S\s]*?\/\1>/gi, '');
//        $('.main').html( str );
//        $.zui.store.set('name', str);
//        window.location.href="container.html";
//        console.log( $('.main').html() );
//    }


