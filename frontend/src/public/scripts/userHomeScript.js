window.onload = (() => {
    const userCoach = document.querySelector(".user-coach");
    const userStud = document.querySelector(".user-stud")

    const editButton = document.querySelector(".p-setting-icon")


    const saveChangesBUtton = document.querySelector(".save-changes")

    let editing = false;

    editButton.addEventListener("click", () => {
        editing = !editing 
        console.log(editing);
    })

    saveChangesBUtton.addEventListener("click", () => {
            editing = false;
    })

    userCoach.addEventListener("click", () => {
        if (editing) {
        userCoach.classList.toggle("what-status-active")
        userStud.classList.toggle("what-status-active")
        }

        })


        userStud.addEventListener("click", () => {
            if (editing) {
            userStud.classList.toggle("what-status-active")
            userCoach.classList.toggle("what-status-active")
            }
        })


})