//TO DO ELEMENTS
const addToDo = document.querySelector('.add-to-do');
const toDoList = document.querySelector('.to-do-list');
const searchToDo = document.querySelector('.search-to-do');
const toDoItems = Array.from(toDoList.children);
//TODO ITEM TEMPLATE
const toDoTemp = (title, date) => {
    toDoList.innerHTML += `<li class="to-do-item d-flex justify-content-between shadow p-3 mb-2 rounded-3">
    <h6 class="title text-primary text-start align-self-center w-50">${title}</h6>
    <h6 class="date text-primary text-end align-self-center">${date}</h6>
    <i class="cross bi bi-x-square-fill text-primary ms-2 align-self-center"></i>
    </li>`
}; 

//SEARCH
searchToDo.addEventListener('keyup', (e) => {
    let search = e.target.value;    
    const toDoItems = document.querySelectorAll('.title');
    const arrItems = Array.from(toDoItems);
    arrItems.filter(item => {
       return !item.textContent.includes(search);
    })
    .forEach(item => {
        item.parentElement.classList.add('d-none')
    });
    arrItems.filter(item => {
        return item.textContent.includes(search);
    })
    .forEach(item => {
        item.parentElement.classList.remove('d-none');
    });
});

let counter = 0;
const arr = [];
//ADD TO DO & TO LOCAL STORAGE
addToDo.addEventListener('submit' , (e) => {
    e.preventDefault();
    const searchPattern = /([^\s])/;
    const datePattern = /^\d{2}\/\d{2}\/\d{2}$/;
    const search = addToDo.searchText.value;
    const date = addToDo.date.value;
    const formContainer = document.querySelector('.form-container');
    const formSearch = searchPattern.test(search);
    const formDate = datePattern.test(date);
    const regexFail = document.querySelector('.regex-fail');
    if(formSearch && formDate){
        addToDo.searchText.classList.remove('border-danger');
        addToDo.date.classList.remove('border-danger');
        formContainer.classList.add('mb-5');
        regexFail.innerHTML = '';
        toDoTemp(search, date)
        const todo = {
            title: search,
            date: date
        }
        const stringTodo = JSON.stringify(todo);
        localStorage.setItem(search, stringTodo);
        counter++;
        addToDo.reset();
    } else {
        addToDo.searchText.classList.add('border-danger');
        addToDo.date.classList.add('border-danger');
        formContainer.classList.remove('mb-5');
        regexFail.innerHTML = '<p class="regex-fail-comment text-center text-danger my-4">Please ensure both required fields are filled in correctly</p>';
    }
});

//CHECK FOR LOCAL STORAGE IF EXISTS POPULATE TO DO ITEMS
for (let i = 0; i < localStorage.length; i++) {
    arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    toDoTemp(arr[i].title, arr[i].date);    
}

//REMOVE TO DO + LOCAL STORAGE
toDoList.addEventListener('click', (e) =>{
    if(e.target.classList.contains('cross')){
        const key = e.target.previousElementSibling.previousElementSibling.textContent;
        localStorage.removeItem(localStorage.key(key));
        e.target.parentElement.remove();
        console.log(key);
        localStorage.removeItem(key);
    }
});

