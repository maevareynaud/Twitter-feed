const socket = new WebSocket(`ws://${window.location.hostname}:${window.location.port}`)
      let inputVal

      //send message to server with the name of the celebrity choosen by the client
      function getInputValue(){
        inputVal = document.getElementById("celebrity_button").value;
        socket.send(inputVal)
      }

      socket.addEventListener("message", async function (event){
        try {
          let data = await event.data.text()
          data = JSON.parse(data)   

          //template of ranking with Mustache.js
          let template = "{{#items}}<div class='single-celebrity rank-{{name}}' data-count={{counter}}><span class='order'>{{@index}}</span><p><span class='counter'>{{counter}} </span><span>Tweets</span></p><h2>{{name}}{{^name}} Your favorite celebrity ! {{/name}}</h2></div>{{/items}}";
          let rendered = Mustache.render(template, data);
          document.getElementById('ranking').innerHTML = rendered;

          //Add celebrity of the client to front
          for (const [key, value, prop] of Object.entries(data['items'])) {
            if(value.type === "user"){
              const user_celebrity_name = document.getElementById('rank-user')
              user_celebrity_name.innerHTML = value.name
            } 
          }

        } catch(err){
            
        }
      })

      socket.addEventListener("open", function(event){
        console.log('socket open')
      })