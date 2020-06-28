$(document).ready(init());
let g_curTableData;
let foreignData;

// Toast 初始化
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});

function init(){
    initDataTables();
}

function initDataTables() {
    $('#theTable').DataTable({  //初始化表格
        "paging": true,
        "lengthChange": false,
        "autoWidth": true,
        "info": true,
        "searching": false,
        "ordering": true,
        "order": [],
        destroy: true,
        pageLength: 10,
        language: {  //本地化
            "sProcessing": "处理中...",
            "sLengthMenu": "显示 _MENU_ 项结果",
            "sZeroRecords": "没有匹配结果",
            "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
            "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
            "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
            "sInfoPostFix": "",
            "sSearch": "搜索:",
            "sUrl": "",
            "sEmptyTable": "表中数据为空",
            "sLoadingRecords": "载入中...",
            "sInfoThousands": ",",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上页",
                "sNext": "下页",
                "sLast": "末页"
            },
            "oAria": {
                "sSortAscending": ": 以升序排列此列",
                "sSortDescending": ": 以降序排列此列"
            }
        },
        "columnDefs" : [{
            // 定义id列 TODO 需要让数目对应上
            "targets": 0,
            "searchable": false,
            "visible": true,
            "title": "顾客编号",
        },
            {"targets": 1, "title": "顾客名称"},
            {"targets": 2, "title": "顾客地址"},
            {"targets": 3, "title": "所属国家"},
            {"targets": 4, "title": "联系电话"},
            {"targets": 5, "title": "可用余额"},
            {"targets": 6, "title": "市场"},
            {"targets": 7, "title": "备注"},
            {
                // 定义操作列 TODO 修改绑定事件的主键参数
                "targets": 8,//操作按钮目标列
                "searchable": false,
                "orderable": false,
                "title": "操作",
                "width": "8rem",
                "render": function (data, type, row, meta) {
                    var primaryKey0 ='"'+ row[0]+'"' ;
                    var html = "<div class='row-button-div'><a href='javascript:void(0);' onclick='editThisRow("+primaryKey0+")'  class=''><i class='fa fa-pen-square'></i> 编辑</a></div>";
                    html += "<div class='row-button-div'><a href='javascript:void(0);' onclick='deleteThisRow(" + primaryKey0 + ")'  class='text-danger'><i class='fa fa-minus-square'></i> 删除</a></div>";
                    return html;
                }
            }]
    });

    getForeignKey();
    showData();
}

function getForeignKey(){
    let url = "/nation/show";
    $.post(url, function (jsonObject) {
        foreignData = jsonObject.data;
    });
}


// 获取并渲染数据
function showData(){
    let url = "/customer/show";
    var recordList = undefined;

    var dataTable = $('#theTable').DataTable();
    dataTable.clear().draw(); //清除表格数据

    $.post(url, function (jsonObject) {
        recordList = jsonObject.data;
        g_curTableData = recordList;
        for (let i = 0; i < recordList.length; i++) {
            // TODO 需要将键名相对应
            let data1 = recordList[i]["C_CUSTKEY"];
            let data2 = recordList[i]["C_NAME"];
            let data3 = recordList[i]["C_ADDRESS"];
            let data4 = recordList[i]["C_NATIONKEY"];
            let data5 = recordList[i]["C_PHONE"];
            let data6 = recordList[i]["C_ACCTBAL"];
            let data7 = recordList[i]["C_MKTSEGMENT"];
            let data8 = recordList[i]["C_COMMENT"];
            dataTable.row.add([data1, data2, data3, getForeignKeyValueByKey(foreignData, 'N_NATIONKEY', data4, 'N_NAME'), data5, data6, data7, data8]).draw().node();
        }
    });
}

function showAddMenu(){
    $('#modal-add #addForm').html(
        // TODO 外键select option
        "<label>顾客编号 <input name='data0' class='form-control' style='width: 20rem; display: inline-block;' onkeyup='checkInputBoxNullInt(this)' onafterpaste='checkInputBoxNullInt(this)'/></label><br/>\n" +
        "<label>顾客名称 <input name='data1' class='form-control' style='width: 20rem; display: inline-block;' /></label><br/>\n" +
        "<label>顾客地址 <input name='data2' class='form-control' style='width: 20rem; display: inline-block;' /></label><br/>\n" +
        "<label>所属国家 <select name='data3' class='form-control' style='width: 20rem; display: inline-block;' >"+ generateForeignOptions(foreignData, "N_NATIONKEY", "N_NAME") +"</select></label><br/>\n" +
        "<label>联系电话 <input name='data4' class='form-control' style='width: 20rem; display: inline-block;' data-inputmask=\"'mask': ['999 9999 9999']\" data-mask/></label><br/>\n" +
        "<label>可用余额 <input name='data5' class='form-control' style='width: 20rem; display: inline-block;' data-inputmask=\"'alias': 'numeric'\" data-mask/></label><br/>\n" +
        "<label>市场 <input name='data6' class='form-control' style='width: 20rem; display: inline-block;' /></label><br/>\n" +
        "<label>备注 <input name='data7' class='form-control' style='width: 20rem; display: inline-block;' /></label><br/>\n"
    );

    $('#modal-add .modal-footer .btn-primary').attr("onclick", "handleAdd()"); // 绑定提交按钮 TODO 多主键需要修改参数
    $('[data-mask]').inputmask();
    $('#modal-add').modal('show');
}

function editThisRow(key0){
    let data0, data1, data2, data3, data4, data5, data6, data7, data8, data9;
    for (var i = 0; i < g_curTableData.length; i++) {
        // TODO 需要匹配所有主键
        data0 = g_curTableData[i]["C_CUSTKEY"];
        if( data0 != key0 ) continue;

        data1 = g_curTableData[i]["C_NAME"];
        data2 = g_curTableData[i]["C_ADDRESS"];
        data3 = g_curTableData[i]["C_NATIONKEY"];
        data4 = g_curTableData[i]["C_PHONE"];
        data5 = g_curTableData[i]["C_ACCTBAL"];
        data6 = g_curTableData[i]["C_MKTSEGMENT"];
        data7 = g_curTableData[i]["C_COMMENT"];
        break;
    }


    $('#modal-edit #editForm').html(
        "<label>顾客编号 <input name='data0' class='form-control' style='width: 20rem; display: inline-block;' value='"+ data0 +"' disabled/></label><br/>\n" +
        "<label>顾客名称 <input name='data1' class='form-control' style='width: 20rem; display: inline-block;' value='"+ data1 +"' /></label><br/>\n" +
        "<label>顾客地址 <input name='data2' class='form-control' style='width: 20rem; display: inline-block;' value='"+ data2 +"' /></label><br/>\n" +
        "<label>所属国家 <select name='data3' class='form-control' style='width: 20rem; display: inline-block;' >"+ generateForeignOptions(foreignData, "N_NATIONKEY", "N_NAME", data3) +"</select></label><br/>\n" +
        "<label>联系电话 <input name='data4' class='form-control' style='width: 20rem; display: inline-block;' value='"+ data4 +"' data-inputmask=\"'mask': ['999 9999 9999']\" data-mask/></label><br/>\n" +
        "<label>可用余额 <input name='data5' class='form-control' style='width: 20rem; display: inline-block;' value='"+ data5 +"' data-inputmask=\"'alias': 'numeric'\" data-mask/></label><br/>\n" +
        "<label>市场 <input name='data6' class='form-control' style='width: 20rem; display: inline-block;' value='"+ data6 +"'/></label><br/>\n" +
        "<label>备注 <input name='data7' class='form-control' style='width: 20rem; display: inline-block;' value='"+ data7 +"' /></label><br/>\n"
    );

    $('#modal-edit .modal-footer .btn-primary').attr("onclick", "handleEdit("+ key0 +")"); // 绑定提交按钮 TODO 多主键需要修改参数
    $('[data-mask]').inputmask();
    $('#modal-edit').modal('show');
}

// 处理表格的按钮点击，生成模态框 TODO 多主键需要重新处理输入
function deleteThisRow(key0){
    $('#modal-danger button:first-child').attr("onclick", "handleDelete("+ key0 +")"); // 绑定确认按钮
    $('#modal-danger .modal-title').text('警告'); // 修改模态框标题
    $('#modal-danger .modal-body p:first-of-type').text('真的要删除该条数据？这将无法恢复！'); // 修改模态框内容
    $('#modal-danger').modal('show');
}

// 提交删除事件
function handleDelete( key0 ){
    // TODO 修改 url 和 dataobj，多主键要修改参数列表
    $('#modal-danger').modal('hide');
    let url = "/customer/delete";
    let dataobj = {
        C_CUSTKEY: key0
    };
    $.post(url, dataobj, function (jsonObject) {
        if( jsonObject.hasOwnProperty('code') ) {
            if (jsonObject.code === 0) {
                Toast.fire({
                    type: 'info',
                    title: '成功删除 1 条数据'
                });
                showData();
            } else {
                Toast.fire({
                    type: 'error',
                    title: '发生错误！错误码：' + jsonObject.code
                });
            }
        }
        else{
            Toast.fire({
                type: 'error',
                title: '发生错误！'
            });
        }
    });
}

// 提交修改事件
function handleEdit( key0 ) {
    if( checkDouble($("#editForm [name='data5']").val()) ) {
        // TODO 修改 url 和 dataobj，多主键要修改参数列表
        $('#modal-edit').modal('hide');
        let url = "/customer/update";
        let dataobj = {
            C_CUSTKEY    :key0,
            C_NAME       :$("#editForm [name='data1']").val(),
            C_ADDRESS    :$("#editForm [name='data2']").val(),
            C_NATIONKEY  :$("#editForm [name='data3']").val(),
            C_PHONE      :$("#editForm [name='data4']").val(),
            C_ACCTBAL    :$("#editForm [name='data5']").val(),
            C_MKTSEGMENT :$("#editForm [name='data6']").val(),
            C_COMMENT    :$("#editForm [name='data7']").val(),
        };
        $.post(url, dataobj, function (jsonObject) {
            if (jsonObject.hasOwnProperty('code')) {
                if (jsonObject.code === 0) {
                    Toast.fire({
                        type: 'success',
                        title: '成功修改 1 条数据'
                    });
                    showData();
                } else {
                    Toast.fire({
                        type: 'error',
                        title: '发生错误！错误码：' + jsonObject.code + '\n错误信息：' + jsonObject.message
                    });
                }
            } else {
                Toast.fire({
                    type: 'error',
                    title: '发生错误！'
                });
            }
        });
    }
}

// 提交添加事件
function handleAdd() {
    if( $("#modal-add #addForm [name='data0']").val() !== "" && checkDouble($("#modal-add #addForm [name='data5']").val())  ) {
        // TODO 修改 url 和 dataobj，多主键要修改参数列表
        $('#modal-add').modal('hide');
        let url = "/customer/add";
        let dataobj = {
            C_CUSTKEY    :$("#addForm [name='data0']").val(),
            C_NAME       :$("#addForm [name='data1']").val(),
            C_ADDRESS    :$("#addForm [name='data2']").val(),
            C_NATIONKEY  :$("#addForm [name='data3']").val(),
            C_PHONE      :$("#addForm [name='data4']").val(),
            C_ACCTBAL    :$("#addForm [name='data5']").val(),
            C_MKTSEGMENT :$("#addForm [name='data6']").val(),
            C_COMMENT    :$("#addForm [name='data7']").val(),
        };
        $.post(url, dataobj, function (jsonObject) {
            if (jsonObject.hasOwnProperty('code')) {
                if (jsonObject.code === 0) {
                    Toast.fire({
                        type: 'success',
                        title: '成功添加 1 条数据'
                    });
                    showData();
                } else {
                    Toast.fire({
                        type: 'error',
                        title: '发生错误！错误码：' + jsonObject.code + '\n错误信息：' + jsonObject.message
                    });
                }
            } else {
                Toast.fire({
                    type: 'error',
                    title: '发生错误！'
                });
            }
        });
    }
    else{
        if($("#modal-add #addForm [name='data0']").val() === ""){
            $("#modal-add #addForm [name='data0']").addClass("is-invalid");
            $("#modal-add #addForm [name='data0']").attr("placeholder", "整数，不能为空！");
        }

        if(!checkDouble($("#modal-add #addForm [name='data5']").val())){
            $("#modal-add #addForm [name='data5']").addClass("is-invalid");
        }
    }
}

function checkInputBoxDouble( it ){
    if( !checkDouble(it.value) ){
        $(it).addClass("is-invalid");
        return false;
    }
    else{
        $(it).removeClass("is-invalid");
        return true;
    }
}

function checkInputBoxNullInt( it ){
    it.value=it.value.replace(/\D/g,'');
    if( it.value === "" ){
        $(it).addClass("is-invalid");
        $(it).attr("placeholder", "整数，不能为空！");
        return false;
    }
    else{
        $(it).removeClass("is-invalid");
        return true;
    }
}

function checkInputBoxInt( it ){
    it.value = it.value.replace(/\D/g, '');
}

function checkDouble(str){
    if( str === '' )return true;
    return str.match("^(-?\\d+)(\\.\\d+)?$") != null;
}


function getForeignKeyValueByKey(data, keyName, key, valueName){
    return data.find(function(a){
        return a[keyName] == key;
    })[valueName];
}

function generateForeignOptions(foreignData, key, value, selected){
    let resultString = "";
    for (let i = 0; i < foreignData.length; i++) {
        if( selected !== undefined ){
            if( selected == foreignData[i][key] ){
                resultString += "<option value='"+foreignData[i][key]+"' selected>"+foreignData[i][value]+"</option>\n";
            }
            else{
                resultString += "<option value='"+foreignData[i][key]+"'>"+foreignData[i][value]+"</option>\n";
            }
        }
        else resultString += "<option value='"+foreignData[i][key]+"'>"+foreignData[i][value]+"</option>\n";
    }
    return resultString;
}