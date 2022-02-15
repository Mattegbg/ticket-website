// läsa in databasen / biblioteket
const nedb = require('nedb-promise');
const { hashPassword } = require('../utils/bcrypt');
//skapa en ny databas. Autoload true är för att den ska automatiskt uppdatera
const database = new nedb ({ filename: 'accounts.db', autoload: true });
//const database1 = new nedb ({ filename: 'tickets.db', autoload: true});

const menu = {
    "type": "event-menu", 
    "menu": [
        
        {
            "id":1,
            "artist":"ACDC",
            "date":"10 JAN",
            "time":"22.00",
            "price":"250 SEK",
            "place":"ULLEVI"  

        },
        {
            "id":2,
            "artist":"ABBA",
            "date":"25 AUG",
            "time":"21.00",
            "price":"300 SEK",
            "place":"HEDEN"
        },
        {
            "id":3,
            "artist":"AKON",
            "date":"1 JAN",
            "time":"18.00",
            "price":"260 SEK",
            "place":"PARTILLE ARENA"

        }
    ]
}

//find funktion för att söka efter användarnamn i databasen
async function getAccountByUsername(username){
    const account = await database.find({ username: username });
    return account;
}


//Skapa/spara konto i databasen (insert account i databasen)
function saveAccount(account) {
    database.insert(account);
}

//här lägger vi in eventet ovan i databasen
async function saveMenu(){
    const db = await database.find({});
    if (db == 0) database.insert(menu.menu);
    //database.insert(menu);
}

function saveTicket(ticket){
    database.insert(ticket);
    console.log(ticket);
}

async function getMenu(){
    const menu = await database.find({
        artist: {$exists: true}})
    return menu;
}

async function createAdmin(){
    const account = {username: "admin", password: await hashPassword("admin1")}
    saveAccount(account)
} 
//createAdmin();

//hämta ticket och skicka till server.js tex. 
async function getTicket(){
    let ticket = await database.find({}) //hämtar allt i databasen.
    console.log('getting tickets');
    return ticket;
    
}

async function getEvent(id){
   console.log(id); return await database.findOne({id:parseInt(id)})

}



//floor tar bort decimaltal. 
async function createTicket(id){
        const ticketNumber = Math.floor(Math.random()*10000) // skapa random siffra utan decimaltal
        const ticket = {ticket: await hashPassword(String(ticketNumber)), eventId: id } // hasha/kryptera lösenordet
        saveTicket(ticket) // spara i databasen
        return ticketNumber;  
     } 




//exportera våra funktion så vi importera dom i server.js 
module.exports = { getAccountByUsername, saveAccount, saveMenu, getMenu, saveTicket, createTicket, getTicket, getEvent}




