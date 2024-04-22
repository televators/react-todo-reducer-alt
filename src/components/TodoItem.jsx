import { useContext } from "react";
import TodoContext from "../todoContext";

const TodoItem = ( { todo } ) => {
  const dispatch = useContext( TodoContext );
  const handleChange = () => {
    dispatch( {
      type: todo.complete ? 'UNDO_TODO' : 'DO_TODO',
      id: todo.id,
    } );
  };

  return (
    <li className="task-list__item">
      <label className={ `task ${todo.complete ? 'task--complete' : ''}` }>
        <input
          className="task__checkbox"
          type="checkbox"
          checked={ todo.complete }
          onChange={ handleChange }
        />
        { todo.task }
      </label>
    </li>
  );
};

export default TodoItem;
