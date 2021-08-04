//split the array of data into subarrays of 74 elements where each subarray is a day 
function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}

function getData() {
    var dates = {
        date_from: document.getElementById("date_from").value,
        date_to: document.getElementById("date_to").value
    };
 
    $.ajax({
        url: 'https://data.gov.gr/api/v1/query/mdg_emvolio',
        data: dates,
        dataType: 'json',
        headers: {
            "Authorization": "Token 6f7afbe6fa48a0c2721ed86c3dda8fd633eeb120"
        },
        success: function(data) {
            let arr = sliceIntoChunks(data, 74);
            let dataOrganized = [];
            let totalVaccinations = 0, totalDailyVaccinations = 0;
            let tab = document.getElementById("tab");
            let cont = document.getElementById("cont");

            let removeTab = document.getElementById('tab');

            //delete the table of statistics if it already exists to dynamically change the content
            if(removeTab !== null){
                let parentEl = removeTab.parentNode;
                parentEl.removeChild(removeTab);
            }

            if(data.length === 0) {
                document.getElementById("message").style.display = "block";
            }else {
                document.getElementById("message").style.display = "none";
                let table = document.createElement('table');
                table.setAttribute("id","tab");

                let tr = document.createElement("tr");
                let th1 = document.createElement("th");
                let th2 = document.createElement("th");
                let th3 = document.createElement("th");
                let th4 = document.createElement("th");
                let th5 = document.createElement("th");

                let text1 = document.createTextNode('Ημερομηνία');
                let text2 = document.createTextNode('Συνολικές ημερήσιες πρώτες δόσεις');
                let text3 = document.createTextNode('Συνολικές ημερήσιες δεύτερες δόσεις');
                let text4 = document.createTextNode('Συνολικοί ημερήσιοι εμβολιασμοί');
                let text5 = document.createTextNode('Συνολικοί εμβολιασμοί');

                th1.appendChild(text1);
                th2.appendChild(text2);
                th3.appendChild(text3);
                th4.appendChild(text4);
                th5.appendChild(text5);

                tr.appendChild(th1);
                tr.appendChild(th2);
                tr.appendChild(th3);
                tr.appendChild(th4);
                tr.appendChild(th5);
                
                table.appendChild(tr);
                
                for(let i = 0; i < arr.length; i++) {
                    let sumOfDailyDoses1 = 0;
                    let sumOfDailyDoses2 = 0;
                    
                    for(let j = 0; j < arr[i].length; j++){
                        sumOfDailyDoses1 += arr[i][j].dailydose1;
                        sumOfDailyDoses2 += arr[i][j].dailydose2;
                        totalVaccinations += arr[i][j].totalvaccinations;
                    }
    
                    totalDailyVaccinations = sumOfDailyDoses1 + sumOfDailyDoses2;
    
                    dataOrganized.push({
                        day: new Date((arr[i][0].referencedate.split("T"))[0]),
                        totalDailyDoses1: sumOfDailyDoses1,
                        totalDailyDoses2: sumOfDailyDoses2,
                        totalDailyDoses: totalDailyVaccinations,
                        totalVaccinations: totalVaccinations
                    });

                    totalVaccinations = 0;
                }
                
                //sort by date in descending order
                const sorted = dataOrganized.sort((a, b) => b.day - a.day);

                for(let i = 0; i < sorted.length; i++) {
                    let tr = document.createElement("tr");
                    let td1 = document.createElement("td");
                    let td2 = document.createElement("td");
                    let td3 = document.createElement("td");
                    let td4 = document.createElement("td");
                    let td5 = document.createElement("td");

                    td1.innerHTML = sorted[i].day.getDate() + "/" + parseInt(sorted[i].day.getMonth() + 1) 
                    + "/" + sorted[i].day.getFullYear();
                    td2.innerHTML = sorted[i].totalDailyDoses1;
                    td3.innerHTML = sorted[i].totalDailyDoses2;
                    td4.innerHTML = sorted[i].totalDailyDoses;
                    td5.innerHTML = sorted[i].totalVaccinations;

                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tr.appendChild(td4);
                    tr.appendChild(td5);
                    table.appendChild(tr);
                }

                cont.appendChild(table);
            }       
        }       
    });
}
