


const handleSubmit = () => {
    const username = document.getElementById('username').value
    const password = document.getElementById('pass').value

    if(username === "admin" && password == "admin123") window.location.href = "home.html";
    else alert("wrong username or password, try again")
}