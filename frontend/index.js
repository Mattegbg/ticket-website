

const eventList = document.querySelector('#eventList');
            
        
        //skapar menyn/events som vi sen kan klicka på
         async function showMenu(menu){
             console.log(menu);
             for(i = 0; i < menu.length; i++){ // 0 = från start till hur lång listan är (menu.length)
                let event = menu[i]
                console.log(event);
                let li = document.createElement("li"); //skapa en osynligt innan vi lägger till den i HTML se nedan.

                li.classList.add('menu-item'); // Sätter en css-klass på min li-tagg som är definerad i css
                
                li.innerHTML = `<span class="artist">${event.artist}</span> <span class="price">${event.price} </span> <span class="date">${event.date} </span> <span class="time">${event.time} </span> <span class="place">${event.place} </span>`;
                li.addEventListener("click", () => {  // skapar osynlig button
                    createTicket(event); // här skapar vi vår ticket
                })
                eventList.append(li); //skapar list i html i "UL"en. 
                
            }
            
         }


//<span id="event1"></span> // hur man skapar class till Li i JS ovan.

         async function createTicket(event){

              window.location.href = `http://localhost:5000/ticket.html?id=${event.id}` 


         }

        //  async function createTicket(ticket) {  //här gör vi om "event" från rad 16 till "ticket" men det är samma sak.
        //     const response = await fetch('http://localhost:5000/api/createTicket', {
        //         method: 'POST',
        //         body: JSON.stringify(ticket),
        //         headers: {
        //         'Content-Type': 'application/json'
        //         }
        //     });
        //     const data = await response.json();
        //         console.log(data);
        //         if (data) {window.location.href = 'http://localhost:5000/ticket.html' }
        
        //  }


        //hämta menyn / eventlistan 
         async function getMenu() {
            const response = await fetch('http://localhost:5000/api/getevent', {
                method: 'GET',
            });
            const data = await response.json();
            console.log(data);
        if (data){
            showMenu(data)
        }
        }

        getMenu();