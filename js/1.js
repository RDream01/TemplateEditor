/**
 * Created by 大丽丽 on 2017/3/22.
 */

//section--组件
//$('.secPart').on('click',function() {
//    var ref = $(this).attr('name');
//    $.get("editorBlock/" + ref + ".html", function (data) {
//        $('.editorBlock div.row').append(data);
//        $('.newSection').dashboard();
//    })
//});
////header--组件
//$('.headPart').click(function(){
//    var n=$(this).attr('name');
//    $.get("editorHeader/"+n+".html",function( data ){
//        $('.editorHeader').append(data);
//    });
//});

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
            str+='<div class="panel-body"><span onclick="importFile(\''+list[i].blockId+'\')" class="secPart" id="'+list[i].blockId+'" name="list01">'+list[i].blockName+'</span></div></div></div>'

        }
        $('.partAll .panel-group').append(str);
    }

}

function importFile(id ){

    $.get("editorBlock/" + id + ".html", function (data) {
        $('.editorBlock div.row').append(data);
        $('.newSection').dashboard();
    });

}


//2---组件显示状态
var option = [];
var optionSelect={};
var obj = {"header":[],"section":[],"footer":[]};

$('.indexAll').on("click",".appendStr .panel",function(){

    $(".indexAll .appendStr .panel").removeClass('appendCur');
    $(this).addClass("appendCur");

    var id=$(this).parent().attr("id");
    testRight(id);

    //obj.section.push(option);
    optionSelect={};

    var blockId=$('.appendCur #myId').val();
    var block_showId=id+"_"+$(".editorBlock #"+$('.appendCur #myId').val()).length;
    //var block_showId=id+"_"+$(".editorBlock #"+$('.appendCur #myId').val()).index();
    //var block_showId;
    //$(".editorBlock #"+$('.appendCur #myId').val()).each(function(index){
    //    console.log($(this).i)
    //    block_showId=id+"_"+$(this).index("#"+$('.appendCur #myId').val());
    //});

    optionSelect.id = blockId;
    optionSelect.showId = block_showId;

});

//right--属性
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
    for( var i=0;i<list.length;i++ ){
        var str="";
        if( list[i].propertyType=="text" ){
            str='<div class="row control-group"><label class="control-label col-xs-3" for="'+list[i].propertyId+'">'+list[i].propertyName+'</label>';
            str+='<div class="controls col-xs-9"><input onchange="collectProperty(this)" type="text" id="'+list[i].propertyId+'" class="form-input" placeholder="区块名称"></div></div>';
        }else if( list[i].propertyType=="number" ){
            str='<div class="row control-group"><label class="control-label col-xs-3" for="'+list[i].propertyId+'">'+list[i].propertyName+'</label>';
            str+='<div class="controls col-xs-9"><input onchange="collectProperty(this)" type="number" id="'+list[i].propertyId+'" class="form-input" placeholder="区块名称"></div></div>';
        }else if( list[i].propertyType == "select"){
            str='<div class="row control-group"><label class="control-label col-xs-3 " for="'+list[i].propertyId+'">'+list[i].propertyName+'</label>';
            str+='<div class="controls col-xs-9"><select onchange="collectProperty(this)" id="'+list[i].propertyId+'" >';
            str+= '<option value="">请选择</option>';
            for(var j=0;j<list[i].data.length;j++){
                str += '<option value="'+list[i].data[j].value+'">'+list[i].data[j].html+'</option>';
            }
            str+='</select></div></div>';
        }else if( list[i].propertyType == "radio"){
            str='<div class="row control-group"><label class="control-label col-xs-3 " for="'+list[i].propertyId+'">'+list[i].propertyName+'</label>';
            for(var j=0;j<list[i].data.length;j++){
                str += '<label><input name="list[i].propertyId" type="radio" value="'+list[i].data[j].value+'" />'+list[i].data[j].html+'</label> ';
            }
        }else if( list[i].propertyType == "checkbox"){
            str='<div class="row control-group"><label class="control-label col-xs-3 " for="'+list[i].propertyId+'">'+list[i].propertyName+'</label>';
            for(var j=0;j<list[i].data.length;j++){
                str += '<label><input name="list[i].propertyId" type="checkbox" value="'+list[i].data[j].value+'" />'+list[i].data[j].html+'</label> ';
            }
        }

        $('.property').append(str);
    }
}

function collectProperty( obj ){
    //组件
    var propertyVal=$(obj).val();
    var propertyId=$(obj).attr("id");
    optionSelect[propertyId] = propertyVal;
    $(".appendCur").parent().attr("data-showId",optionSelect.showId);
    //var removeShowId=optionSelect.showId;
    //var j="";
    //for( var i= 0;i<optionSelect.length;i++ ){
    //    if( optionSelect[i].showId==removeShowId ){
    //        //console.log("optionSelect[i].showId="+optionSelect[i].showId)
    //        j=i;
    //        //console.log("j="+j);
    //        break;
    //    }
    //}
    //option.splice(j,1);
    //console.log( section )
    //console.log( option )

    //option.push(optionSelect);
    //console.log(option);

    //console.log(  (JSON.stringify(obj)) )
}


//function getChannelList(){
////    alert("getChannelList")
//    $.ajax({
//        async : false,
//        cache:true,
//        type: 'post',
//        dataType : "jsonp",
//        data:{dataType:"jsonp"},  //参数
//        url:"http://192.168.31.156:8080/cmsNews/demo_data/channel_list.do",//请求的action路径
//        error: function () {//请求失败处理函数
//
//        },
//        success:function(data){ //请求成功后处理函数。
////                    alert("成功了")
//        }
//    });
//}
function callback( data ){
    var flag=data.flag;
    (eval(flag+'CallBack'))(data);

}
//function getChannelListCallback( data ){
////    console.log(data)
////    alert(1)
//    for( var i=0;i<data.dataList.length;i++ ){
//        var str="<option value='"+data.dataList[i].channel_id+"'>"+data.dataList[i].channel_name+"</option>"
//        $("#listDataSelect").append(str);
//
//    }
//}





//存储container
window.onload=function(){
    //left
    testLeft();

    $('#keep').click(function(){
        //alert(1);
        var section=obj.section;
        section.push(optionSelect);
        var str=(JSON.stringify(obj)),
            order="";
        $(".editorBlock .appendStr").each(function(){
            if( $(this).css("display")!=="none" ){
                order=order+$(this).attr("data-showId")+',';
            }
            //console.log($(this))
        });
        order=order.substring(0,order.length-1);


        //obj.section.push(option);
        console.log(obj);
        console.log(str);


        //console.log(str,order);

//        $.ajax({
//            async : false,
//            cache:true,
//            type: 'POST',
//            dataType : "jsonp",
//            data:{strKey:str,order:order},  //参数
//            url:"http://192.168.31.156:8080/cmsNews/demo_data/test.do",//请求的action路径
//            error: function () {//请求失败处理函数
//
//            },
//            success:function(data){ //请求成功后处理函数。
////                    alert("成功了")
//            }
//        });

        var str=$('.main').html();
        str = str.replace(/<(script)[\S\s]*?\/\1>/gi, '');
        $('.main').html( str );
        $.zui.store.set('name', str);
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


