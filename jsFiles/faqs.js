const headers = document.querySelectorAll(".header");

headers.forEach(header => {
    header.addEventListener("click", event => {
        const currentlyActiveQuestion = document.querySelector(".header.active");
        //an kanw click se allh erwthsh na kleisei h prohgoumenh
        if(currentlyActiveQuestion && currentlyActiveQuestion !== header) {
            currentlyActiveQuestion.classList.toggle("active");
            currentlyActiveQuestion.nextElementSibling.style.maxHeight = 0;
        }

        header.classList.toggle("active");
        const questionBody = header.nextElementSibling;
        if(header.classList.contains("active")) {
            questionBody.style.maxHeight = questionBody.scrollHeight + "px";
        }else {
            questionBody.style.maxHeight = 0;
        }
    })
});
