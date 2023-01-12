# Microsoft Teams Education 開発者向け簡易チュートリアル
## 概要
このチュートリアルは、これから Microsoft Teams Education 向けのアプリケーションの開発を行う初学者のための簡易的なものであり、実際の開発に取り掛かるまでの学習期間の短縮を目的としています。

ここで紹介するのは以下の内容です。
* 開発で使用する Microsoft Teams Education とスタンダードな Microsoft Teams の違いについて 
* Microsoft Teams Education 固有のオブジェクトの操作方法
* Teams タブ アプリとしての統合方法

チュートリアルとして開発方法を説明するものは以下のチュートリアルに含まれない Teams Education 固有のオブジェクトの操作方法についてです。

* [**Microsoft Teams 開発者向け簡易チュートリアル**](https://github.com/osamum/Easyway-for-MSTeamsAppDev)
* [**Microsoft Graph API を使用するための簡易チュートリアル**](https://github.com/osamum/Firstway_to_MSTeamsGraphAPI)

上記のチュートリアルをあらかじめ履修しておくと演習をスムーズに進めることができますが、本チュートリアルを学習したあとで得た知識をより掘り下げるために後から実施していただいてもかまいません。

## 要件
このチュートリアルを実施するには以下の環境が必要です。

* **Microsoft Office 365 Educationの[ライセンス](https://www.microsoft.com/ja-jp/education/products/office)**

     認定教育機関に所属する学生と教育者の方は、Word、Excel、PowerPoint、OneNote、Microsoft Teams、その他教室ツールを含め、Office 365 for Educationに無償でサインアップできます。

    詳しくは以下のドキュメントをご参照ください。

    * [Microsoft 365 Educationサブスクリプションの学術資格を確認する](https://docs.microsoft.com/ja-jp/microsoft-365/commerce/subscriptions/verify-academic-eligibility?view=o365-worldwide)


* **Microsoft Teams 管理センターでサイドローディングの許可**

    Microsoft Teams 管理センターにて、開発したアプリケーションがサイドローディングできるように許可を行ってください。
    
    具体的には [Microsoft Teams 管理センター (英:Microsoft Teams admin center)](https://admin.teams.microsoft.com/)のメニュー\[**Teams のアプリ**(英:Teams apps)\] - \[**アプリの管理**(英:Manage Apps)\] の画面内にある \[**組織全体のアプリ設定**(英:Org-wide app settings)\] ボタンをクリックし、表示されたブレード内の 「**カスタム アプリ**(英:Custom apps)」をオンにします。

    <img src="images/22Sep_allowCustomApp.png" width="300">

    画面下部にある \[**保存**(英:Save)\] ボタンをクリックして設定を保存してください。

* **SDS (School Data Sync : 学校データ同期) 画面の表示**

    現在、新規で作成した Office 365 A1 アカウントにて Graph API を呼び出すと HTTP 400 エラーが返り使用できないという問題が発生しています。これを回避するために以下の手順を実施します。

    1. Web ブラウザーで [Microsoft 365 管理センター](https://admin.microsoft.com/)にアクセスと、画面左のメニューブレードより \[[**すべての管理センター**](https://admin.microsoft.com/Adminportal/Home#/alladmincenters)\] メニューをクリックします

    2. 画面右に、管理センターのメニュー一覧が表示されるので、\[**学校データ同期**\] をクリックします

        <img src="images/22Jan_enableSDS.png" width="1000px">

    以上の手順で回避作は完了です。\[学校データ同期(クラシック)\]　の画面が表示されますが、そのまま閉じてしまってかまいません。

    この作業以降、Graph API を呼び出しても HTTP 400 エラーは発生せず、新規に作成した Teams for Education のリソースに Graph API からアクセスすることが可能になます。

    ただし、この作業を行う以前に作成された Teams for Education のリソースは Graph API から検出できませんので注意が必要です。


* **[Visual Studio Code](https://code.visualstudio.com/Download)**

    全体のコーディング作業で使用します。


* [**Node.js**](https://nodejs.org/en/)

   演習で使用するサンプル アプリケーションをホストするのに使用します。

    また、Visual Studio Code を使用する場合は、ローカル環境で Web サーバーを動かすために以下のコマンドを使用して http-server をインストールしてください。

    ```
    npm install http-server -g
    ```

* **デスクトップ版 Microsoft Teams**

    アプリケーションの登録を行うにはデスクトップ版の Microsoft Teams が必要です。[Office 365 ポータル](https://www.office.com/?)からインストールしておいてください。

* **[ngrok](https://ngrok.com/download)**

    ローカル環境で動作させた開発中のアプリケーションをインターネットを介して一時的にアクセスできるようにするために使用します。

    また Node.js が使用可能な場合は、以下のコマンドを使用してインストールすることも可能です。

    ```
    npm install ngrok -g
    ```

    インストール完了後、ngrok - [Online in One Line](https://ngrok.com/)にアクセスいただき、同ページ内にある \[**Sign up for free**\] ボタンをクリックし、auth トークンを入手し、必要な設定を行ってください

<br />

## 目次
0. [**Microsoft Teams Education 用アプリ開発について**](Intro.md)
    - [準備) 演習に入る前の準備 - 操作するリソースの作成](Ex00.md)
1. [**演習1 ) Graph API を使用した Teams for Education の操作**](Ex01-1.md)
    1. [Teams for Education 固有のオブジェクトの列挙とドリル ダウン](Ex01-1.md#%E6%BC%94%E7%BF%92-1-teams-for-education-%E5%9B%BA%E6%9C%89%E3%81%AE%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%AE%E5%88%97%E6%8C%99%E3%81%A8%E3%83%89%E3%83%AA%E3%83%AB-%E3%83%80%E3%82%A6%E3%83%B3)
    2. [REST クライアント ツールを使用した Graph API の呼び出しと Teams for Education の課題の作成と割り当て](Ex01-2.md)
2. [**演習2 ) Teams for Education を操作する Single Page Application(SPA) の作成**](Ex02-1.md)
    1. [Azure Active Directory へのアプリケーションの登録](Ex02-1.md)
    2. [認証処理の実装](Ex02-2.md)
    2. [アクセストークンの取得](Ex02-3.md)
    3. [Graph API を使用した機能の実装](Ex02-4.md)
3. [**演習3) Teams タブ アプリの作成**](Ex03-0.md) 
    1. [静的(パーソナル)タブの作成](Ex03-1.md)
    2. [構成可能(チーム) タブ アプリの作成](Ex03-2.md)
    3. [タブ アプリへのシングルサインオン(SSO)の実装](Ex03-3.md)