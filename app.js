const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all event listeners
loadEventListener();

//load event listeners
function loadEventListener(){
    //add task events
  form.addEventListener('submit',addTask);
    //remove task event
  taskList.addEventListener('click',removeTask);  
    //filter task event
  filter.addEventListener('keyup',filterTasks);
    //clear task event
  clearBtn.addEventListener('click',clearTasks);
   // DOM Loading event
  document.addEventListener('DOMContentLoaded',getTasks); 

}

//gettasks from local storage
function getTasks(){
  let tasks;
  if (localStorage.getItem('tasks') == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task) {
    //create li element
  const li = document.createElement('li');
  //add class
  li.className= 'collection-item';
  //create text node and append to li
  li.appendChild(document.createTextNode(task));
  //create new link element
  const link = document.createElement('a');
  //add class
  link.className = 'delete-item secondary-content';
  //add icon html
  link.innerHTML= '<i class="fa fa-remove"></i>';
  //append the link to li
  li.appendChild(link);
  //append li to task list
  taskList.appendChild(li);
  });


}



function addTask(e){
  if (taskInput.value=='') {
    alert('Add a task');
  }

  //create li element
  const li = document.createElement('li');
  //add class
  li.className= 'collection-item';
  //create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //create new link element
  const link = document.createElement('a');
  //add class
  link.className = 'delete-item secondary-content';
  //add icon html
  link.innerHTML= '<i class="fa fa-remove"></i>';
  //append the link to li
  li.appendChild(link);
  //append li to task list
  taskList.appendChild(li);

  //store to local storage
  storeTaskLocalStorage(taskInput.value);

  //clear input
  taskInput.value='';

  e.preventDefault();

}

//store task
function storeTaskLocalStorage(task){
  let tasks;
  if (localStorage.getItem('tasks') == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks',JSON.stringify(tasks));

}

function removeTask(e) {
  
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure!')) {
      e.target.parentElement.parentElement.remove();

      //remove from local storage
      removeTasksFromLS(e.target.parentElement.parentElement);
    }
  }
}

//remove from local storage
function removeTasksFromLS(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task , index) {
    if (taskItem.textContent === task) {
      tasks.splice(index,1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks(e) {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  //clear tasks from local storage
  clearTasksFromLS();

}

//Clear tasks from local storage
function clearTasksFromLS() {
  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  
  
  document.querySelectorAll('.collection-item').forEach
  (function (task) {
    const item = task.firstChild.textContent;
    //console.log('Hello');
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
      
    } else {
      task.style.display = 'none';
      console.log(item);
    }
    
  });

  //console.log(text);
  
}



