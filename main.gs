function doPost(e) {
  // 採用ページのURLを引数として渡す
  var postdata = JSON.parse(e.postData.contents);
  var url = postdata["URL"];

  // スプレッドシートからメンバーの一覧を取得 (1行目は削除)
  var sheet = SpreadsheetApp.openById("スプレッドシートのID").getSheetByName('シート名');
  var data = sheet.getDataRange().getValues(); //スプレッドシートのオブジェクトからデータを配列で取得します。
  data.shift();
  
  // ガチャで選ばれる人数
  var num = 3;
  
  // Slackにpostするテキスト
  var textarr=["応募がきたよ！今回の採用担当は… "];

  // スプレッドシートの一覧の中からメンバーをランダムに選出する
  for(let i=0;i<num;i++){
    //変数の数値をログ出力
    var pickedNum = Math.floor(Math.random() * Math.floor(data.length));

    if(i==0){
      // 最初に選ばれた人は採用責任者
      textarr.push("▶︎ 採用責任者 : <@"+data[pickedNum][6]+">");
    }else{
      textarr.push("▶︎ 担当者 : <@"+data[pickedNum][6]+">");
    }

    // データの配列を削除
    data.splice(pickedNum,1);
  }
  
  textarr.push("\n確認したら合格・不合格を教えてね！");
  textarr.push(url);
  var text = textarr.join("\n");

  var options = {
    method: 'post',
    contentType: 'application/json',
    payload: '{"text":"'+text+'"}'
  };

  // Slackに投稿
  UrlFetchApp.fetch("https://hooks.slack.com/services/*******/******/************", options);
  return text;
}
