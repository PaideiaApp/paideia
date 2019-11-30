let profile = document.getElementById("profile");
let authBlock = document.getElementById("auth");
let authButtons = document.getElementById("authButtons");
let messageBlock = document.getElementById("message");
let registerBlock = document.getElementById("register");
let regButtons = document.getElementById("regButtons");
let authToken = localStorage.getItem('token');
let userData = JSON.parse(localStorage.getItem('userData'));

if (authToken !== null) {
    console.log(authToken);
    if (userData !== null) {
        runProfile();
        //   console.log("logged in");
    }
} else {
    //  profile.style.display = "none";
}

// var servingDomain = "http://localhost:3000";
var servingDomain = "https://api.paideia.space";
// var servingDomain = "http://192.168.0.102:3000";
const xhr = new XMLHttpRequest();


function auth() {
    let email = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;
    let params = 'email=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(pass);

    let url = servingDomain + '/api/auth/login';

    xhr.open("POST", url);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.send(params);

    xhr.onreadystatechange = (e) => {
        if (xhr.readyState == 4) {
            let data = JSON.parse(xhr.responseText);
            if (data["response"]["token"] !== undefined) {
                localStorage.setItem('token', data["response"]["token"]);
                getUserData(data["response"]["token"]);
            } else {
                showMessage(data["response"]["message"]);
            }
        }
    }
}


function authAfterR(email, pass) {
    let params = 'email=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(pass);

    let url = servingDomain + '/api/auth/login';

    xhr.open("POST", url);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.send(params);

    xhr.onreadystatechange = (e) => {
        if (xhr.readyState == 4) {
            let data = JSON.parse(xhr.responseText);
            if (data["response"]["token"] !== undefined) {
                localStorage.setItem('token', data["response"]["token"]);
                getUserData(data["response"]["token"]);
            } else {
                showMessage(data["response"]["message"]);
            }
        }
    }
}



function getUserData(token) {
    let url = servingDomain + '/api/auth/user';

    xhr.open("POST", url);
    xhr.setRequestHeader('Authorization', 'Bearer ' + token)

    xhr.send();

    xhr.onreadystatechange = (e) => {
        if (xhr.readyState == 4) {
            console.log(xhr.responseText);
            if (xhr.responseText !== "Forbidden") {
                localStorage.setItem('userData', xhr.responseText);
                window.location.href = "/dashboard";
                runProfile();
            }
        }
    }
}

function runProfile() {
    let userData = JSON.parse(localStorage.getItem('userData'))
    //     authBlock.style.display = "none";
    //    registerBlock.style.display = "none";
    //     authButtons.innerHTML = ` <a href="/dashboard"><button class="auth">Dashboard</button></a>`;
    //     profile.style.display = "block";
    //     console.log(userData);
    //     document.getElementById("userDataBlock").innerHTML = userData["response"][0]["name"];
    if (window.location.pathname == "/" || window.location.pathname == "/en/") {
        regButtons.innerHTML = `
        <a href="/dashboard" class="login">
        Dashboard
        <img src="/assets/front/img/arrow-right-blue.svg" style="display: -webkit-inline-box; width: 15px; margin-left: 4px;" alt="">
        </a>
        `;
    }
    if (window.location.pathname == "/auth") {
        window.location.href = "/dashboard";
    }
}

function logOut() {
    localStorage.clear();
    // localStorage.removeItem('token');
    // localStorage.removeItem('userData');
    window.location.reload();
}




function register() {
    let name = document.getElementById("nameR").value;
    let email = document.getElementById("emailR").value;
    let pass = document.getElementById("passR").value;
    let params = 'name=' + encodeURIComponent(name) + '&email=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(pass);

    let url = servingDomain + '/api/auth/register';

    xhr.open("POST", url);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.send(params);

    xhr.onreadystatechange = (e) => {
        if (xhr.readyState == 4) {
            let data = JSON.parse(xhr.responseText);
            showMessage(data["message"]);
        }
    }
}


$("#registration").submit(function (e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this);
    var url = form.attr('action');

    let recaptcha = document.getElementById("g-recaptcha-response").value;
    console.log(recaptcha);

    $.ajax({
        type: "POST",
        url: servingDomain + url,
        data: form.serialize(), // serializes the form's elements.
        success: function (data) {
            console.log(data);
            let code = data["code"];
            code = parseInt(code);

            if (code == 100) {
                //  alert("Ваш аккаунт успешно создан! Пожалуйста авторизируйтесь!");
                Swal.fire({ title: "Ваш аккаунт успешно создан!", text: "Нажмите ок, чтобы продолжить", type: "success" }).then((result) => {
                    //   window.location.reload();
                    let emailR = document.getElementById("emailR").value;
                    let passR = document.getElementById("passR").value;
                    authAfterR(emailR, passR);
                });
            } else {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: data["message"],
                })
                // alert(data["message"]);

                grecaptcha.reset();
            }
        }
    });


});


function showMessage(msg) {
    message.innerHTML = msg;
    message.style.display = "block";
    setTimeout('message.style.display = "none";', 6000);
}