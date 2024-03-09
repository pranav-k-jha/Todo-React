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
    <div className="flex flex-col items-center mt-8 p-10 rounded shadow w-[500px] m-auto bg-slate-100">
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <div className="flex flex-col items-start w-100 mt-4">
        <input
          className="px-2 py-2 border rounded m-2 focus:outline-none"
          ref={todoNameRef}
          type="text"
          placeholder="Add todo..."
        />
        <button
          className="px-4 py-1 m-2  bg-slate-700 text-white rounded focus:outline-none"
          onClick={handleAddTodo}
        >
          Add Todo
        </button> 
        <button
          className="px-4 py-1 m-2 bg-blue-700 text-white focus:outline-none rounded"
          onClick={handleClearTodos}
        >
          Clear Complete
        </button>
      </div>
      <div className="mt-4 text-amber-600">
        {todos.filter((todo) => !todo.complete).length} left to do
      </div>
    </div>
  );
};

export default App;
