var isLoginFlag = "false";

//新闻、专题、投票、话题、组图、视频详情点击跳转方法
function goContentDetial(url,channelId){
	window.open(url + "?channelId=" + channelId,'_blank');
	//window.location.href=url + "?channelId=" + channelId;
}

//点击栏目跳转栏目页面详情页面
function goChannelDetail(url,channelId){
	window.location.href=url;
}

//点击搜索按钮
function goSearchDetail(url,title){
	window.open(url + "?title=" + title,'_blank');
	//window.location.href=url + "?title=" + title;
}

//判断是否登录
//function isLogin(){
	$.ajax({
        async: false,
        cache: true,
        type: 'post',
        dataType: "jsonp",
        data: {callBack: "loginFlag"},  //参数
        url: blockBasePath + "blockData/isLoginFlag.do",//请求的action路径
        success: function (data) { //请求成功后处理函数。
        }
    });
//}
function loginFlag(data){
	if(data.loginFlag == "success"){
		isLoginFlag = "true";
	}
	try{
		article_4g3_3_3group1tData();
	}catch(e){}
	try{
                voteImg_4g3_1_3group1tData();
        }catch(e){}
	try{
                videoDetail_4g3_1_3group1tData();
        }catch(e){}
	try{
                topicNormal_4g3_0_3group1tData();
        }catch(e){}
	try{
                pictures_4g3_1_3group1tData();
        }catch(e){}
}
