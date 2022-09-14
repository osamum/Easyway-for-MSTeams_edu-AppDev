# Microsoft Teams for Education 用アプリ開発について

Microsoft Teams for Education は教育機関むけに提供される Microsoft Teams であり、標準の Teams にはない、クラス運営やリモート授業/テストといった教育業務のための機能が追加されています。

Microsoft Teams for Education むけのアプリ開発や、機能連携を行う場合には、Microsoft Teams for Education ならではの機能を把握し、利用することで重複する機能の開発を回避し、かつ効率的な開発を行うことできます。

## Microsoft Teams for Education の構造

ベースとなっている Microsoft Teams そのものが、機能へのエントリーポイントとなっており、Microsoft 365 のさまざまなサービスを組み合わせて機能を実現しています。

たとえば、チャネルやチャットに投稿されるファイルの格納場所は OneDrive や SharePoint が使用されてますし、会議のメモやチャネルのノートには OneNote が使用されます。

これは Microsoft Teams for Education に追加された教育業務に特価した機能も同様ですが、一部完全に Microsoft Teams for Education 独自のものも存在します。

よって、Microsoft Teams for Education の機能的な構造は、以下のようになっています。

|Microsoft Teams for Education の機能|
| ---- |
|[Microsoft Teams の機能](https://docs.microsoft.com/ja-jp/graph/api/resources/teams-api-overview?view=graph-rest-1.0)|
|[Microsoft Teams for Education 固有の機能](https://docs.microsoft.com/ja-jp/graph/api/resources/education-overview?view=graph-rest-1.0)|
|他の Microsoft 365 サービスの機能|

これらの機能提供元の違いは、外部から Microsoft Graph API を使用して Teams を操作使用とする際に関係してきます。

たとえば、["Teams のチャネルにファイルを添付したメッセージを投稿する"処理](https://github.com/osamum/Firstway_to_MSTeamsGraphAPI/blob/master/Ex05.md)を考えた場合、まず最初に[Microsoft Authentication Library (MSAL)](https://docs.microsoft.com/ja-jp/azure/active-directory/develop/msal-overview) を使用してアクセストークンを入手し、それを使用して[Drive/DriveItem の Graph API](https://docs.microsoft.com/ja-jp/graph/api/resources/onedrive?view=graph-rest-1.0) を呼び出し、ファイルを OneDrive か SharePoint にファイルにアップロードします。

アップロードの完了を待ち、その際に返された JSON 内の eTag 要素の値を [Teams の chatMessage](https://docs.microsoft.com/ja-jp/graph/api/chatmessage-post?view=graph-rest-1.0&tabs=http) に含め、Graph API を使用して投稿を行います。 

このように Teams の操作ではひとつのアクションに見えるものでも、複数のサービスの機能が組み合わされて実装されています。
<br><br>

## Microsoft Teams と Teams for Education の違い

Microsoft Teams for Education では、教職員が新しくチームを作成する場合に、あらかじめ4種類のテンプレートが用意されており、利用用途に合わせてテンプレートを選択し作成します。

<img src="./images/22Sep_EduTeamsTemplate.png">

この 4 つのチームの役割と用途の違いについては以下のドキュメントをご覧ください。

* [**Microsoft Teams で共同作業を行うチームの種類を選択する**](https://support.microsoft.com/ja-jp/topic/microsoft-teams-%E3%81%A7%E5%85%B1%E5%90%8C%E4%BD%9C%E6%A5%AD%E3%82%92%E8%A1%8C%E3%81%86%E3%83%81%E3%83%BC%E3%83%A0%E3%81%AE%E7%A8%AE%E9%A1%9E%E3%82%92%E9%81%B8%E6%8A%9E%E3%81%99%E3%82%8B-0a971053-d640-4555-9fd7-f785c2b99e67)

上記 4 つのチームは用途に合わせ、追加するメンバーの権限や役割、タブとして表示されるプリセットされる機能に違いがあります。

中でも、**クラス** は他の 3 のチームとは大きく異なり、Microsoft Teams for Education 固有の機能が複数組み込まれています。

また、固有の機能であるだけに **クラス** は Graph API も[個別のもの](https://docs.microsoft.com/ja-jp/graph/api/resources/educationclass?view=graph-rest-1.0)が提供されています。

以下は **クラス** に既定で提供される機能と機能の提供元サービスです。

<img src="images/22Sep_ClassView.png" width="1000">

| 機能 | 提供元 |
| ---- |---- |
| ① ホームページ| [SharePoint](https://docs.microsoft.com/ja-jp/graph/api/resources/sharepoint?view=graph-rest-1.0) |
| ② Class Notebook| [OneNote](https://docs.microsoft.com/ja-jp/graph/api/resources/onenote-api-overview?view=graph-rest-1.0)|
| ③ 課題/成績 | [Microsoft Teams for Education 固有](https://docs.microsoft.com/ja-jp/graph/api/resources/educationsubmission?view=graph-rest-1.0)|
| ④ Reflect| [Microsoft Reflect](https://reflect.microsoft.com/)|
| ➄ Insights | Microsoft Teams for Education 固有|
| ⑥ チャネル | [Microsoft Teams](https://docs.microsoft.com/ja-jp/graph/api/resources/channel?view=graph-rest-1.0) |
| ➆ クラス教材のアップロード| [SharePoint](https://docs.microsoft.com/ja-jp/graph/api/resources/onedrive?view=graph-rest-1.0) |
| ⑧ Class Notebook を設定 | [OneNote](https://docs.microsoft.com/ja-jp/graph/api/resources/onenote-api-overview?view=graph-rest-1.0)|

上記、機能と機能提供元の表からもわかるとおり、Microsoft Teams for Education のデスクトップ クライアント上にメニューが存在していても、それらの機能は複数の Microsoft 365 のサービスが提供しています。

よって、外部プログラムからこれら Microsoft Teams for Education の機能にアクセスするには、機能提供元のサービスの API を使用します。

また、Microsoft Teams for Education の全ての機能が API を介して使用できるわけでもなく、そもそも機能の提供元サービスが API を公開していない場合もあるので注意が必要です。

たとえば上記の表の Insights、Reflect はこのドキュメントの執筆時点 (2022 年 9 月) で API が公開されていませんし、**課題**を作成する際に選択できる**クイズ** は、