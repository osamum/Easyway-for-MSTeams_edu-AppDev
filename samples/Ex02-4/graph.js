//ツリーをクリックする度に API をコールしないように、取得したデータを保持するストア
let dataStore = {},
    //前回アクティブだったツリーアイテムを保持 (選択インジケーターを消すのに使用)
    previouseSelectedItem = null;

//HTTP リクエストを送信
async function callGraphAPI(endpoint, token) {
    const headers = new Headers();
    //Authorization ヘッダーに Bearer + アクセス Token で API にアクセス
    const bearer = `Bearer ${token}`;
    headers.append('Authorization', bearer);
    const options = {
        method: 'GET',
        headers: headers
    };
    const res = await fetch(endpoint, options);
    return res.json();
}

//クリックされた要素にマーク
function markSelected(element) {
    if (previouseSelectedItem) {
        previouseSelectedItem.className = '';
    }
    element.className = 'selectedItem';
    previouseSelectedItem = element;
}


//アカウントに割り当てられているクラスの一覧を取得して表示
function getClassList(accessToken) {
    //クラス一覧を取得する Graph API のエンドポイント
    const ENDPOINT_CLASS_LIST = 'https://graph.microsoft.com/v1.0/education/classes';
    //アクセストークンを使用して Graph API を呼び出す
    callGraphAPI(ENDPOINT_CLASS_LIST, accessToken).then(data => {
        reqEndpoint.value = ENDPOINT_CLASS_LIST;
        responseView.value = JSON.stringify(data, null, 3);
        let ul = document.createElement('ul');
        ul.style.display = 'block';
        for (const item of data.value) {
            dataStore[item.id] = JSON.stringify(item, null, 3).replace('   ', null, '\n\t');
            let li = document.createElement('li');
            li.setAttribute('data-res-id', item.id);
            li.setAttribute('title', item.description);
            li.innerText = item.displayName;
            li.onclick = (event) => {
                const element = event.target,
                    class_ID = element.getAttribute('data-res-id');
                responseView.value = dataStore[class_ID];
                reqEndpoint.value = ENDPOINT_CLASS_LIST + '/' + class_ID;
                markSelected(element);

                if (element.children.length > 0) {
                    element.children[0].style.display = (element.children[0].style.display == 'block') ? 'none' : 'block';
                } else {
                    element.appendChild(createClassChildren(element.getAttribute('data-res-id'), accessToken));
                }

            };
            ul.appendChild(li);
        }
        treeView.appendChild(ul);
    });

}

function createClassChildren(id, accessToken) {
    const endpointSwitch = [
        { key: 'members', displayName: 'メンバー' },
        { key: 'teachers', displayName: '教師' },
        { key: 'assignments', displayName: '割り当て' }
    ];
    const ul = document.createElement('ul');
    for (let cnt = 0; cnt <= 2; cnt++) {
        const li = document.createElement('li');
        li.innerText = endpointSwitch[cnt].displayName;
        li.setAttribute('data-res-id', `${id}/${endpointSwitch[cnt].key}`);
        li.onclick = (event) => {
            const element = event.target,
                endpointId = element.getAttribute('data-res-id');
            const parentEndpoint = 'https://graph.microsoft.com/v1.0/education/classes/';
            element.style.cursor = 'wait';
            markSelected(element);
            callGraphAPI(parentEndpoint + endpointId, accessToken).then(data => {
                reqEndpoint.value = parentEndpoint + endpointId;
                responseView.value = JSON.stringify(data, null, 3).replace('   ', '\n\t');
                element.style.cursor = 'pointer';

                /* このコメントをオプション 1 の手順のコードと置き換えます */
                
            });
            event.stopPropagation();
        }
        ul.appendChild(li);
    }
    return ul;
}

