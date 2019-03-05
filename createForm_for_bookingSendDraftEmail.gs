var formTitle = 'Gmail予約送信フォーム';
var formDescription = '本Googleフォーム作成者のGmail 下書きに予約送信設定（スター付き）が保存されます。\n'
      +'* 本Googleフォーム作成者にログインできる人以外は使わないようにしてください。\n'
      +'実際の予約送信システムについては\n'
      +'https://docs.google.com/presentation/d/1CTzAAuZCMMuHo24vXy4CJThgXPBULPlKbMKh8d0AwGA/edit?usp=sharing\n'
      +'を参考に初期設定をしてください。';
var q1 = '予約送信日';
var q2 = 'メールの宛先';
var q3 = 'メールの件名';
var q4 = 'メールの本文';
var q5 = 'メールの種別';


function createForm_for_bookingSendDraftEmail(){
  var form = FormApp.create(formTitle);

  // フォーム概要
  form.setDescription(formDescription);
  
  // 予約送信日（日付）
  form.addDateItem().setTitle(q1).setRequired(true);
  // 宛先（記述式 / メールアドレスチェック）
  var validationEmail = FormApp.createTextValidation().requireTextIsEmail().build();
  form.addTextItem().setTitle(q2).setRequired(true).setValidation(validationEmail);
  // 件名（記述式）
  form.addTextItem().setTitle(q3).setRequired(true);
  // 本文（段落式）
  form.addParagraphTextItem().setTitle(q4).setRequired(true);  
  // メールの種別（ラジオボタン）
  form.addMultipleChoiceItem()
  .setTitle(q5)
  .setChoiceValues(['プレーンテキスト形式（Plain Text Format)','リッチテキスト形式（Rich Text Format)'])
  .setRequired(true);
}