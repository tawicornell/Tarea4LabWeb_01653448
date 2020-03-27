


function storeTask() {
  let description = document.getElementById('taskDescription').value;
  let body = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ description: description })
  };
  fetch('/tasks', body)
    .then(response => {
      if(response.ok) {
        return response.json();
      } else {
        throw "Error en la llamada Ajax";
      }
    })
    .then(task => {
      document.getElementById('taskDescription').value = '';
      addTask(task);
    })
    .catch(error => {
      console.log('Error: ', error);
    })
}

function addTask(task) {
  let html =
  `
  <div id="${task.id}"  class="card my-3">
    <div class="card-body">
    
    <p style="display: none;">${task.id}</p>
      <p id="taskDesc-${task.id}" class="card-text">${task.description}</p>
      <a href="javascript:;" onclick="test2(${task.id});" class="card-link">Done</a>
            

      <a href="javascript:;" onclick="test3(${task.id});" class="card-link">Delete</a>
    </div>
  </div>
  `;
  let node = document.createRange().createContextualFragment(html);
  document.getElementById('tasksList').prepend(node);
}

function test2(id) {
  
console.log(id);

//parametro descripcion
let str = 'taskDesc-'+id;

console.log(str);

  let description = document.getElementById(str).textContent;
  
  //obtener el body del html
  let body = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    //pasarlo a json
    body: JSON.stringify({ description: description })
  };
console.log(description)

let route = '/tasks/'+id+'/done';


  //request de ajax tal cual
  fetch(route, body)
 

    .then(task => {
     // console.log("X");
      markDoneTask(description, id);
  })
  //catch de errores
    .catch(error => {
      console.log('Error: ', error);
    })
    
}

function markDoneTask(description, id){
  

  let html =
  `
        <div class="card-body">
          
          <p id="taskDesc-${id}" class="card-text">${description}</p>
          <a href="javascript:;" onclick="test3(${id});" class="card-link">Delete</a>
        </div>

  `;

  
let htmlId = ''+id;
document.getElementById(htmlId).className = "card my-3 bg-light";
document.getElementById(htmlId).innerHTML = html;



}

function test3(id) {
  
  console.log(id);
  
  //parametro descripcion
  let str = 'taskDesc-'+id;
  
  console.log(str);
  
    let description = document.getElementById(str).textContent;
    
    //obtener el body del html
    let body = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      //pasarlo a json
      body: JSON.stringify({ description: description })
    };
  console.log(description)
  
  let route = '/tasks/'+id+'/delete';
  
  
    //request de ajax tal cual
    fetch(route, body)
   
  
      .then(task => {
       // console.log("X");
        deleteHTML(description, id);
    })
    //catch de errores
      .catch(error => {
        console.log('Error: ', error);
      })
      
  }

  function deleteHTML(description, id){
  

    let html =
    ``;
  
    
  let htmlId = ''+id;
  document.getElementById(htmlId).style.display = "none";
  document.getElementById(htmlId).innerHTML = html;
  
  
  
  }