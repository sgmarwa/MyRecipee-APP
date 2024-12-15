function login() {
    document.getElementById("login").style.left = "4px";
    document.getElementById("register").style.right = "-520px";
}

function register() {
    document.getElementById("login").style.left = "-510px";
    document.getElementById("register").style.right = "5px";
}

// Handle login
document.getElementById('loginSubmit').addEventListener('click', async (event) => {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, pswd: password })
        });

        const result = await response.json();
        console.log(result);  // Ajouter un log ici

        if (response.status === 200) {
            alert(result.message);
            window.location.href = result.redirect_url;  // Redirection après connexion réussie
        } else {
            alert(result.error);
        }
    } catch (err) {
        alert("Error connecting to server: " + err.message);
    }
});



// Handle registration
document.getElementById('registerSubmit').addEventListener('click', async (event) => {
    event.preventDefault();
    const firstName = document.getElementById('registerFirstName').value;
    const lastName = document.getElementById('registerLastName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    const response = await fetch('http://127.0.0.1:5000/register', { 
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email: email,
            pswd: password
        })
    });

    const result = await response.json();
    if (response.status === 201) {
        alert(result.message);
        login();  // Switch to login form
    } else {
        alert(result.error);
    }
});