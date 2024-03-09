const Todo = ({ todo, toggleTodo }) => {
  function handleTodoClick() {
    toggleTodo(todo.id);
  }

  return (
    <div className="flex items-center p-1 w-40">
      <input
        type="checkbox"
        checked={todo.complete}
        onChange={handleTodoClick}
        className="mr-2 form-checkbox text-blue-500"
      />
      <label
        className={`cursor-pointer ${
          todo.complete ? 'line-through text-gray-500' : ''
        }`}
      >
        {todo.name}
      </label>
    </div>
  );
};


export default Todo;
