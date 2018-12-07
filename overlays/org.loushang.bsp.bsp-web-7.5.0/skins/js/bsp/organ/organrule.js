// 定义表格对象
var mapGrid;
// 表格数据
var gridData = [];
var struType = "";
var newstruType = ""; //获取按钮菜单要跳转的struType
var buttonName = ""; //获取按钮菜单要跳转的struTypeName
var buttonName1 = ""; //获取按钮菜单要跳转的struTypeName
var firstName; //默认首页struTypeName
var result; //接受ajax的返回值
var srcName = ""; //获取查询框中输入的srcName
var target = 0; //数据重复后点击菜单不跳转
var target2 = 0; //数据重复后点击菜单弹出是否保存提示框
var index;
var countToSave = 0; // 待保存的操作数
// 弹窗函数
function UIAlert(msg) {
    $.dialog({
        type: "alert",
        content: msg,
        autofocus: true
    });
}

// 弹窗样式
function sticky(msg, style, position) {
    var type = style ? style: 'success';
    var place = position ? position: 'top';
    $.sticky(msg, {
        autoclose: 1000,
        position: place,
        style: type
    });
}

$(document).ready(function() {
    // 初始化表格
    initTable();
    // 初始化菜单类别选择按钮
    initMenuTypeSelector();

    // 查询
    $("#queryMap").click(function() {
        var srcName = $("#fromModelName").val();

        queryMap(srcName);
    });

    // 查询事件回车键绑定
    $("#fromModelName").keydown(function(event) {
        if (event.keyCode == 13) {
            var srcName = $("#fromModelName").val();
            queryMap(srcName);
        }
    });

    // 增加一行
    $("#addRow").click(function() {
        addRow();
    });

    // 保存数据
    $("#saveChangedData").click(function() {
        saveChangedData();
    });

    // 批量删除
    $("#batchDel").click(function() {
        batchDel();
    });

});

// 初始化菜单类别选择按钮
function initMenuTypeSelector() {

    $.ajax({
        url: context + "/service/bsp/organtyperule/getAllStruTypes",
        dataType: "json",
        async: false,
        success: function(data) {
            var msg1 = L.getLocaleMessage("bsp.organ.064","组织视角");
            var msg2 = L.getLocaleMessage("bsp.organ.065","管理组织视角");
            firstName = data;
            var $selectorContainer = $('<div class="menu-container"></div>');
            for (var i = 0; i < data.length; i++) {
                var $divEle = $("<div></div>");
                $divEle.data("type", data[i]["struType"]);
                $divEle.attr("class", "menu-type");
                $divEle.attr("title", data[i]["struTypeName"]);
                $divEle.text(data[i]["struTypeName"]);
                $selectorContainer.append($divEle);
            }
            // 获取下拉菜单Name
            buttonName = firstName[0]["struTypeName"];
            $("#hrperspective").html(buttonName + '<i class="fa fa-angle-down"></i>');
            // 设置下拉菜单
            $("#hrperspective").popover({
                title: msg1+"<div class='pull-right manager-type-link'><a href='"+context+"/service/bsp/organ'>"+msg2+"</a></div>",
                html: true,
                content: $selectorContainer,
                placement: "bottom",
                trigger: "click",
                delay: {
                    show: 100, 
                    hide: 0
                }
            });

        },
        error: function(e) {
            alert("请求出错");
        }
    });

    // 使用兼容ie的jQuery on事件
    $(document).on("click", "#hrperspective", function(){
        $(document).on("click", ".menu-type", function(e) {
            newstruType = $(this).data("type");
            buttonName1 = $(this).text();
            for (var i = 0; i < gridData.length; i++) {
                var rowNum = i + 1;
                if (!gridData[i].srcName) {
                    UIAlert(L.getLocaleMessage("bsp.organ.084","第{0}行组织类型不能为空！", rowNum));
                    // 滚动到当前行
                    mapGrid.scrollRowIntoView(i);
                    // 将当前单元格选中
                    mapGrid.setActiveCell(i, mapGrid.getColumnIndex("srcName"));
                    // 让指定单元格闪烁
                    mapGrid.flashCell(i, mapGrid.getColumnIndex("srcName"), 100);
                    var activeCell = mapGrid.getActiveCell();
                    $("#hrperspective").popover('hide');
                    return;
                }
                if (!gridData[i].targetName) {
                    UIAlert(L.getLocaleMessage("bsp.organ.085","第{0}行下级允许的组织类型不能为空！", rowNum));
                    mapGrid.scrollRowIntoView(i);
                    mapGrid.setActiveCell(i, mapGrid.getColumnIndex("targetName"));
                    mapGrid.flashCell(i, mapGrid.getColumnIndex("targetName"), 100);
                    $("#hrperspective").popover('hide');
                    return;
                }
            }

            if (struType == "") {
                struType = "00";
            }
            var url = context + "/service/bsp/organtyperule/check/" + struType;
            $.ajax({
                url: url,
                type: "post",
                async: false,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({
                    "struRules": gridData
                }),
                success: function(data) {
                    if (data == "true") {
                        result = true;
                    } else {
                        result = false;
                    }
                },
                error: function(e) {
                    sticky("错误！", 'error', 'center');
                }

            });
            //判断组织类型是否有重复，若有重复则弹窗，弥补后台检查是否数据有改动的不足
            for (var i = 0; i < gridData.length; i++) {
                for (var j = 0; j < gridData.length; j++) {
                    if (i != j) if (gridData[i].srcName == gridData[j].srcName) target2 = 1;
                }
            }
            if (!result || target2 == 1) {
                var msg1 = L.getLocaleMessage("bsp.organ.086","提示");
                var msg2 = L.getLocaleMessage("bsp.organ.087","是否保存当前数据？");
                var msg3 = L.getLocaleMessage("bsp.organ.088","是");
                var msg4 = L.getLocaleMessage("bsp.organ.089","否");
                target2 = 0;
                $("#hrperspective").popover('hide');
                $.dialog({
                    title: msg1,
                    width: 258,
                    height: 13,
                    content: msg2,
                    okValue: msg3,
                    ok: function() {
                        saveChangedData();
                        if (target != 1) {
                            struType = newstruType;
                            buttonName = buttonName1;
                            $("#hrperspective").html(buttonName + '<i class="fa fa-angle-down"></i>');
                            initTable();
                        }
                        target = 0;
                    },
                    cancelValue: msg4,
                    cancel: function() {
                        struType = newstruType;
                        buttonName = buttonName1;
                        $("#hrperspective").html(buttonName + '<i class="fa fa-angle-down"></i>');

                        initTable();
                    },
                    autofocus: false
                });
                return;
            }
            struType = $(this).data("type");
            buttonName = $(this).text();
            $("#hrperspective").html(buttonName + '<i class="fa fa-angle-down"></i>');
            $("#hrperspective").popover('hide');
            initTable();
        });

    });
}

// 初始化表格
function initTable(data) {
    var msg1 = L.getLocaleMessage("bsp.organ.016","组织类型");
    var msg2 = L.getLocaleMessage("bsp.organ.090","下级允许的组织类型");
    var msg3 = L.getLocaleMessage("bsp.organ.017","操作");
    // 获取首列：multiSelect为true时渲染成checkbox，为false则渲染成radio；可以通过width属性设置宽度，默认为35
    var checkboxSelector = new Slick.CheckboxSelectColumn({
        multiSelect: true,
        width: 35
    });
    // 定义所有列
    var columns = [checkboxSelector.getColumnDefinition(),

    {
        id: "srcName",
        name: msg1,
        field: "srcName"

    },
    {
        id: "targetName",
        name: msg2,
        field: "targetName"

    },
    {
        id: "operation",
        name: msg3,
        field: "id",
        formatter: operationBtn,
        width: 100
    }];
    // 获取表体数据
    if (!data) {
        data = queryData();
        gridData = data;

    }

    // 表格配置项
    var options = {
        selectActiveRow: true,
        // 点击行时将其选中，并将其余行取消选中
        multiSelect: true,
        // true：多选(Ctrl+左键单击行)；false：单选；默认：true。
        defaultColumnWidth: 200,
        // 默认列宽
        enableTextSelectionOnCells: true,
        forceFitColumns: true
    };

    // 生成表格
    mapGrid = $("#mapGrid").editgrid(data, columns, options);
    mapGrid.registerPlugin(checkboxSelector);
    mapGrid.autosizeColumns(); // 自动调整列宽
    // 绑定单击事件
    mapGrid.onClick.subscribe(function(e, args) {
        mapGrid.setActiveCell(args.row, args.cell);
        // 当前单元格的id
        var curCellId = mapGrid.getColumns()[args.cell].id;
        // 取当前行的状态
        if (curCellId == "srcName") {
            var state = mapGrid.getDataItem(args.row).state;
            selecttypeName();
        }
        if (curCellId == "targetName") {
            var state = mapGrid.getDataItem(args.row).state;
            selectlowertypeName();
        }
    });
}

function queryData() {

    if (struType == "") {
        struType = "00";
    }
    var list;
    var url = context + "/service/bsp/organtyperule/maintableData";
    var state = 1;
    $.ajax({
        url: url,
        type: "post",
        async: false,
        data: {
            'struType': struType
        },
        success: function(data) {
            list = data;
        },
        error: function(e) {
            alert("请求出错");
        }
    });
    return list;
}

// 查询
function queryMap(srcName) {
    var msg1 = L.getLocaleMessage("bsp.organ.016","组织类型");
    var msg2 = L.getLocaleMessage("bsp.organ.091","不存在！");
    var msg3 = L.getLocaleMessage("bsp.organ.092","查询内容为空！");
    srcName = $.trim(srcName);
    var queryresult = "false";
    for (var i = 0; i < gridData.length; i++) {
        if (gridData[i].srcName == srcName) {
            mapGrid.scrollRowIntoView(i);
            // 将当前单元格选中
            mapGrid.setActiveCell(i, mapGrid.getColumnIndex("srcName"));
            // 让指定单元格闪烁
            mapGrid.flashCell(i, mapGrid.getColumnIndex("srcName"), 100);
            queryresult = "true";
        }
    }
    if (queryresult == "false") {
        if (srcName != "") {
            sticky(msg1+'"' + srcName + '"'+msg2, 'warning');
        }
        else {
            sticky(msg3, 'warning');
        }
    }
}

// 操作按钮
function operationBtn(row, cell, value, columnDef, dataContext) {
    var msg = L.getLocaleMessage("bsp.organ.008","删除");
    var delBtn = "<a href=\"javascript:delMap('" + row + "')\">"+msg+"</a>";
    return delBtn;
}

// 增加一行
function addRow() {
    var data = {
        state: 1,
        srcRef: 0,
        targetRef: ""
    }
    mapGrid.addRow(data);

    addSaveBtnBadge();
}

// 表格的点击事件
function selecttypeName() {
    var msg = L.getLocaleMessage("bsp.organ.093","选择组织类型");
    // 选择表单
    var state = 1;
    var activeCell = mapGrid.getActiveCell();
    var curRowDate = mapGrid.getDataItem(activeCell.row);
    var curCellId = mapGrid.getColumns()[activeCell.cell]["id"];
    var selected = encodeURI(curRowDate[curCellId]); //选种单元格的值
    selected = encodeURI(selected);
    $.dialog({
        type: "iframe",
        title: msg,
        url: context + "/service/bsp/organtyperule/forCreate?state=" + state + "&selected=" + selected,
        width: 580,
        height: 430,
        onclose: function() {
            var formData = this.returnValue;
            if (formData) {
                addFormInfo(formData);
            }
        }
    });

};

function selectlowertypeName() {
    var msg = L.getLocaleMessage("bsp.organ.094","选择下级允许的组织类型");
    // 选择表单
    var state = 2;
    var activeCell = mapGrid.getActiveCell();
    var curRowDate = mapGrid.getDataItem(activeCell.row);
    var curCellId = mapGrid.getColumns()[activeCell.cell]["id"];
    var selected = encodeURI(curRowDate[curCellId]);
    selected = encodeURI(selected);
    $.dialog({
        type: "iframe",
        title: msg,
        url: context + "/service/bsp/organtyperule/forCreate?state=" + state + "&selected=" + selected,
        width: 580,
        height: 430,
        onclose: function() {
            var list = this.returnValue;
            if (list) {
                addFormInfo1(list);
            }
        }
    });

};
// 将数据添加到页面上的组织类型上
function addFormInfo(formData) {
    var activeCell = mapGrid.getActiveCell();
    // 获取当前行数据
    var curRowDate = mapGrid.getDataItem(activeCell.row);
    // 获取当前单元格的id
    var cellId = mapGrid.getColumns()[activeCell.cell]["id"];
    // 设置当前单元格及右侧单元格的值
    curRowDate[cellId] = formData["typeName"];
    // 获取organType
    curRowDate["srcRef"] = formData["organType"];
    // 刷新行
    mapGrid.updateRow(activeCell.row);

    addSaveBtnBadge();
}

// 将数据添加到页面上的允许的下级组织类型上
function addFormInfo1(list) {
    var checked = list[0];
    var unChecked = list[1];

    var activeCell = mapGrid.getActiveCell();
    // 获取当前行数据
    var curRowDate = mapGrid.getDataItem(activeCell.row);
    // 获取当前单元格及右侧单元格的id
    var cellId = mapGrid.getColumns()[activeCell.cell]["id"];

    var cellTypeName = [];
    if (curRowDate["targetName"] != undefined && curRowDate["targetName"] != "") {
        cellTypeName = curRowDate["targetName"].split(",");
    }
    var cellTargetRef = [];
    if (curRowDate["targetRef"] != undefined && curRowDate["targetRef"] != "") {
        cellTargetRef = curRowDate["targetRef"].split(",");
    }

    for (var i = 0; i < checked.length; i++) {
        var value = checked[i];
        if (cellTypeName.indexOf(value["typeName"]) == -1) {
            cellTypeName.push(value["typeName"]);
            cellTargetRef.push(value["organType"]);
        }
    }

    for (var i = 0; i < unChecked.length; i++) {
        var value = unChecked[i];
        var nameInd = cellTypeName.indexOf(value["typeName"]);
        var refInd = cellTargetRef.indexOf(value["organType"]);
        if (cellTypeName.indexOf(value["typeName"]) > -1) {
            cellTypeName.splice(nameInd, 1);
            cellTargetRef.splice(refInd, 1);
        }
    }

    var cellValue = cellTypeName.join(",");
    curRowDate["targetRef"] = cellTargetRef.join(",");

    // 设置当前单元格及右侧单元格的值
    curRowDate[cellId] = cellValue;
    // 刷新行
    mapGrid.updateRow(activeCell.row);

    addSaveBtnBadge();
}

// 保存数据
function saveChangedData() {
    var msg4 = L.getLocaleMessage("bsp.organ.095","组织类型数据重复");
    var addData = [];
    for (var i = 0; i < gridData.length; i++) {
        var rowNum = i + 1;
        if (!gridData[i].srcName) {
        	UIAlert(L.getLocaleMessage("bsp.organ.084","第{0}行组织类型不能为空！", rowNum));
            // 滚动到当前行
            mapGrid.scrollRowIntoView(i);
            // 将当前单元格选中
            mapGrid.setActiveCell(i, mapGrid.getColumnIndex("srcName"));
            // 让指定单元格闪烁
            mapGrid.flashCell(i, mapGrid.getColumnIndex("srcName"), 100);
            var activeCell = mapGrid.getActiveCell();
            return;
        }
        if (!gridData[i].targetName) {
        	UIAlert(L.getLocaleMessage("bsp.organ.085","第{0}行下级允许的组织类型不能为空！", rowNum));
            
            mapGrid.scrollRowIntoView(i);
            mapGrid.setActiveCell(i, mapGrid.getColumnIndex("targetName"));
            mapGrid.flashCell(i, mapGrid.getColumnIndex("targetName"), 100);
            return;
        }
        addData.push(gridData[i]);
    }

    //遍历查询组织类型的重复数据
    for (var i = 0; i < gridData.length; i++) {
        for (var j = 0; j < gridData.length; j++) {
            if (i != j) {
                if (gridData[i].srcName == gridData[j].srcName) {
                    UIAlert(msg4);
                    target = 1;
                    return;
                }
            }
        }
    }
    if (struType == "") {
        struType = "00";
    }
    var url = context + "/service/bsp/organtyperule/save/" + struType;
    $.ajax({
        url: url,
        type: "post",
        async: false,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            "struRules": addData
        }),
        success: function(data) {
            var msg5 = L.getLocaleMessage("bsp.organ.075","保存成功！");
            var msg6 = L.getLocaleMessage("bsp.organ.096","保存失败！");
            if (data == "success") {
                sticky(msg5);

                zeroSetSaveBtnBadge(struType);
            }
            else {
                sticky(msg6, 'error', 'center');
            }
        },
        error: function(e) {
            sticky("请求出错！", 'error', 'center');
        }
    });

}

// 删除一行
function delMap(row) {

    mapGrid.deleteRow(row);

    $(":checkbox").prop("checked", false);

    addSaveBtnBadge();
}

// 批量删除
function batchDel() {
    var msg = L.getLocaleMessage("bsp.organ.097","请选择要删除的记录！");
    var selected_rows = mapGrid.getSelectedRows();
    var selecteds = mapGrid.getSelectedDataItems();
    if (selecteds.length < 1) {
        UIAlert(msg);
        return false;
    }
    var pks = [];
    for (i in selecteds) {
        if (selecteds[i].id) pks.push(selecteds[i].id);

        addSaveBtnBadge();
    }

    mapGrid.deleteRow(selected_rows);
    $(":checkbox").prop("checked", false);

}

// 保存按钮徽章 增加操作数
function addSaveBtnBadge() {

    countToSave ++;

    $("#saveBadge").text(countToSave);

    if(countToSave > 0) {
        $("#saveBadge").show();
    }
}

// 保存按钮徽章 减去操作数
function minusSaveBtnBadge() {
    countToSave --;

    $("#saveBadge").text(countToSave);
    
    if(countToSave < 1) {
        $("#saveBadge").hide();
    }
    
}

// 保存按钮徽章 置零
function zeroSetSaveBtnBadge() {
    countToSave = 0;

    $("#saveBadge").text("");
    
    $("#saveBadge").hide();
}