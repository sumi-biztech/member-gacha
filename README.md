# member-gacha

## できること
スプレッドシートにあるメンバーの中からランダムで3名選出し、Slackへ通知を行います
![スクリーンショット 2023-06-12 4 49 49](https://github.com/sumi-biztech/member-gacha/assets/80687266/72cc93b0-5a75-41d8-bfa5-9649d6befde4)


## 準備
### スプレッドシートの準備
スプレッドシートを用意し、以下の項目を用意します (必要に応じて変更してください)
` username, email, status, billing-active, has-2fa, has-sso	userid, fullname, displayname `

![スクリーンショット 2023-06-12 4 37 13](https://github.com/sumi-biztech/member-gacha/assets/80687266/22f458dd-4425-4795-a311-72f87e2982ac)

これはSlackからメンバーリストを出力した際と同様のフォーマットとなります。
必須項目は、G列のUserIDのみです
GASはウェブアプリとして誰でも実行できるようにしておきます。

### zapierとの連携
トリガーはzapierから起動させています。
<img width="955" alt="スクリーンショット 2023-06-12 4 40 47" src="https://github.com/sumi-biztech/member-gacha/assets/80687266/e33f495c-b6e9-481e-a055-9a539a7d785e">
1. 受信したメールの中からWantedlyの応募メールを抽出
2. 受信したテキストを整形し、採用ページのURLを抽出
3. webhookでGASを呼び出し。その際に2で取得したURLを引数として渡す

