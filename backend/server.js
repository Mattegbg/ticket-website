const { request, response } = require('express');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');


//hämta den exporterade funktionen från Operations i database mappen. 
const { getAccountByUsername, saveAccount, saveMenu, getMenu, saveTicket, createTicket, getTicket, getEvent } = require('./database/operations');

//hämta/importera funktion (kryptera lösenord) från utils, bcrypt.js
const { hashPassword, comparePassword } = require('./utils/bcrypt');


app.use(express.static('../frontend'));
app.use(express.json());

saveMenu();

//saveMenu(); // spara våra events i databasen när servern startas

app.get('/api/ticket', async (request, response) => {
 const ticket = await getTicket();
 response.json(ticket);
})



app.post('/api/auth/create',  async (request, response) => {
  const credentials = request.body;
  //{username: 'ada', password: 'pwd123}
  const resObj = {
    success: true,
    usernameExists: false

  }
  //console.log(credentials);

  //här får vi tbx array. Antingen innehåller den konto eller inget. verifierar om användarnamet existerar eller ej. 
  const usernameExists = await getAccountByUsername(credentials.username);

  // Skapa user. Om den får tillbaka större än 0 är det namnet upptaget om ej se nedan.
  if(usernameExists.length > 0) {
    resObj.usernameExists = true;
    resObj.success = false;
  }

  //Skapa user. om användarnamn är ledigt från ovan (kryptera lösenord och spara? sa han på föreläsning)
  if (resObj.usernameExists == false) {
    const hashedPassword = await hashPassword(credentials.password); //skicka in lösenordet du valt (credentials) tbx får du krypterat lösenord.
    credentials.password = hashedPassword; // ditt lösenord blir nu det krypterade lösenordet ist.
    
    saveAccount(credentials);
  
  }
    
    response.json(resObj);

})


//hämtar ticket number från databasen och jämför med inskickat ticket för verifiering. 
app.post('/api/verify', async (request, response) => {
  const ticketNr = String(request.body.ticket); // exempel: {ticket: '1234' } ticket/biljett nummer
  const tickets = await getTicket(); //hämtas från operation.js via databasen. tickets är alla våra tickets i databasen. 

  console.log(ticketNr, 'ticket-number');

  for(i = 0; i < tickets.length; i++ ){ 

    if(tickets[i].ticket!=undefined){
      const match = await comparePassword(ticketNr, tickets[i].ticket ) 
    if(match == true){
      response.json({success: true })
      return;
    }
    }
    
   }

  response.json({success: false })
      

});



app.get('/api/createTicket/:id', async (request, response) => { // : = ändringsbar text / siffra. ta in information.
  const id = parseInt(request.params.id)
  console.log(id);
  const event = await getEvent(id);

  const ticket = await createTicket(id); //await = vänta in svar från async funtion som ger OK att fortsätta.

  response.json({ticket: ticket, event: event})
  
  // const event = request.body;
  // const eventId = event.eventId;
  // console.log(`event${eventId}`)
  // const ticket = await createTicket(eventId); //await = vänta in svar från async funtion som ger OK att fortsätta. 
  // console.log(event);
  
  // response.json(ticket)
})




app.get('/api/getevent', async (request, response) => {
  const menu = await getMenu();
  menu.sort((a, b) => a.id - b.id); 
  response.send(menu); 

})



//endpoint till loginsidan. 
app.post('/api/auth/login', async (request, response) => {
  const credentials = request.body;
 // { username: 'ada', password: 'pwd123'}

  const resObj = {
    success: false,
    token: ''
  }


  //verifiera om konto finns eller ej vid inloggning. Finns ej konto kommer en tom array tillbaka, ser ut så här: []
  const account = await getAccountByUsername(credentials.username);
  console.log(account);


  //inte tom array, om vi hittar konto (> 0 = större än noll, dvs det existerar). börja med att jämföra lösenordet i Bcrypt
  if (account.length > 0) {
    const correctPassword = await comparePassword(credentials.password, account[0].password);
    console.log(correctPassword);
    if (correctPassword) {
      resObj.success = true;

      //vår token blir krypterad med vårt användarnamn som kopplad token till en användare
      
      const token = jwt.sign({ username: account[0].username}, 'a1b1c1', {
        expiresIn: 600 //token (jwt) går ut om 10 min / 600 sekunder (värdet skrivs ut i sekunder)
      });


        
        resObj.token = token; //skickar/lägger in vår token till response objekt (resObj) ovan

    }
  }

  response.json(resObj); //skickas tillbaka här från resObj token ovan

})




//kanske lägga till en till endpoint än bara event. 
app.get('/api/event/menu', async (request, response) => { 
  const token = request.headers.authorization.replace('Bearer ', '');
console.log(request);
  const resObj = {
    success: false
    
  }

  try {
    const data = jwt.verify(token, 'a1b1c1');
    // const eventMenu = await getMenu();
    

    // resObj.menu = eventMenu;
    resObj.success = true;
  } 
  catch ( error) {
    resObj.errorMessage = 'Token invalid';
  }

  response.json(resObj);

}); 





//startar localhost server 5000
app.listen(5000, () => {
  console.log('server started on port 5000');
});







// const express = require("express");
// const jwt = require("jsonwebtoken");
// const {getMenu, saveMenu} = require("./database/ticketMenu");

// const app = express();


// app.use(express.static('view'));


// app.listen(3000, function () {
//     console.log("Server started on port 3000");
//   });