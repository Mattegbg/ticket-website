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


 getMenu();
