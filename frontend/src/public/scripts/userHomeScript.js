window.onload = (() => {
    const userCoach = document.querySelector(".user-coach");
    const userStud = document.querySelector(".user-stud")


    userCoach.addEventListener("click", () => {
        userCoach.classList.toggle("what-status-active")
        userStud.classList.toggle("what-status-active")
        })


        userStud.addEventListener("click", () => {
            userStud.classList.toggle("what-status-active")
            userCoach.classList.toggle("what-status-active")
        })


})