function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}
async function simulate(){
    const simulate = require("./index.js");
    let botFiles = ["bot1.js", "bot2.js", "bot3.js"];
    var table1Line = "      Bot       1         2         3       Total  Rank";
    var table2to4Line = [
        "1     bot1.js",
        "2     bot2.js",
        "3     bot3.js"
    ];
    var competition = {
        "1_2":[],
        "1_3":[],
        "2_3":[]
    };
    var indx = 0
    for (let botFile1 of botFiles){
        for (let botFile2 of botFiles){
            if(botFile1==botFile2)
                continue;
            indx++;
            result = await simulate("gemCollector", "config.json", botFile1, botFile2);

            var res = [
                round(result["player1"]/(result["player1"]+result["player2"]),1),
                round(result["player2"]/(result["player1"]+result["player2"]),1)
            ];

            if(botFile1 == "bot1.js"&&botFile2 == "bot2.js"){
                competition["1_2"].push(res);
            }
            else if(botFile2 == "bot1.js"&&botFile1 == "bot2.js"){
                competition["1_2"].push([res[1], res[0]]);
            }

            else if(botFile1 == "bot1.js"&&botFile2 == "bot3.js"){
                competition["1_3"].push(res);
            }
            else if(botFile2 == "bot1.js"&&botFile1 == "bot3.js"){
                competition["1_3"].push([res[1], res[0]]);
            }

            else if(botFile1 == "bot2.js"&&botFile2 == "bot3.js"){
                competition["2_3"].push(res);
            }
            else if(botFile2 == "bot2.js"&&botFile1 == "bot3.js"){
                competition["2_3"].push([res[1], res[0]]);
            }
        }
    }
    var bot1Score = 0;
    var bot2Score = 0;
    var bot3Score = 0;
    var rank = [0,0,0];

    competition["1_2"].forEach(scr => {
        table2to4Line[0]+="  "+scr[0].toFixed(1);
        table2to4Line[1]+="  "+scr[1].toFixed(1);
        table2to4Line[2]+="     ";
        bot1Score+=scr[0];
        bot2Score+=scr[1];
    });
    competition["1_3"].forEach(scr => {
        table2to4Line[0]+="  "+scr[0].toFixed(1);
        table2to4Line[1]+="     ";
        table2to4Line[2]+="  "+scr[1].toFixed(1);
        bot1Score+=scr[0];
        bot3Score+=scr[1];
    });
    competition["2_3"].forEach(scr => {
        table2to4Line[0]+="     ";
        table2to4Line[1]+="  "+scr[0].toFixed(1);
        table2to4Line[2]+="  "+scr[1].toFixed(1);
        bot2Score+=scr[0];
        bot3Score+=scr[1];
    });
    table2to4Line[0]+="  "+round(bot1Score, 1).toFixed(1);
    table2to4Line[1]+="  "+round(bot2Score, 1).toFixed(1);
    table2to4Line[2]+="  "+round(bot3Score, 1).toFixed(1);

    if(bot1Score>bot2Score&&bot2Score>bot3Score){
        rank = [1,2,3];
    }
    if(bot1Score>bot3Score&&bot3Score>bot2Score){
        var rank = [1,3,2];
    }
    else if(bot2Score>bot1Score&&bot1Score>bot3Score){
        rank = [2,1,3];
    }
    else if(bot3Score>bot1Score&&bot1Score>bot2Score){
        rank = [2,3,1];
    }
    else if(bot3Score>bot2Score&&bot2Score>bot1Score){
        rank = [3,2,1];
    }
    else if(bot2Score>bot3Score&&bot2Score>bot1Score){
        rank = [3,1,2];
    }
    table2to4Line[0]+="    "+rank[0];
    table2to4Line[1]+="    "+rank[1];
    table2to4Line[2]+="    "+rank[2];
    console.log("\x1b[44m",table1Line, "\x1b[32m", "\x1b[0m");
    //console.log("\x1b[0m");
    console.log("\x1b[32m",table2to4Line[0]);
    console.log("\x1b[33m",table2to4Line[1]);
    console.log("\x1b[31m",table2to4Line[2], "\x1b[0m");
    
};
simulate();