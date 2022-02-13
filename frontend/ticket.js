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
    artistElem.innerHTML = ticket.event.artist;
    dateElem.innerHTML = ticket.event.date;
    priceElem.innerHTML = ticket.event.price;
    timeElem.innerHTML = ticket.event.time;
    placeElem.innerHTML = ticket.event.place;
    numberElem.innerHTML = ticket.ticket;

}

async function createTicket() {  //här gör vi om "event" från rad 16 till "ticket" men det är samma sak.
    urlId = new URLSearchParams(window.location.search).get("id");
    const response = await fetch("http://localhost:5000/api/createTicket/" + urlId);

    // //const response = await fetch('http://localhost:5000/api/createTicket', {
    //     method: 'POST',
    //     body: JSON.stringify(ticket),
    //     headers: {
    //     'Content-Type': 'application/json'
    //     }
    // });
    const data = await response.json();
        console.log(data);
       if (data) {
           showTicket(data);
       }

 }


createTicket();









