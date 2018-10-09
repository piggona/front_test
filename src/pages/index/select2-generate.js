//设置select2的选项设置（与后端交互）
$(document).ready(function(){

    var data = [{id: 0, text: 'IPC专利号'}, {id: 1, text: '专利所有人'}, {id: 2, text: '专利所在公司'}];//下拉列表中的数据项
    var dataPerson = [{id: 0, text: '辛泽西'}, {id: 1, text: '何旭东'}, {id: 2, text: '刘浩'}, {id: 3, text: '陆洲'}];



    $("#select2-choose").select2({
        data: data
    });//启动select2

    $("#select2-item-person").select2({
        data: dataPerson
    });
});