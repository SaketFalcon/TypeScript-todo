import './style.css'

interface Todo{
    title:string;
    isCompleted: boolean;
    readonly id:string;
}
const todos: Todo[]=[];

const todosContainer= document.querySelector(".todoContainer") as HTMLDivElement;
const todoInput = document.getElementsByName("title")[0] as HTMLInputElement;
const myForm = document.getElementById("myForm") as HTMLFormElement;

myForm.onsubmit= (e:SubmitEvent)=>{
    e.preventDefault();
    const todo:Todo ={
        title:todoInput.value,
        isCompleted:false,
        id:String(Math.random()*1000),
    };
    todos.push(todo);
    todoInput.value="";
    renderTodo(todos);
};
const generateTodoItem = (title:string,isCompleted:boolean,id:string) => {
    const todo:HTMLDivElement=document.createElement("div");
    todo.className="todo";

    //creating a checkbox element
    const checkBox: HTMLInputElement=document.createElement("input");
    checkBox.setAttribute("type","checkBox");
    checkBox.className="isCompleyed";
    checkBox.checked=isCompleted;
    checkBox.onchange= ()=> {
        todos.find((item)=>{
            if (item.id===id) item.isCompleted=checkBox.checked;
        });
    
    paragraph.className=checkBox.checked ? "textCut" :"";
    }
    //creating p for title
    const paragraph:HTMLParagraphElement=document.createElement("p");
    paragraph.innerText=title;
    paragraph.className=isCompleted ? "textCut": "";

    //creating delete button item
    const btn:HTMLButtonElement=document.createElement("button");
    btn.innerText="Delete";
    btn.className="deleteBtn";
    btn.onclick= ()=> {
        deleteTodo(id);
    }

    //appending all to TodoItem

    todo.append(checkBox,paragraph,btn);
    todosContainer.append(todo);

};

const deleteTodo= (id:string) => {
    const idx = todos.findIndex((item)=> item.id===id);
    todos.splice(idx,1);
    renderTodo(todos);
}

const renderTodo= (todos: Todo[]) => {
    todosContainer.innerText="";
    todos.forEach( (item) => {
        generateTodoItem(item.title, item.isCompleted,item.id);
    });
}
