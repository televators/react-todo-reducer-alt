import { useState, useReducer } from "react";
import { v4 as uuidv4 } from 'uuid';
import 'milligram';
import './App.css';

const initialTodos = [
  {
    id: uuidv4(),
    task: 'Learn React',
    complete: true,
  },
  {
    id: uuidv4(),
    task: 'Learn Firebase',
    complete: true,
  },
  {
    id: uuidv4(),
    task: 'Learn GraphQL',
    complete: true,
  },
];

const App = () => {
  const filterReducer = (state, action) => {
    switch (action.type) {
      case 'SHOW_ALL':
        return 'ALL';
      case 'SHOW_COMPLETE':
        return 'COMPLETE';
      case 'SHOW_INCOMPLETE':
        return 'INCOMPLETE';
      default:
        throw new Error();
    }
  };
  const todoReducer = (state, action) => {
    switch (action.type) {
      case 'DO_TODO':
        return state.map(todo => {
          if (todo.id === action.id) {
            return {...todo, complete: true};
          } else {
            return todo;
          }
        });
      case 'UNDO_TODO':
        return state.map(todo => {
          if (todo.id === action.id) {
            return {...todo, complete: false};
          } else {
            return todo;
          }
        });
      case 'ADD_TODO':
        return state.concat({
          task: action.task,
          id: action.id,
          complete: task,
        });
      default:
        throw new Error();
    }
  };
  const [task, setTask]          = useState('');
  const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL');
  const [todos, dispatchTodos]   = useReducer(todoReducer, initialTodos);
  const filteredTodos = todos.filter(todo => {
    if (filter === 'ALL') {
      return true;
    }

    if (filter === 'COMPLETE' && todo.complete) {
      return true;
    }

    if (filter === 'INCOMPLETE' && !todo.complete) {
      return true;
    }

    return false;
  });

  const handleChangeInput = event => {
    setTask( event.target.value );
  };
  const handleSubmit = event => {
    if (task) {
      dispatchTodos({
        type: 'ADD_TODO',
        task,
        id: uuidv4(),
      });
    }

    setTask('');

    event.preventDefault();
  };
  const handleChangeCheckbox = todo => {
    dispatchTodos({
      type: todo.complete ? 'UNDO_TODO' : 'DO_TODO',
      id: todo.id,
    });
  };

  const handleShowAll = () => {
    dispatchFilter({type: 'SHOW_ALL'});
  };
  const handleShowComplete = () => {
    dispatchFilter({type: 'SHOW_COMPLETE'});
  };
  const handleShowIncomplete = () => {
    dispatchFilter({type: 'SHOW_INCOMPLETE'});
  };

  return (
    <>
      <section className="task-form__wrapper">
        <form className="task-form" onSubmit={handleSubmit}>
          <input className="task-form__input" type="text" value={task} onChange={handleChangeInput} />
          <button className="task-form__submit" type="submit">Add todo</button>
        </form>
      </section>

      <section className="task-filter">
        <button className="task-filter__button" type="button" onClick={handleShowAll}>Show all</button>
        <button className="task-filter__button" type="button" onClick={handleShowComplete}>Show complete</button>
        <button className="task-filter__button" type="button" onClick={handleShowIncomplete}>Show incomplete</button>
      </section>

      <section className="task-list__wrapper">
        <ul className="task-list">
          { filteredTodos.map( todo => (
            <li key={ todo.id } className="task-list__item">
              <label className={`task ${todo.complete ? 'task--complete' : ''}`}>
                <input
                  className="task__checkbox"
                  type="checkbox"
                  checked={todo.complete}
                  onChange={() => handleChangeCheckbox(todo)}
                />
                { todo.task }
              </label>
            </li>
          ) ) }
        </ul>
      </section>
    </>
  );
}

export default App
