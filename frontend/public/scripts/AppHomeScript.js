window.onload = (() => {

    // ANIMATIONS FOR LOG IN AND REGISTER

    const homeButton = document.querySelector(".home-btn")
    const loginPage = document.querySelector(".login-page");
    const loginButton = document.querySelector(".login-btn");
    const registerButton = document.querySelector(".register-btn");
    const registerPage = document.querySelector(".register-page")
    const mainTexts = document.querySelector(".main-texts");
    
    const hamburger = document.querySelector(".hamburger");
    const links = document.querySelector(".links");
    const registerCoach = document.querySelector(".account-as-btn-coach");
    const registerCoachSpan = document.querySelector(".account-as-span-coach");
    const registerGym = document.querySelector(".account-as-btn-gym");
    const registerGymSpan = document.querySelector(".account-as-span-gym");


    //GYM PAGE

    const selectArts = document.querySelector(".select-span");
    const martsDropdown = document.querySelector(".marts-dropdown");


    const mArts = document.querySelectorAll(".m-art");
    const findBtns = document.querySelectorAll(".find-btn");


    if (!(loginPage.classList.contains("login-show")) || 
    !(registerPage.classList.contains("register-show"))) {
        homeButton.classList.toggle("btn-dark")
        console.log("HOME BTN DARK ");
    }


    const animateLogin = () => {
        homeButton.classList.toggle("btn-dark");
        loginPage.classList.toggle("login-show");
        mainTexts.classList.toggle("main-texts-active");
    }

    const animateRegister = () => {
        homeButton.classList.toggle("btn-dark");
        registerPage.classList.toggle("register-show");
        mainTexts.classList.toggle("main-texts-active");
    }

    loginButton.addEventListener("click", async () => {
        
        if (registerPage.classList.contains("register-show")) {
            registerPage.classList.toggle("register-show");
            registerButton.classList.toggle("btn-dark");
            loginButton.classList.toggle("btn-dark");
            loginPage.classList.toggle("login-show");

        } else {
            loginButton.classList.toggle("btn-dark");
            animateLogin();
        }



    })

    // ANIMATIONS FOR REGISTER BUTTON 

    registerButton.addEventListener("click", async () => {

        if (loginPage.classList.contains("login-show")) {
            loginPage.classList.toggle("login-show");
            loginButton.classList.toggle("btn-dark");
            registerButton.classList.toggle("btn-dark");
            registerPage.classList.toggle("register-show");

        } else {
            registerButton.classList.toggle("btn-dark");
            animateRegister();
        }
    })

    console.log("REGISTERCOACH", registerCoach);
    registerCoach.addEventListener("click", async () => {
        if (!registerCoachSpan.classList.contains("account-as-span-active")) {
            registerCoachSpan.classList.toggle("account-as-span-active");
        registerGymSpan.classList.toggle("account-as-span-active");
        }

    })
    console.log("REGISTERGYM", registerGym);

    registerGym.addEventListener("click", async () => {
        if (!registerGymSpan.classList.contains("account-as-span-active")) {
        registerCoachSpan.classList.toggle("account-as-span-active");
        registerGymSpan.classList.toggle("account-as-span-active");
        }

    })

    /*--------------------------------------------------*/
    /*--------------------------------------------------*/
    /*--------------------------------------------------*/

    
    // ANIMATIONS FOR NAVIGATION LINKS FOR SMALLER SCREEN SIZE


    console.log("HAMBURGER: ", hamburger);
    console.log("LINKS: ", links);

    hamburger.addEventListener("click", async () => {
        
        links.classList.toggle("links-active");
        hamburger.classList.toggle("active");
    })


    document.querySelectorAll(".links li a").forEach(n => n.addEventListener("click", () => {
        links.classList.remove("links-active");
        hamburger.classList.remove("active");
    }))

    /*--------------------------------------------------*/
    /*--------------------------------------------------*/
    /*--------------------------------------------------*/

    // ANIMATIONS FOR HOME BUTTON

    homeButton.addEventListener("click", () => {


        if (loginPage.classList.contains("login-show")) {
            console.log("HAS LOG IN ");
            loginButton.classList.toggle("btn-dark");
            animateLogin()
        }

        else if (registerPage.classList.contains("register-show")) {
            console.log("HAS REGISTER");
            registerButton.classList.toggle("btn-dark");
            animateRegister()
        }
    })


    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show")
            } else {
                entry.target.classList.remove("show")
            }
        })
    }) 

    const artsBoxes = document.querySelectorAll(".arts-box")
    artsBoxes.forEach((artBox) => observer.observe(artBox))

    selectArts.addEventListener("click", () => {
        console.log("clicked");
        martsDropdown.classList.toggle("marts-dropdown-active")
    })


    mArts.forEach((mart) => {
        console.log("MART: ", mart);
        mart.addEventListener("click", () => {
            const span = mart.querySelector(".m-art-span")
            span.classList.toggle("show-span")
        })
    })


    findBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            btn.classList.toggle("find-btn-active")
        })
    })




})