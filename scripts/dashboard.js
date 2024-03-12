function buildCorrelationMatrix() {
    const corrMatrix = [
        ["",'Sex','Age','Education','Smoker','Cigs/Day','BPMeds','Stroke','Hypertensia','Diabetes','BMI','TenYearCHD'],
        ['Sex',1.0,-0.062271124472354646,0.03143220970710868,0.24933876154971077,0.34996225175681994,-0.059443198181177596,0.0004491857275419122,-0.05394795341596598,0.011976340673173205,0.033293702453660444,0.0018431543981835615],
        ['Age',-0.062271124472354646,1.0,-0.1699287454484589,-0.2239335998222233,-0.17998256912278066,0.14630587003948672,0.030314461530753702,0.2895662696705326,0.06048387950655766,0.12177485422263876,0.306819098613547],
        ['Education',0.03143220970710868,-0.1699287454484589,1.0,0.02702647538677596,0.02121124213939099,-0.01637090661392636,-0.021804443033947928,-0.060906488499463465,-0.028086969284417895,-0.1357951925082552,-0.10044478018231887],
        ['Smoker',0.24933876154971077,-0.2239335998222233,0.02702647538677596,1.0,0.7923790445397584,-0.0725619381949137,-0.031598646744036944,-0.15074714717530668,-0.036528863216253905,-0.16113318590154876,0.022895928012192854],
        ['Cigs/Day',0.34996225175681994,-0.17998256912278066,0.02121124213939099,0.7923790445397584,1.0,-0.06867371441242517,-0.031851698660577195,-0.12124489166711101,-0.03494171059317426,-0.08566210625153389,0.08984510929486406],
        ['BPMeds',-0.059443198181177596,0.14630587003948672,-0.01637090661392636,-0.0725619381949137,-0.06867371441242517,1.0,0.08419557231422568,0.26030524841889424,0.027480776732195355,0.08834834845499123,0.09663200534291566],
        ['Stroke',0.0004491857275419122,0.030314461530753702,-0.021804443033947928,-0.031598646744036944,-0.031851698660577195,0.08419557231422568,1.0,0.05412764584148361,0.012742889454810342,0.026026567474196866,-0.007862819082533222],
        ['Hypertensia',-0.05394795341596598,0.2895662696705326,-0.060906488499463465,-0.15074714717530668,-0.12124489166711101,0.26030524841889424,0.05412764584148361,1.0,0.06812257690265953,0.2877313278669757,0.07722171456520499],
        ['Diabetes',0.011976340673173205,0.06048387950655766,-0.028086969284417895,-0.036528863216253905,-0.03494171059317426,0.027480776732195355,0.012742889454810342,0.06812257690265953,1.0,0.07039602023699609,-0.01200015142253965],
        ['BMI',0.033293702453660444,0.12177485422263876,-0.1357951925082552,-0.16113318590154876,-0.08566210625153389,0.08834834845499123,0.026026567474196866,0.2877313278669757,0.07039602023699609,1.0,0.10415505075191335],
        ['TenYearCHD',0.0018431543981835615,0.306819098613547,-0.10044478018231887,0.022895928012192854,0.08984510929486406,0.09663200534291566,-0.007862819082533222,0.07722171456520499,-0.01200015142253965,0.10415505075191335,1.0]
    ]

    const corrMatrixTable = document.getElementById('corr-matrix-tb');

    for (let i = 0; i < corrMatrix.length; i++) {
        let row = corrMatrix[i];
        let tableRow = document.createElement("tr");

        for (let j = 0; j < row.length; j++) {
            let col = row[j];
            let tableData = document.createElement('td');
            if (typeof col === 'string') {
                tableData.textContent = col;
                tableRow.append(tableData);
            } else {
                let floatVal = parseFloat(row[j]).toFixed(2);
                console.log(floatVal);

                if (floatVal < 0.0) {
                    tableData.classList.add('neg');
                } else if (floatVal >= 0 && floatVal < 0.1) {
                    tableData.classList.add('small-corr')
                } else if (floatVal >= 0.1 && floatVal < 1) {
                    tableData.classList.add('pos');
                } else {
                    tableData.classList.add('one-corr');
                }

                tableData.textContent = floatVal;
                tableRow.append(tableData);
            }
        }

        corrMatrixTable.append(tableRow);
    }

    return corrMatrixTable;
}