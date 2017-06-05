/**
 * Created by yiyunshidai on 2017/4/14.
 */
//window.onload= function(){
function max(yuan,len){
    var y=$(yuan);
    for( var i= 0,maxwidth=len;i< y.length;i++ ){
        if(y[i].innerHTML.length>maxwidth){
            y[i].innerHTML=y[i].innerHTML.substring(0,maxwidth)+'...';
        }
    }
}
//book_detail
//    max('.HotTopic_list_title',30);
//    max('.ClickRanking_title',14);
//    max('.listGroupImage_vertical_title',22);
//    max('.listVideo_vertical_title',22);
//    max('.listHor_text-title',23);
//    max('.listHor_text-content',54);
    //max('.RecommendWithText_list_title a',16);
    //max('.RecommendWithImage_list_dd_title',16);

//};
