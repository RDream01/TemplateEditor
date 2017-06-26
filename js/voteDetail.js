/**
 * Created by Admin on 2016/8/5.
 */
var btn=document.querySelector('.mainColor_background');
//var form1=document.querySelector('#form1');
//var close=document.querySelector('.close');
function showValidation(){
//    form1.style.display='block';
    $("body #form1").css("display","block");
//	form1.style.display='block';
}
$("body").on("click",".close",function(){
    $("body #form1").css("display","none");
//	form1.style.display='none';
    voteOptionIds = '';
})
//投票弹出框
window.onload=function(){
    createCode();
};
var code;
function createCode()
{
    code = "";
    var codeLength = 5; //验证码的长度
    var checkCode = document.getElementById("checkCode");
    var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //所有候选组成验证码的字符，当然也可以用中文的
    for(var i = 0; i < codeLength; i++)
    {
        var charNum = Math.floor(Math.random() * 52);
        code += codeChars[charNum];
    }
    if(checkCode)
    {
        checkCode.className = "code";
        checkCode.innerHTML = code;
    }
}
function validateCode()
{
    var inputCode=$("#inputCode").val();
    console.log(inputCode.toUpperCase());
    console.log(code.toUpperCase());
    if(inputCode.length <= 0)
    {
        alert("请输入验证码！");
    }
    else if(inputCode.toUpperCase() != code.toUpperCase())
    {
        alert("验证码输入有误！");
        createCode();
    }
    else
    {
        //alert("验证码正确！");
        vote(articleId,voteOptionIds);
    }
}

//颜色+长度
function createColler(){
    //颜色+长度
    var colorList = ["#FFFF99","#B5FF91","#94DBFF","#FFBAFF","#FFBD9D","#C7A3ED","#CC9898","#8AC007","#CCC007","#FFAD5C"],
    // var colorList = ["#fbbc05","#34a826","#4285f4","#cc3333"],
            spans=$('.voteImg_4g3_voteMeter>span'),
            percent=$('.percent');
            console.log(spans);
            console.log(percent);
    for( var i=0;i<spans.length;i++ ){
        spans[i].style.backgroundColor=getColorByRandom(colorList);
        spans[i].style.width=parseFloat($('.voteImg_4g3_voteMeter').css('width'))/100*parseFloat(percent[i].innerHTML)+'px';
    }
    function getColorByRandom(colorList){
        var colorIndex = Math.floor(Math.random()*colorList.length);
        var color = colorList[colorIndex];
        colorList.splice(colorIndex,1);
        return color;
    }
}
// window.onload=function(){
    // createColler();
// }



/**
 * Created by anyan on 2016/8/5. 后台JS--start
 */
var voteOptionIds = '';
var articleId = '';
function toVote(voteId){
    articleId = voteId;
    for(var i=0;i < $("input[name='football']").length;i++){
//		console.log($('[name="football"]')[i]);
        if($("input[name='football']:checked")[i]){
            if(voteOptionIds=='' || voteOptionIds==undefined) voteOptionIds = $("input[name='football']:checked")[i].value;
            else voteOptionIds += ',' + $("input[name='football']:checked")[i].value;
        }
    }
    if(voteOptionIds == ''){
        alert("您还没有选择投票选项");
    }else{
        var postData =  {"voteOptionIds":voteOptionIds,"voteId":voteId};
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1/createHtml/goValidationVote.do',
            data:postData,
            dataType:'jsonp',
            cache: false,
            async: false,//同步方法
            success: function(data){}
        });
    }
}

function validationCallback(data){
    if(data.result=="offline"){
        alert("投票已结束");
    }else if(data.result=="Login"){
        alert("请先去登录");
    }else if(data.result=="validation"){
        showValidation();
    }else if(data.result=="limitTime"){
        alert(data.limitNum+"小时内不能重复投票");
    }else if(data.result=="success"){
        vote(articleId,voteOptionIds);
    }
}

function vote(voteId,voteOptionIds){
    url="http://127.0.0.1/createHtml/goVote.do?voteId="+voteId+"&voteOptionIds="+voteOptionIds;
    $.ajax({
        type: 'POST',
        url:url,
        data:[],
        dataType:'jsonp',
        cache: false,
        async: false,//同步方法
        success: function(data){}
    });
}

function goVoteCallback(data){
    alert("投票成功");
    $(".clearFloat").remove();
    $(".voteImg_4g3_voteBtn").remove();
    $("#form1").remove();
    var url = "http://127.0.0.1/blockData/getVoteInfo.do";
    var postData = {'articleId':articleId,'voteOptionIds':data.voteOptionIds};
    $.ajax({type:'POST',url:url,data:postData,dataType:'jsonp',cache:false,
        async: true,//同步方法
        success:function(data){}
    });
}



//后台JS--end