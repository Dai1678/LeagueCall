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


  function getChampionData(requestName){
      return new Promise(function (resolve, reject){
          var url = 'http://jp.op.gg/champion/' + requestName + '/statistics/';

          client.fetch(url, {}, function(err,$,res,body){
              if(err){
                  console.log("Error",err);
                  console.log("RESPONSE",res);
                  return;
              }

              $("div[class='tabItems']").each(function (idx){
                  var championName = $('.champion-stats-header-matchup__table__champion').eq(0).text().trim();
                  //championName = championName;

                  if(!championName){
                      reject(new Error('データを取得できませんでした'));
                  }else{
                      resolve(championName);
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
            app.ask('ようこそ、LoLSmartCallへ');
            break;

        case UNKNOWN_INTENT:
            app.ask('もう一度お願いします');
            break;

        case END_INTENT:
            app.tell('ありがとうございました');
            break;

        case CHAMPION_COUNTER:
            var requestChampionName = app.getArgument('LoL-Champions'); //音声入力されたキャラクター(チャンピオン)の名前が入る
            //var result = getChampionData(requestChampionName);
            //app.ask(requestChampionName + 'の苦手なチャンピオンは、' + name + 'です。');

            getChampionData(requestChampionName).then(function (name){
                app.ask(requestChampionName + 'の苦手なチャンピオンは、' + name + 'です。');
            }).catch(function (error){
                app.ask(error);
            });

            break;
    }
  }

  app.handleRequest(responseHandler);

});
