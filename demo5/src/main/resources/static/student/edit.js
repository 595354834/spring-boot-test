$(() => {
    if (error) {//如果有错误信息，则提示
        layui.use(() => {
            let layer = layui.layer;
            layer.alert(error);
        });
    }

    //对性别进行数据回显
    if (stu) {
        $(":input[name=sex][value=" + stu.sex + "]").prop("checked", true);
    }

    //出生日期使用下拉选择组件
    layui.use(() => {
        let laydate = layui.laydate;
        laydate.render({
            elem: "#birthday"
        });
    });
});

//修改学生，cb回调函数
function edit(cb) {
    let id = stu.id;//主键
    let stuId = $("#stuId").val();
    let name = $("#name").val();
    let sex = $(":input[name=sex]:checked").val();
    let pinyin = $("#pinyin").val();
    let birthday = $("#birthday").val();
    let phone = $("#phone").val();
    let email = $("#email").val();
    let wechat = $("#wechat").val();

    let url = "/api/v1/students"
    $.ajax({
        url,
        method: "patch",//部分修改
        dataType: "json",
        data: {
            id, stuId,
            name, sex, pinyin, birthday, phone, email, wechat
        },
        success(resp) {
            if (typeof cb === "function") {
                cb(resp.success);//回调
            }
        }
    });
}