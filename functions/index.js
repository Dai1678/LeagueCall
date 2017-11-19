'use strict';

process.env.DEBUG = 'actions-on-google:*';
const { DialogflowApp } = require('actions-on-google');
const functions = require('firebase-functions');

exports.yourAction = functions.https.onRequest((request, response) =>
{
  const app = new DialogflowApp({request, response});

  const WELCOME_INTENT = 'input.welcome';
  const UNKNOWN_INTENT = 'input.unknown';
  const END_INTENT = 'default_end_intent';
  const CHAMPION_COUNTER = 'Champion_Counter';

  var client = require('cheerio-httpcli');

  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));

  var championName = [];

  function getChampionData(requestName){
      var url = 'http://jp.op.gg/champion/' + requestName + '/statistics/';

      return new Promise(function (resolve, reject){

          client.fetch(url, {}, function(err,$,res,body){
              if(err){
                  console.log("Error",err);
                  console.log("RESPONSE",res);
                  return;
              }

              $("div[class='tabItems']").each(function (idx){
                  for(var i=0; i<6; i++){
                      championName[i] = $('.champion-stats-header-matchup__table__champion').eq(i).text().trim();
                  }

                  if(championName.length == 0){
                      reject(new Error('名前データを取得できませんでした')); //失敗時
                  }else{
                      resolve(championName);    //成功時
                  }
              });

          });
      })
  }

  // Fulfill action business logic
  function responseHandler (app) {
    // Complete your fulfillment logic and send a response
    let intent = app.getIntent();

    switch (intent) {
        case WELCOME_INTENT:
            app.ask('ようこそ、リーグ・コールへ');
            break;

        case UNKNOWN_INTENT:
            app.ask('もう一度お願いします');
            break;

        case END_INTENT:
            app.tell('ありがとうございました');
            break;

        case CHAMPION_COUNTER:
            var requestChampionName = app.getArgument('LoL-Champions'); //音声入力されたキャラクター(チャンピオン)の名前が入る

            getChampionData(requestChampionName).then(function (name){
                app.ask(requestChampionName + 'の苦手なチャンピオンは、' + name[0] + '、' + name[1] + '、' + name[2] + 'です。'
                         + '得意なチャンピオンは、' + name[3] + '、' + name[4] + '、' + name[5] + 'です。');
            }).catch(function (error){
                app.ask('クローリングに失敗しました。');
            });

            break;
    }
  }

  app.handleRequest(responseHandler);

});
