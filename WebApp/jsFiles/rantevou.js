function date() {
    document.getElementById("form").style.display = "none";
    document.getElementById("choice").style.display = "block";
    document.getElementById("info").style.display = "none";

    //epistrefei random hmeromhnia
    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    //tyxaies hmeromhnies apo thn shmerinh hmeromhnia mexri 31 aygoustou
    let date = randomDate(new Date(),new Date(2021,7,31));
    let time, minutes = parseInt(date.getMinutes() + 1), hours = parseInt(date.getHours() + 1);

    //an h wra h ta lepta einai mikrotera tou 10 na mpei ena mhden apo mprosta
    if(parseInt(date.getMinutes() + 1) < 10){
        minutes = "0" + parseInt(date.getMinutes() + 1);
    }

    if(parseInt(date.getHours() + 1) < 10) {
        hours = "0" + parseInt(date.getHours() + 1);
    }

    time = hours + ":" + minutes;

    let p1 = document.getElementById("random").innerHTML = date.getDate() + "/" + parseInt(date.getMonth() + 1) + 
    "/" + date.getFullYear() + "  " + time;

    let p2 = document.getElementById("confirm").innerHTML = "Προτιμάτε αυτή την ημερομηνία και ώρα;"; 
}

function makeRantevou(event) {
    let choice = event;

    //an epileksoume oti epithimoume thn hmeromhnia tote tha emfanistei to mhnyma
    if(choice === "yes") {
        document.getElementById("choice").style.display = "none";
        document.getElementById("submit").style.display = "block"; 
    }else {
        document.getElementById("mes").style.display = "block";
        document.getElementById("choice").style.display = "none";
        var sub = document.getElementById("submit");
        sub.style.display = "block";

        //an den epithumoume thn tuxaia wra diagrafetai to p element
        let pRemove = document.getElementById("random");
        let parent = pRemove.parentNode;
        parent.removeChild(pRemove);

        let input1 = document.createElement("input");
        input1.setAttribute("type", "date");
        input1.setAttribute("id", "date");

        let input2 = document.createElement("input");
        input2.setAttribute("type", "time");
        input2.setAttribute("id", "time");

        sub.insertBefore(input2, sub.childNodes[0]);
        sub.insertBefore(input1, sub.childNodes[0]);      
    }
}

function submit(event) {
    let choice = event;
    let p = document.getElementById("random");
    let data;

    if(choice === "send") {
        //500 error an einai kapoio apo ta pedia keno
        if(document.getElementById("fname").value === "" || document.getElementById("lname").value === ""
            || document.getElementById("fname").value === "" || document.getElementById("tel").value === ""
            || document.getElementById("G").value === "" || document.getElementById("email").value === ""
            || document.getElementById("amka").value === "") {

            $.ajax({
                type: "POST",
                url: "https://us-central1-unipi-aps.cloudfunctions.net/emvolioDate",
                data: {},
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                error: () => {
                    alert("Συμπληρώστε όλα τα στοιχεία.");
                    window.location.reload();
                }
            });
        }else {
            //an leipei to p element shmainei oti balame dikh mas mera kai wra
            if(p === null) {
                data = {
                    name: document.getElementById("fname").value,
                    lastname: document.getElementById("lname").value,
                    tel: document.getElementById("tel").value,
                    gender: document.getElementById("G").value,
                    email: document.getElementById("email").value,
                    amka: document.getElementById("amka").value,
                    datetime: document.getElementById("date").value + " " + document.getElementById("time").value
                };
                console.log(data);
                $.ajax({
                    type: "POST",
                    url: "https://us-central1-unipi-aps.cloudfunctions.net/emvolioDate",
                    data: JSON.stringify(data),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: () => {
                        alert("Κλείσατε ραντεβού επιτυχώς");
                        window.location.reload();
                    },
                    error: () => {
                        alert("Τα στοιχεία που συμπληρώσατε δεν υπάρχουν.");
                        window.location.reload();
                    }
                });
            //an oxi mpainei h tuxaia
            }else {
                data = {
                    name: document.getElementById("fname").value,
                    lastname: document.getElementById("lname").value,
                    tel: document.getElementById("tel").value,
                    gender: document.getElementById("G").value,
                    email: document.getElementById("email").value,
                    amka: document.getElementById("lname").value,
                    datetime: p.innerHTML
                };
                console.log(data);
                $.ajax({
                    type: "POST",
                    url: "https://us-central1-unipi-aps.cloudfunctions.net/emvolioDate",
                    data: JSON.stringify(data),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: () => {
                        alert("Κλείσατε ραντεβού επιτυχώς");
                        window.location.reload();
                    },
                    error: () => {
                        alert("Τα στοιχεία που συμπληρώσατε δεν υπάρχουν.");
                        window.location.reload();
                    }
                });
            }
        }
    //an pathsoume akyrwsh mas paei sthn arxikh selida
    }else {
        window.location.href = "../htmlFiles/menu.html";
    }
}
