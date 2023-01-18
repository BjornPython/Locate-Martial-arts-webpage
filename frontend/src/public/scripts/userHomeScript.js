window.onload = (() => {

    // Animations for Uprofile.jsx
    const userCoach = document.querySelector(".user-coach");
    const userStud = document.querySelector(".user-stud")
    const editButton = document.querySelector(".p-setting-icon")
    const saveChangesBUtton = document.querySelector(".save-changes")
    
    //Animations for Uhome.jsx
    const UhomePages = document.querySelector(".u-home-pages");
    const messageButton = document.querySelector(".messages-btn");
    const profileButton = document.querySelector(".profile-btn");

    messageButton.addEventListener("click", () => {
        console.log("MESSAGE BTN CLICKED.");
        UhomePages.classList.remove("show-profile")
        UhomePages.classList.add("class", "show-messages")
    })
    
    profileButton.addEventListener("click", () => {
        console.log("PROFILE BTN CLICKED.");
        UhomePages.classList.remove("show-messages");
    })

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
        console.log("USER COACH CLICKED");
        if (editing) {
            if (!userCoach.classList.contains("what-status-active")) {
                userCoach.classList.toggle("what-status-active")
                userStud.classList.toggle("what-status-active")
            }

        }

        })


        userStud.addEventListener("click", () => {
        console.log("USER STUD CLICKED");

            if (editing) {
                if (!userStud.classList.contains("what-status-active")) {
                    userStud.classList.toggle("what-status-active")
                    userCoach.classList.toggle("what-status-active")
            }
        }
        })


})