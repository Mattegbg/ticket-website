const artistElem = document.querySelector('#artist'); 
const dateElem = document.querySelector('#date'); 
const priceElem = document.querySelector('#price'); 
const timeElem = document.querySelector('#time'); 
const placeElem = document.querySelector('#place'); 
const numberElem = document.querySelector('#ticketNumber'); 


//hämta hem klickad biljett från databasen
async function getTicket(){
    const response = await fetch('http://localhost:5000/api/ticket', {
                method: 'GET',
            });
            const data = await response.json();
            console.log(data);
        if (data){
            showTicket(data)
        }
}

//skriva ut det vi hämtade hem ovan vid getTicket, skicka till HTML.
async function showTicket(ticket){
    console.log(ticket);


}

getTicket();








