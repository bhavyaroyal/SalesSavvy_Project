async function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });

    const data = await response.json();

    if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Login Successful");
        window.location.href = "dashboard.html";
    } else {
        alert("Login Failed");
    }
}
