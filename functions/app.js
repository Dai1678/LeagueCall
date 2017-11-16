var client = require( 'cheerio-httpcli' );

//例としてアイバーン
var champ = 'ashe';

var url = 'http://jp.op.gg/champion/' + champ + '/statistics/';

var championName = [];

client.fetch(url, {}, function(err, $, res, body){

    $("div[class='tabItems']").each(function (idx){
        for(var i=0; i<6; i++){
            championName[i] = $('.champion-stats-header-matchup__table__champion').eq(i).text().trim();
            console.log(championName[i]);
        }


        /*
        console.log('Weak against');
        for(var i=0; i<3; i++) {
            weakChampName[i] = $(this).find('.ChampionName').eq(i).text();
            weakChampRate[i] = $(this).find('.WinRate').find('b').eq(i).text();

            console.log(weakChampName[i] + ' 勝率:' + weakChampRate[i]);
        }

        console.log('\nStrong against');
        for(var j=3; j<6; j++) {
            strongChampName[j] = $(this).find('.ChampionName').eq(j).text();
            strongChampRate[j] = $(this).find('.WinRate').find('b').eq(j).text();

            console.log(strongChampName[j] + ' 勝率:' + strongChampRate[j]);
        }
        */
    });

});
