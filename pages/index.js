import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", todoCounter);
  return todo.getView();
};

const todoCounter = new TodoCounter(initialTodos, ".counter__text");


const section = new Section({
    items: initialTodos,
    renderer: (item) => {
        const todoElement = generateTodo(item);
        section.addItem(todoElement);
    },
    containerSelector: ".todos__list"
});

section.renderItems();


const handleAddTodoFormSubmit = (formData) => {
    const id = uuidv4();
    const date = new Date(formData.date);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const values = { ...formData, id, date };
    const todo = generateTodo(values);
    section.addItem(todo);
    todoCounter.updateTotal(true); 
    newTodoValidator.resetValidation();
};


const addTodoPopup = new PopupWithForm("#add-todo-popup", handleAddTodoFormSubmit);
addTodoPopup.setEventListeners();


const addTodoButton = document.querySelector(".button_action_add");
addTodoButton.addEventListener("click", () => {
    addTodoPopup.open();
});


const addTodoForm = document.querySelector("#add-todo-popup .popup__form");
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
