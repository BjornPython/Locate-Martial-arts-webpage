    // Animations for Uprofile.jsx

const userProfileScript = () => {
    console.log("USER PROFILE CLICKED STARTED");
    const userCoach = document.querySelector(".user-coach");
    const userStud = document.querySelector(".user-stud")
    const editButton = document.querySelector(".p-setting-icon")
    const saveChangesBUtton = document.querySelector(".save-changes")

    const spartnerDiv = document.querySelector("#spartner-div");
    const coachDiv = document.querySelector("#coach-div");
    const spartnerDropdown = document.querySelector("#spartner-dropdown");
    const coachDropdown = document.querySelector("#coach-dropdown");
    const searchingArts = document.querySelectorAll(".u-display-mart");

    
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

        spartnerDiv.addEventListener("click", () => {
            console.log("spartner div clicked");
            spartnerDropdown.classList.toggle("spar-dropdown-active")
        })
    
        coachDiv.addEventListener("click", () => {
            console.log("spartner div clicked");
            coachDropdown.classList.toggle("spar-dropdown-active")
        })
    
        console.log("COACH DIV", coachDiv);
}
    

export default userProfileScript