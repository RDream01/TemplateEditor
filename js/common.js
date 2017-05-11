/**
 * Created by 大丽丽 on 2017/5/9.
 */
//新建编辑器--带过来的数据
var basePath="http://192.168.31.2:8400/";
var modalNewEditor;
//var modalLeadIn;
if( $.zui.store.get('modalNewEditorName')!==undefined ){
    modalNewEditor=$.zui.store.get('modalNewEditorName');
    console.log(modalNewEditor);
    $("#gridSize").val(modalNewEditor.gridSize);
    $("#blockStyle").val(modalNewEditor.blockStyle);
    $("#templateColor").val(modalNewEditor.templateColor);
    $("#templateId").val(modalNewEditor.templateId);
    $("#templateLayout").val(modalNewEditor.templateLayout);
}else{
    console.log("空的");
}

//栅格系统
var gridSizeVal=$("#gridSize").val();
$("#gridSizeScript").attr("src","../js/common.Editor_"+gridSizeVal+"g.js");
$("#gridDashboardScript").attr("src","../js/zui.dashboard_"+gridSizeVal+"g.js");
$.getScript("../js/common.Editor_"+gridSizeVal+"g.js");
$.getScript("../js/zui.dashboard_"+gridSizeVal+"g.js");
//组件风格
var blockStyleVal=$("#blockStyle").val();
//模板配色
var templateColorVal=$("#templateColor").val();
$("#templateColorLink").attr("href","../css/"+templateColorVal+".css");
//模板Id
var templateIdVal=$("#templateId").val();
//模板布局
var templateLayoutVal=$("#templateLayout").val();

//导入编辑器--带过来的数据
//if( $.zui.store.get('modalLeadInName')!==undefined ){
//    modalLeadIn=$.zui.store.get('modalLeadInName');
    //console.log(modalLeadIn);
    //$.zui.store.pageRemove('modalLeadInName');
    //$.zui.store.remove('modalNewEditor');
    //$("#templateLeadIn").val(modalLeadIn.templateLeadIn);
//}
//var modalLeadInVal=$("#templateLeadIn").val();
//console.log(modalLeadInVal);
//console.log(modalLeadIn);