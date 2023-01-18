window.onload = (() => {
    const userCoach = document.querySelector(".user-coach");
    const userStud = document.querySelector(".user-stud")

    const editButton = document.querySelector(".p-setting-icon")


    const saveChangesBUtton = document.querySelector(".save-changes")

    let editing = false;

    editButton.addEventListener("click", () => {
        editing = !editing 
        console.log(editing);
        userCoach.classList.toggle("what-status-cursor");
        userStud.classList.toggle("what-status-cursor");
    })

    saveChangesBUtton.addEventListener("click", () => {
            editing = false;
            userCoach.classList.remove("what-status-cursor");
            userStud.classList.remove("what-status-cursor");
    })

    userCoach.addEventListener("click", () => {
        if (editing) {
            if (!userCoach.classList.contains("what-status-active")) {
                userCoach.classList.toggle("what-status-active")
                userStud.classList.toggle("what-status-active")
            }

        }

        })


        userStud.addEventListener("click", () => {
            if (editing) {
                if (!userStud.classList.contains("what-status-active")) {
                    userStud.classList.toggle("what-status-active")
                    userCoach.classList.toggle("what-status-active")
            }
        }
        })


})