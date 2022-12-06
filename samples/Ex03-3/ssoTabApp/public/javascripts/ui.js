var $id = (id) => { return document.getElementById(id) };
var display = null,
    tabContent = null;

window.addEventListener('DOMContentLoaded', () => {
    display = $id('display'),
        tabContent = $id('mailItems');

    $id('logOnButton').addEventListener('click', () => {
        logon();
    });
});

//情報表示用のエレメントを追加
function showItem(text) {
    let elm = document.createElement('div');
    elm.innerText = text;
    display.appendChild(elm);
}


//オブジェクトのプロパティ名を値を列挙して表 (table エレメントとして返す)
function renderGrid(obj) {
    const table = document.createElement('table'),
        headerTr = document.createElement('tr'),
        nameTh = document.createElement('th'),
        valueTh = document.createElement('th');
    nameTh.innerText = 'プロパティ名';
    valueTh.innerText = '値';
    headerTr.appendChild(nameTh);
    headerTr.appendChild(valueTh);
    table.appendChild(headerTr);

    for (let propName in obj) {
        const tr = document.createElement('tr'),
            nameTd = document.createElement('td'),
            valueTd = document.createElement('td');
        nameTd.innerText = propName;

        if (obj[propName] instanceof Object) {
            valueTd.appendChild(renderGrid(obj[propName]));
        } else {
            valueTd.innerText = obj[propName];
        }
        tr.appendChild(nameTd);
        tr.appendChild(valueTd);
        table.appendChild(tr);
    }
    return table;
}