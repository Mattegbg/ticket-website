const inputElem = document.querySelector('#number');
const buttonElem = document.querySelector('#searchButton');


// hämta hem server från backend
async function getMenu() {
    const token = sessionStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/event/menu', { //kolla så endpoint är rätt
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = response.json();
    console.log(data);

}


// Nedan så verifierar vi användarnamnet med token. Blir de ej rätt så omdirigeras man till index.html
// det tar stopp vid nästa // nedan. 


async function isLoggedIn() {
    const token = sessionStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/loggedin', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();

    console.log(data);

    if (data.loggedIn == false) {
        window.location.href = 'http://localhost:5000/';
    }
}

async function getAccountInformation() {
    const token = sessionStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/account', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();

    console.log(data);
    emailElem.innerHTML = `E-post: ${data.email}`;

    if (data.role == 'admin') {
        getUserAccounts();
        showChangePassword();
    } else if (data.role == 'user') {
        showRemoveButton();
    }
}


/////

async function verify() {
    const ticketVerify = await fetch('http://localhost:5000/api/ticket', {
                method: 'GET',
            });
            const ticketData = await ticketVerify.json();
            console.log(ticketData); 
    const ticket = inputElem.value;
    const token = sessionStorage.getItem('token');
    let response = await fetch("/api/verify", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ticket: ticket,
        }),
    });
    const data = await response.json();
    console.log(data, 'data');

    console.log(data.used)

    if (data.success == true && data.used == false) {
     data.used = true;
     alert('Verified ticket!')
    }
    else {
        alert('did not match ticket!')
    }
}

buttonElem.addEventListener('click', () => {
    verify();
});


//funktioner som aktiverar vår kod på rad 24. 
isLoggedIn();
getAccountInformation();

 //getMenu();
