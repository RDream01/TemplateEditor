var isLoginFlag = "false";

//新闻、专题、投票、话题、组图、视频详情点击跳转方法
function goContentDetial(url,channelId){
	window.location.href=url + "?channelId=" + channelId;
}

//点击栏目跳转栏目页面详情页面
function goChannelDetail(url,channelId){
	window.location.href=url;
}

//点击搜索按钮
function goSearchDetail(url,title){
	window.location.href=url + "?title=" + title;
}

//判断是否登录
function isLogin(){
	$.ajax({
        async: false,
        cache: true,
        type: 'post',
        dataType: "jsonp",
        data: {callBack: "loginFlag"},  //参数
        url: basePath + "blockData/isLoginFlag.do",//请求的action路径
        success: function (data) { //请求成功后处理函数。
        }
    });
}
function loginFlag(data){
	if(data.loginFlag == "success"){
		isLoginFlag = "true";
	}
}