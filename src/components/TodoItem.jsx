const TodoItem = ( { dispatch, todo } ) => {
  const handleChange = todo => {
    dispatch({
      type: todo.complete ? 'UNDO_TODO' : 'DO_TODO',
      id: todo.id,
    });
  };

  return (
    <li className="task-list__item">
      <label className={`task ${todo.complete ? 'task--complete' : ''}`}>
        <input
          className="task__checkbox"
          type="checkbox"
          checked={todo.complete}
          onChange={() => handleChange(todo)}
        />
        { todo.task }
      </label>
    </li>
  );
};

export default TodoItem;