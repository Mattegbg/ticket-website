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

    async function verify(){
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
            console.log(data);
            if(data.success == true){
                alert('Verified ticket!')
            }
            else{
                alert('did not match ticket!')
            }
    }

    buttonElem.addEventListener('click', () => {
        verify();
    });


 //getMenu();
