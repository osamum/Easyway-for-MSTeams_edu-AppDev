const $id = (id) => { return document.getElementById(id) };

//コントロールのインスタンスをセット
const loginedArea = $id('loginedArea'),
    beforeLogineArea = $id('beforeLogineArea'),
    treeView = $id('treeView'),
    reqEndpoint = $id('reqEndpoint'),
    responseView = $id('responseView'),
    display = $id('display');

//ログオン/ログオフボタンのイベントハンドラをセット
$id('logOnButton').addEventListener('click', logon);
$id('logOffButton').addEventListener('click', logoff);

//情報表示用のエレメントを追加
function showItem(text) {
    let elm = document.createElement('div');
    elm.innerText = text;
    display.appendChild(elm);
}

//表示、非表示が相反するコントロールの表示を切り替える
function flip_flopDisplay(ctrl1, ctrl2) {
    ctrl1.style.display = ctrl2.style.display;
    ctrl2.style.display = (ctrl2.style.display === 'none') ? 'block' : 'none';
}

//プロパティ名と値を表示
function showPropertyName_and_Value(objInfo) {
    for (var prop in objInfo) {
        showItem(`${prop} : ${objInfo[prop]}`);
    }
}

//アカウント情報のダイアログボックスを表示
function showProfileDialog() {
    display.showModal();
}
//アカウント情報のダイアログボックスを閉じる
display.addEventListener('click', (e) => {
    e.target.close();
});