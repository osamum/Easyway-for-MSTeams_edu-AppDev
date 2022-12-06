const graphConfig = {
    graphEducationClassesEndPoint : 'https://graph.microsoft.com/v1.0/education/classes'
};

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