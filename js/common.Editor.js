/**
 * Created by 大丽丽 on 2017/3/22.
 */
//1---引用文件
//section--组件
//$('.secPart').on('click',function() {
//    var ref = $(this).attr('name');
//    $.get("editorSection/" + ref + ".html", function (data) {
//        $('.editorSection div.row').append(data);
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
    console.log(data)
    var list=data.dataList,
        str="";
    for( var i=0;i<list.length;i++ ){
        if( list[i].blockType=="list" ){
            str= '<div class="panel panel-default"><div class="panel-heading"><h4 class="panel-title">'
            str+='<a data-toggle="collapse" data-parent="#accordionPanels" href="#'+list[i].blockType+'">列表组件 </a></h4></div>'
            str+='<div id="'+list[i].blockType+'" class="panel-collapse collapse in">'
            str+='<div class="panel-body"><span onclick="upload(\''+list[i].blockPath+'\')" class="secPart" id="'+list[i].blockId+'" name="list01">'+list[i].blockName+'</span></div></div></div>'
            //str+='<div class="panel-body"><span onclick="importFile(\''+list[i].blockId+'\')" class="secPart" id="'+list[i].blockId+'" name="list01">'+list[i].blockName+'</span></div></div></div>'

        }

        //importFile(list[i].blockId,list[i].blockPath);

        $('.partAll .panel-group').append(str);
    }


}

function importFile(url ){


    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var f1 = fso.GetFile(url);
    console.log(url);
    console.log("File last modified: " + f1.DateLastModified);

    //$.get("editorSection/" + id + ".html", function (data) {
    //    $('.editorSection div.row').append(data);
    //    $('.newSection').dashboard();
    //})

}





//2---组件显示状态
$('.indexAll').on("click",".appendStr .panel",function(){
    $(".indexAll .appendStr .panel").removeClass('appendCur');
    $(this).addClass("appendCur");

    var id=$(this).attr("id");
    //console.log(id);
    testRight(id);
//        alert(2)

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
    for( var i=0;i<list.length;i++ ){
        var str="";
        if( list[i].type=="text" ){
            str='<div class="row control-group"><label class="control-label col-xs-3" for="listName">'+list[i].name+'</label>'
            str+='<div class="controls col-xs-9"><input type="text" id="'+list[i].id+'" class="form-input" placeholder="区块名称"></div></div>'
        }
        //console.log(str)
        $('.property').append(str);

    }
}


//提交button---属性
var obj = {"header":[],"section":[],"footer":[]};
$(".submitBtn").click(function(){

    var type=$(this).attr("data-group");
    var name=$(this).attr("data-name");
    var id=$('.appendCur #myId').val();
//        var code=$(".appendCur#"+id).prop("outerHTML");


    //headGroup
    if( type=="headGroup" ){
        var headName=$("#headName").val(),
            headNum=$("#headNum").val(),
            headData=$("#headData option:selected").val();
        $(".appendCur#"+id+" .title").html(headName);
        var code=$(".appendCur#"+id).prop("outerHTML");

        var option = {};
        option.id = id;
        option.showId = id+"_"+$(".editorHeader #"+id).length;
        option.type = type;
        option.code = code;
        option.headNum = headNum;
        option.headData = headData;

        $(".appendCur#"+id).attr("showId",option.showId);

        obj.header.push(option);
        console.log(  (JSON.stringify(obj)) );

        //listGroup
    }else if( type=="listGroup" ){
        var listName=$("#listName").val(),
            listNum=$("#listNum").val(),
            listData=$("#listDataSelect option:selected").val();
        console.log(listData)
        $(".appendCur#"+id+" .title").html( listName );
        var code=$(".appendCur#"+id).prop("outerHTML");

        var option = {};
        option.id = id;
        option.showId = id+"_"+$(".editorSection #"+id).length;
        option.type = type;
        option.code = code;
        option.listNum = listNum;
        option.listData = listData;

        $(".appendCur#"+id).attr("data-showId",option.showId);


        $(".appendCur#"+id+" #listData01").val(listData);
//            alert(listData)
        $(".appendCur#"+id+" #listNum01").val(listNum);

        console.log($(".appendCur#"+id+" #listNum01").val());


//            text();
        obj.section.push(option);
        console.log(  (JSON.stringify(obj)) )




    }


//        $(this).parent().parent()[0].reset();

});


//
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
    //if( data.flag=="channel_list" ){
    //    getChannelListCallback(data);
    //}else if( data.flag=="channel_article_list_index" ){
    //    textCallBack(data);
    //}else if(data.flag=="testRight"){
    //    testRightCallBack(data);
    //}else

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
        alert(1);
        var str=(JSON.stringify(obj)),
            order="";
        $(".editorSection .appendStr").each(function(){
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
            data:{strKey:str,order:order},  //参数
            url:"http://192.168.31.156:8080/cmsNews/demo_data/test.do",//请求的action路径
            error: function () {//请求失败处理函数

            },
            success:function(data){ //请求成功后处理函数。
//                    alert("成功了")
            }
        });

        var str=$('.main').html();
        str = str.replace(/<(script)[\S\s]*?\/\1>/gi, '');
        $('.main').html( str );
        $.zui.store.set('name', str);
        window.location.href="container.html";

    })




}



//    function callback(){
//        var str=$('.main').html();
//        str = str.replace(/<(script)[\S\s]*?\/\1>/gi, '');
//        $('.main').html( str );
//        $.zui.store.set('name', str);
//        window.location.href="container.html";
//        console.log( $('.main').html() );
//    }


