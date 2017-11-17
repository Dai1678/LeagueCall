# LoLSmartCall

LoLSmartCall (えるおーえるすまーとこーる)は、オンラインゲーム「League of Legends」についての色々な情報を伝えてくれる、
Google Assistant アプリです。   
    
このアプリで使用しているデータは、LoL戦績サイト「OP.GG」(http://jp.op.gg/l=ja) のものを利用しています。

現在も開発中です。一通りの機能実装とバグがなくなり次第、リリースの判断を行います。

## Description

### 現在実装されている機能
- チャンピオンのカウンターを教えてくれる機能  (Champion_Counter)

### 実装予定されている機能
- ゲーム中のプレイヤーのレート
- ゲーム中のプレイヤーが使用しているチャンピオンの普段の使用率
- プレイヤーの得意チャンピオン
- 今週のフリーチャンピオン
- ストアのセール情報

## Demo

準備中です

## Features

- Androidスマートフォン、Google Homeに対応し、気軽に利用が可能
- お定評のあるOP.GGから色々なデータを拝借(スクレイピング)させてもらっています

## quirement

- dialogflow 
- Actions on Google
- Node.js 
- cheerio-https (スクレイピング用モジュール)
- firebase-function (firebase blazeプラン)

## Usage
- Champion_Counter   

「(チャンピオン名)のカウンター」と話すと、そのチャンピオンが苦手とするチャンピオン3つと、   
得意とするチャンピオン3つの名前を教えてくれます。   


## Installation

リリース後に追記します。

## Anything Else

- ご意見・ご要望はpullrequestやDai1678のtwitterアカウントにお願いします！
- firebaseのblazeプラン(従量課金性)を利用しています。もしリリースする場合にはdonateなどで利用料を募る場合があるかもしれません。
- このアプリについて、Qiita スマートスピーカー アドベントカレンダー2017 の 12/11 投稿記事にて色々書いています。

## Author

Dai Miyamoto

Github : https://github.com/Dai1678  
Twitter : @daivr7774  
Qiita : https://qiita.com/daivr7774  


## License

何書けばいいのかな...
