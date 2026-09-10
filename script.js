/* =========================
       MOBILE MENU
    ========================== */

    const sidebar =
        document.getElementById("sidebar");

    const menuButton =
        document.getElementById("menuButton");

    menuButton.addEventListener("click", function() {

        sidebar.classList.toggle("open");

    });



    /* =========================
       DARK MODE
    ========================== */

    const themeButton =
        document.getElementById("themeButton");

    themeButton.addEventListener("click", function() {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {

            localStorage.setItem("theme", "dark");

            showToast("Dark mode enabled");

        } else {

            localStorage.setItem("theme", "light");

            showToast("Light mode enabled");

        }

    });


    if (localStorage.getItem("theme") === "dark") {

        document.body.classList.add("dark");

    }



    /* =========================
       MODAL
    ========================== */

    const modal =
        document.getElementById("modal");

    function openModal(title, text) {

        document.getElementById("modalTitle")
            .textContent = title;

        document.getElementById("modalText")
            .innerHTML = text;

        modal.classList.add("show");

    }


    function closeModal() {

        modal.classList.remove("show");

    }


    modal.addEventListener("click", function(event) {

        if (event.target === modal) {

            closeModal();

        }

    });



    /* =========================
       TOAST MESSAGE
    ========================== */

    const toast =
        document.getElementById("toast");

    function showToast(message) {

        toast.textContent = message;

        toast.classList.add("show");

        clearTimeout(window.toastTimer);

        window.toastTimer = setTimeout(function() {

            toast.classList.remove("show");

        }, 2500);

    }



    /* =========================
       SEARCH / FILTER
    ========================== */

    const searchInput =
        document.getElementById("searchInput");

    searchInput.addEventListener("input", function() {

        const query =
            this.value.toLowerCase().trim();


        const items =
            document.querySelectorAll("[data-search]");


        items.forEach(function(item) {

            const searchableText =
                item.dataset.search.toLowerCase();


            if (
                query === "" ||
                searchableText.includes(query)
            ) {

                item.style.display = "";

            } else {

                item.style.display = "none";

            }

        });

    });



    /* =========================
       ESCAPE KEY
    ========================== */

    document.addEventListener("keydown", function(event) {

        if (event.key === "Escape") {

            closeModal();

        }

    });



    /* =========================
       PAGE NAVIGATION
    ========================== */

    const pages =
        document.querySelectorAll(".page");

    function showPage(pageId) {

        pages.forEach(function(page) {

            page.style.display =
                (page.id === pageId) ? "" : "none";

        });

    }


    document.querySelectorAll(".menu a")
        .forEach(function(link) {

            link.addEventListener("click", function(event) {

                const pageId =
                    this.dataset.page;


                if (pageId) {

                    event.preventDefault();


                    showPage(pageId);


                    document.querySelectorAll(".menu a")
                        .forEach(function(item) {

                            item.classList.remove("active");

                        });


                    this.classList.add("active");


                    window.scrollTo(0, 0);

                }


                sidebar.classList.remove("open");

            });

        });


    const helpLink =
        document.querySelector('.sidebar-bottom a[href="#contact"]');

    if (helpLink) {

        helpLink.addEventListener("click", function(event) {

            event.preventDefault();


            showPage("dashboard");


            document.querySelectorAll(".menu a")
                .forEach(function(item) {

                    item.classList.remove("active");

                });


            document.querySelector('.menu a[data-page="dashboard"]')
                .classList.add("active");


            document.getElementById("contact")
                .scrollIntoView({ behavior: "smooth" });


            sidebar.classList.remove("open");

        });

    }

/* =========================
   SESSION (no backend - demo only)
========================== */

function setCurrentUser(user) {

    localStorage.setItem(
        "uc_currentUser",
        JSON.stringify({ name: user.name, email: user.email })
    );

}

function getCurrentUser() {

    const raw = localStorage.getItem("uc_currentUser");

    return raw ? JSON.parse(raw) : null;

}

function clearCurrentUser() {

    localStorage.removeItem("uc_currentUser");

}



/* =========================
   PROFILE DROPDOWN
========================== */

const userMenuButton =
    document.getElementById("userMenuButton");

const userDropdown =
    document.getElementById("userDropdown");


function closeUserDropdown() {

    userDropdown.classList.remove("show");

}


userMenuButton.addEventListener("click", function(event) {

    event.stopPropagation();

    userDropdown.classList.toggle("show");

});


document.addEventListener("click", function(event) {

    if (
        !userDropdown.contains(event.target) &&
        !userMenuButton.contains(event.target)
    ) {

        closeUserDropdown();

    }

});


function handleProfileClick() {

    closeUserDropdown();

    const user = getCurrentUser();

    openModal(
        "Profile",
        "Name: " + (user ? user.name : "") +
        "<br>Email: " + (user ? user.email : "")
    );

}


function handleLogout() {

    closeUserDropdown();

    clearCurrentUser();

    showHome();

    showToast("You have been logged out");

}



/* =========================
   HOME <-> DASHBOARD SWITCH
========================== */

const homePage =
    document.getElementById("homePage");

const appContainer =
    document.getElementById("appContainer");


function showHome() {

    homePage.style.display = "";

    appContainer.style.display = "none";

    closeUserDropdown();

}


function showDashboard(user) {

    homePage.style.display = "none";

    appContainer.style.display = "";


    if (user) {

        const initials =
            user.name
                .trim()
                .split(/\s+/)
                .filter(Boolean)
                .map(function(part) {
                    return part[0];
                })
                .slice(0, 2)
                .join("")
                .toUpperCase();

        document.getElementById("userAvatar").textContent =
            initials || "ST";

        document.getElementById("userName").textContent =
            user.name;

    }


    showPage("dashboard");

    document.querySelectorAll(".menu a")
        .forEach(function(item) {

            item.classList.remove("active");

        });

    document.querySelector('.menu a[data-page="dashboard"]')
        .classList.add("active");

}


(function initSession() {

    showHome();

})();



/* =========================
   AUTH MODALS
========================== */

const loginModal =
    document.getElementById("loginModal");

const signupModal =
    document.getElementById("signupModal");


function openAuthModal(modalEl) {

    modalEl.classList.add("show");

}


function closeAuthModal(id) {

    document.getElementById(id).classList.remove("show");

}


[loginModal, signupModal].forEach(function(modalEl) {

    modalEl.addEventListener("click", function(event) {

        if (event.target === modalEl) {

            modalEl.classList.remove("show");

        }

    });

});


document.getElementById("homeGetStartedButton")
    .addEventListener("click", function() {
        openAuthModal(signupModal);
    });

document.getElementById("heroGetStartedButton")
    .addEventListener("click", function() {
        openAuthModal(signupModal);
    });

document.getElementById("homeLoginButton")
    .addEventListener("click", function() {
        openAuthModal(loginModal);
    });

document.getElementById("heroLoginButton")
    .addEventListener("click", function() {
        openAuthModal(loginModal);
    });


document.getElementById("switchToSignup")
    .addEventListener("click", function(event) {

        event.preventDefault();

        closeAuthModal("loginModal");

        openAuthModal(signupModal);

    });


document.getElementById("switchToLogin")
    .addEventListener("click", function(event) {

        event.preventDefault();

        closeAuthModal("signupModal");

        openAuthModal(loginModal);

    });



/* SIGN UP - POST to register.php */

const signupFormEl = document.getElementById("signupForm");
if (signupFormEl) {
    signupFormEl.addEventListener("submit", function(event) {

        event.preventDefault();

        const fullname =
            document.getElementById("signupName").value.trim();

        const email =
            document.getElementById("signupEmail").value.trim();

        const username =
            email.split("@")[0]; // use email prefix as username

        const password =
            document.getElementById("signupPassword").value;

        const confirmPassword =
            document.getElementById("signupConfirmPassword").value;


        if (password !== confirmPassword) {

            showToast("Passwords do not match");

            return;

        }

        if (password.length < 6) {

            showToast("Password must be at least 6 characters");

            return;

        }

        // POST to register.php
        const formData = new FormData();
        formData.append("fullname", fullname);
        formData.append("email", email);
        formData.append("username", username);
        formData.append("password", password);

        fetch("register.php", {
            method: "POST",
            body: formData
        })
            .then(r => r.json())
            .then(resp => {
                if (resp.success) {
                    // Show success modal with login button
                    closeAuthModal("signupModal");
                    showToast("Account created successfully!");
                    signupFormEl.reset();
                    openModal(
                        "Registration Successful",
                        "<p>Your account has been created.</p><br><button class='primary-button' onclick='closeModal(); openAuthModal(document.getElementById(\"loginModal\"))'>Login Now</button>"
                    );
                } else {
                    showToast(resp.message || "Error creating account");
                }
            })
            .catch(err => {
                showToast("Network error. Please try again.");
            });

    });
}



/* LOGIN - POST to login.php */

const loginFormEl = document.getElementById("loginForm");
if (loginFormEl) {
    loginFormEl.addEventListener("submit", function(event) {

        event.preventDefault();

        const username =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        if (!username || !password) {

            showToast("Please enter your username and password");

            return;

        }

        // POST to login.php
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        fetch("login.php", {
            method: "POST",
            body: formData
        })
            .then(r => r.json())
            .then(resp => {
                if (resp.success) {
                    const user = { name: resp.user.name, email: resp.user.email };
                    setCurrentUser(user);
                    loginFormEl.reset();
                    closeAuthModal("loginModal");
                    showToast("Login successful!");
                    showDashboard(user);
                } else {
                    showToast(resp.message || "Invalid username or password");
                }
            })
            .catch(err => {
                showToast("Network error. Please try again.");
            });

    });
}


/* =========================
   LECTURE LOGIN SYSTEM
========================== */

function setCurrentLecture(lecture) {
    localStorage.setItem(
        "uc_currentLecture",
        JSON.stringify({ id: lecture.id, name: lecture.name, email: lecture.email })
    );
}

function getCurrentLecture() {
    const raw = localStorage.getItem("uc_currentLecture");
    return raw ? JSON.parse(raw) : null;
}

function clearCurrentLecture() {
    localStorage.removeItem("uc_currentLecture");
    localStorage.removeItem("uc_lectureCourses");
}

function showLectureDashboard(lecture) {
    homePage.style.display = "none";
    appContainer.style.display = "";

    document.getElementById("lectureNameDisplay").textContent = lecture.name;

    showPage("lectureDashboard");

    document.querySelectorAll(".menu a").forEach(function(item) {
        item.classList.remove("active");
    });

    loadLectureCourses();
}

// Lecture Login Button Handlers
document.getElementById("homeLectureLoginButton")
    .addEventListener("click", function() {
        openAuthModal(document.getElementById("lectureLoginModal"));
    });

// Lecture Login Form Handler
const lectureLoginFormEl = document.getElementById("lectureLoginForm");
if (lectureLoginFormEl) {
    lectureLoginFormEl.addEventListener("submit", function(event) {

        event.preventDefault();

        const email =
            document.getElementById("lectureEmail").value.trim();

        const password =
            document.getElementById("lecturePassword").value;

        if (!email || !password) {
            showToast("Please enter your email and password");
            return;
        }

        // POST to lecture_login.php
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        fetch("lecture_login.php", {
            method: "POST",
            body: formData
        })
            .then(r => r.json())
            .then(resp => {
                if (resp.success) {
                    const lecture = { id: resp.lecture.id, name: resp.lecture.name, email: resp.lecture.email };
                    setCurrentLecture(lecture);
                    lectureLoginFormEl.reset();
                    closeAuthModal("lectureLoginModal");
                    showToast("Login successful!");
                    showLectureDashboard(lecture);
                } else {
                    showToast(resp.message || "Invalid email or password");
                }
            })
            .catch(err => {
                showToast("Network error. Please try again.");
            });

    });
}

// Add Course Modal
function openCourseModal() {
    openModal(
        "Add New Course",
        "<form id='courseForm'><label class='field'><span>Course Code</span><input type='text' id='courseCode' placeholder='e.g., IIC 2223' required /></label><label class='field'><span>Course Name</span><input type='text' id='courseName' placeholder='e.g., Web Development' required /></label><label class='field'><span>Time</span><input type='text' id='courseTime' placeholder='e.g., Monday 10:00 AM' required /></label><button type='button' class='primary-button' onclick='saveCourse()'>Add Course</button></form>"
    );
}

// Save Course to localStorage
function saveCourse() {
    const code = document.getElementById("courseCode").value.trim();
    const name = document.getElementById("courseName").value.trim();
    const time = document.getElementById("courseTime").value.trim();

    if (!code || !name || !time) {
        showToast("Please fill all fields");
        return;
    }

    let courses = JSON.parse(localStorage.getItem("uc_lectureCourses")) || [];
    
    const course = {
        id: courses.length + 1,
        code: code,
        name: name,
        time: time,
        progress: 0
    };

    courses.push(course);
    localStorage.setItem("uc_lectureCourses", JSON.stringify(courses));

    closeModal();
    showToast("Course added successfully!");
    loadLectureCourses();
}

// Load and Display Lecture Courses
function loadLectureCourses() {
    const courses = JSON.parse(localStorage.getItem("uc_lectureCourses")) || [];
    const container = document.getElementById("lectureCoursesContainer");

    if (courses.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #748096; padding: 40px 20px;">No courses yet. Click "Add Course" to create your first course.</p>';
        return;
    }

    let html = '';
    courses.forEach(function(course) {
        html += `
            <div class="course" style="display: flex; justify-content: space-between; align-items: center; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 12px;">
                <div class="course-code" style="min-width: 60px;">
                    ${course.code.split(' ')[0]}<br>
                    ${course.code.split(' ')[1] || ''}
                </div>
                <div class="course-info" style="flex: 1; margin-left: 20px;">
                    <h3 style="margin: 0; font-size: 18px; color: #1f2937;">${course.name}</h3>
                    <p style="margin: 5px 0; color: #748096; font-size: 14px;">${course.time}</p>
                </div>
                <button onclick="deleteCourse(${course.id})" style="padding: 8px 16px; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">
                    <i class="fa-solid fa-trash"></i> Delete
                </button>
            </div>
        `;
    });

    container.innerHTML = html;
}

// Delete Course
function deleteCourse(courseId) {
    if (confirm("Are you sure you want to delete this course?")) {
        let courses = JSON.parse(localStorage.getItem("uc_lectureCourses")) || [];
        courses = courses.filter(c => c.id !== courseId);
        localStorage.setItem("uc_lectureCourses", JSON.stringify(courses));
        showToast("Course deleted successfully!");
        loadLectureCourses();
    }
}

// Lecture Logout (from dropdown menu)
function handleLectureLogout() {
    closeUserDropdown();
    clearCurrentLecture();
    showHome();
    showToast("You have been logged out");
}

