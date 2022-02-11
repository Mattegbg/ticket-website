

const eventList = document.querySelector('#eventList');
            
        
        //skapar menyn/events som vi sen kan klicka på
         async function showMenu(menu){
             console.log(menu);
             for(i = 0; i < menu.length; i++){ // 0 = från start till hur lång listan är (menu.length)
                let event = menu[i]
                console.log(event);
                let li = document.createElement("li"); //skapa en osynligt innan vi lägger till den i HTML se nedan.
                
                li.innerHTML = `<span>${event.artist}</span> <span>${event.price} </span> <span>${event.date} </span> <span>${event.time} </span> <span>${event.place} </span>`;
                li.addEventListener("click", () => {  // skapar osynlig button
                    createTicket(event); // här skapar vi vår ticket
                })
                eventList.append(li); //skapar list i html i "UL"en. 

             }
         }

         async function createTicket(ticket) {  //här gör vi om "event" från rad 16 till "ticket" men det är samma sak.
            const response = await fetch('http://localhost:5000/api/createTicket', {
                method: 'POST',
                body: JSON.stringify(ticket),
                headers: {
                'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
                console.log(data);
                if (data) {window.location.href = 'http://localhost:5000/ticket.html' }
        
         }


        //hämta menyn / eventlistan 
         async function getMenu() {
            const response = await fetch('http://localhost:5000/api/getevent', {
                method: 'GET',
            });
            const data = await response.json();
            console.log(data);
        if (data){
            showMenu(data[0].menu)
        }
        }

        getMenu();