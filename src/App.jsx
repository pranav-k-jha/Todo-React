import { useRef, useState, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "todoApp.todos";

const App = () => {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") {
      return;
    }
    setTodos((prevTodos) => {
      const newTodo = { id: uuidv4(), name: name, complete: false };
      return [...prevTodos, newTodo];
    });
    todoNameRef.current.value = null;
  }
  function handleClearTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <div className="max-w-screen-lg mx-auto mt-8 p-6 sm:p-10 rounded shadow">
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <div className="flex flex-col sm:flex-row items-center mt-4">
        <input
          className="flex-1 px-4 py-2 border rounded mb-2 sm:mr-2 sm:mb-0 focus:outline-none"
          ref={todoNameRef}
          type="text"
          placeholder="Add todo..."
        />
        <button
          className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded-full focus:outline-none"
          onClick={handleAddTodo}
        >
          Add Todo
        </button>
        <button
          className="w-full sm:w-auto mt-2 sm:mt-0 ml-0 sm:ml-2 px-4 py-2 bg-red-500 text-white focus:outline-none rounded-full"
          onClick={handleClearTodos}
        >
          Clear Complete
        </button>
      </div>
      <div className="mt-4 text-amber-500">
        {todos.filter((todo) => !todo.complete).length} left to do
      </div>
    </div>
  );
};

export default App;
