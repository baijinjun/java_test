$(document).ready(init());

// Toast 初始化
const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000
});

function init() {
    // JQuery Validation 初始化
    // $.validator.setDefaults({
    //         submitHandler: function(form) {
    //             handlePrint();
    //         }
    //     }
    // );
    $('#form-bymajor').validate({
        submitHandler:function(form){
            handleStatistic(0);
        },
        rules: {
            examRoundSelectBymajor: { required: true},
            majorSelect:{required: true }
        },
        messages: {
            examRoundSelectBymajor: "请选择考次",
            majorSelect: "请选择专业"
        },
        errorElement: 'span',
        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        }
    });

    $('#form-byschool').validate({
        submitHandler:function(form){
            handleStatistic(1);
        },
        rules: {
            examRoundSelectByschool: { required: true},
            schoolSelect:{required: true }
        },
        messages: {
            examRoundSelectByschool: "请选择考次",
            schoolSelect: "请选择学校"
        },
        errorElement: 'span',
        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        }
    });

    $('#studentForm').validate({
        submitHandler:function(form){
            handleStudentStatistic();
        },
        rules: {
            examRoundSelectBymajor: { required: true},
            majorSelect:{required: true }
        },
        messages: {
            examRoundSelectBymajor: "请选择考次",
            majorSelect: "请选择专业"
        },
        errorElement: 'span',
        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        }
    });
}

// 处理表单提交
function handleStatistic( type ) { // 0按专业，1按学校
    let examRound = type === 0 ? $("#examRoundSelectBymajor").val() : $("#examRoundSelectByschool").val();
    let major = $("#majorSelect").val();
    let school = $("#schoolSelect").val();

    let url = "/transfer-report/get-turn-result";
    let dataobj = {
        examRound :examRound,
        order: type,
        major: major,
        school: school
    };
    $.post(url, dataobj, function (jsonObject) {
        if (jsonObject.hasOwnProperty('code')) {
            if (jsonObject.code === 0) {
                Toast.fire({
                    type: 'success',
                    title: '打印成功！'
                });
                changeDisplay();

                record = jsonObject.data;

                let certificateContext = $("#certificationText");
                $("#certificationText h1").text("考籍转入统计结果");
                certificateContext.html($("#certificationText h1"));
                let $p = $("<p style='text-align: center'>"+ "考次：" + examRound +"&emsp;"+
                    (type === 0 ? ("原考籍地址："+major) : ("目的地："+school)) +"</p>");

                certificateContext.append($p);

                let tb = $('<table id="theTable" class="table table-bordered table-hover table-sm dataTable dtr-inline"></table>');
                certificateContext.append(tb);

                initDataTable();

                let dataTable = $('#theTable').DataTable();
                dataTable.clear().draw(); //清除表格数据

                for (let i = 0; i < record.length; i++) {
                    // TODO 需要将键名相对应
                    let data1 = record[i]["id"];
                    let data2 = record[i]["examRound"];
                    let data3 = record[i]["major"];
                    let data4 = record[i]["school"];
                    let data5 = record[i]["admissionNumber"];
                    let data6 = record[i]["name"];
                    dataTable.row.add([data1, data2, data3, data4, data5, data6, ]).draw().node();
                }

                $p = $("<p style='text-align: right'></p>");

                $p.text("查询时间："+moment().format("YYYY年MM月DD日 HH:mm:ss")+"");
                certificateContext.append($p);
            } else {
                Toast.fire({
                    type: 'info',
                    title: '未能查询到考籍转入信息，请核对表单信息'
                })
            }
        } else {
            Toast.fire({
                type: 'error',
                title: '抱歉，发生错误，请重试'
            });
        }
    });
}
function handleStudentStatistic(  ) {

    let url = "/transfer-report/get-turn-result";
    let dataobj = {
        examRound :examRound,
        order: type,
        major: major,
        school: school
    };
    $.post(url, dataobj, function (jsonObject) {
        if (jsonObject.hasOwnProperty('code')) {
            if (jsonObject.code === 0) {
                Toast.fire({
                    type: 'success',
                    title: '打印成功！'
                });
                changeDisplay();

                record = jsonObject.data;

                let certificateContext = $("#certificationText");
                $("#certificationText h1").text("考籍转出统计结果");
                certificateContext.html($("#certificationText h1"));
                let $p = $("<p style='text-align: center'>"+ "考次：" + examRound +"&emsp;"+
                    (type === 0 ? ("原考籍地址："+major) : ("目的地："+school)) +"</p>");

                certificateContext.append($p);

                let tb = $('<table id="theTable" class="table table-bordered table-hover table-sm dataTable dtr-inline"></table>');
                certificateContext.append(tb);

                initDataTable();

                let dataTable = $('#theTable').DataTable();
                dataTable.clear().draw(); //清除表格数据

                for (let i = 0; i < record.length; i++) {
                    // TODO 需要将键名相对应
                    let data1 = record[i]["id"];
                    let data2 = record[i]["examRound"];
                    let data3 = record[i]["major"];
                    let data4 = record[i]["school"];
                    let data5 = record[i]["admissionNumber"];
                    let data6 = record[i]["name"];

                    dataTable.row.add([data1, data2, data3, data4, data5, data6,]).draw().node();
                }

                $p = $("<p style='text-align: right'></p>");

                $p.text("查询时间："+moment().format("YYYY年MM月DD日 HH:mm:ss")+"");
                certificateContext.append($p);
            } else {
                Toast.fire({
                    type: 'info',
                    title: '未能查询到考籍转出信息，请核对表单信息'
                })
            }
        } else {
            Toast.fire({
                type: 'error',
                title: '抱歉，发生错误，请重试'
            });
        }
    });
}

function changeDisplay() {
    $("#form-card").toggle();
    $("#print-card").toggle();
}

function printPage() {
//获取当前页的html代码
    let bodyhtml = window.document.body.innerHTML;
    //设置打印开始区域、结束区域
    let startFlag = "<!-- ###print start### -->";
    let endFlag = "<!-- ###print end### -->";
    // 要打印的部分
    let printhtml = bodyhtml.substring(bodyhtml.indexOf(startFlag),
        bodyhtml.indexOf(endFlag));
    // 生成并打印ifrme
    let f = document.getElementById('printf');
    f.contentDocument.write(printhtml);
    f.contentDocument.close();
    f.contentWindow.print();
}

function initDataTable(){
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
            "sZeroRecords": "查询结果为空",
            "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
            "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
            "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
            "sInfoPostFix": "",
            "sSearch": "搜索:",
            "sUrl": "",
            "sEmptyTable": "无查询结果",
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
        "columnDefs" : [
            {   // 定义id列
                "targets": 0,
                "searchable": false,
                "visible": true,
                "title": "ID"},
            {"targets": 1, "title": "考次"},
            {"targets": 2, "title": "原考籍地址"},
            {"targets": 3, "title": "目的地"},
            {"targets": 4, "title": "准考证号"},
            {"targets": 5, "title": "姓名"}
        ]
    });
}