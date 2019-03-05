// 参考：https://tonari-it.com/gas-gmail-create-draft/
// セキュリティ対策：フォーム作成者のGmailにアクセスするので、本人確認が必須！（Googleフォーム側で制御すること）

var DATE_TIME = "01:00"; // 処理時刻（時:分） - 各2桁表記

function createDraft_for_bookingSendDraftEmail() {
  //有効なGooglesプレッドシートを開く
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  //新規申請された行番号を取得
  var lastrow_num = sheet.getLastRow();
  // 日付変換関数
  var toDoubleDigits = function(num) {
    num += "";
    if (num.length === 1) {
      num = "0" + num;
    }
    return num;     
  };
  // getRange(データの最終行, 列番号) / 列番号は A列 = 1 と考える。
  // 日付取得と変換（YYYY/MM/DD hh:mm 形式にする）
  var sdate = new Date(sheet.getRange(lastrow_num, 2).getValue());
  var yyyy = sdate.getFullYear();
  var mm   = toDoubleDigits(sdate.getMonth()+1);  // 0-11
  var dd   = toDoubleDigits(sdate.getDate());
  var date = yyyy + "/" + mm + "/" + dd + " ";
  // メール種別
  var mail_type = sheet.getRange(lastrow_num,6).getValue();

  // 宛先
  var to = sheet.getRange(lastrow_num,3).getValue();
  // 件名 
  var subject = "{" + date + " " + DATE_TIME + "} " + sheet.getRange(lastrow_num,4).getValue();

  var body = '';
  body += sheet.getRange(lastrow_num,5).getValue();

  // リッチテキスト形式、プレーンテキスト形式のいずれで保存するかチェック
  if(mail_type == "リッチテキスト形式（Rich Text Format)"){
    var mailArgs = {
      htmlBody: body
    }
    GmailApp.createDraft(to, subject, body, mailArgs);
  }else{
    GmailApp.createDraft(to, subject, body);
  }
  // 下書きの最新1件を取り出す（今、GmailApps.createDraft で保存した下書きを想定）。
  // もし、下書き作成中で送信すると違うメールになる可能性は若干ある。しかし、スターがつくだけであること、
  // 本フォームは自分以外使わないことを想定しているので問題ないはず
  var draft = GmailApp.getDrafts()[0];
  draft.getMessage().star();
}