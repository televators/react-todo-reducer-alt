import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

// NOTE: This is the first version with just useState.

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
  const [todos, setTodos] = useState(initialTodos);
  const [task, setTask] = useState('');
  const handleChangeInput = event => {
    setTask( event.target.value );
  };

  const handleSubmit = event => {
    if (task) {
      setTodos(todos.concat({id: uuidv4(), task, complete: false}));
    }

    setTask('');

    event.preventDefault();
  };

  const handleChangeCheckbox = id => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return {...todo, complete: !todo.complete};
        } else {
          return todo;
        }
      })
    );
  };

  return (
    <section>
      <ul>
        { todos.map( todo => (
          <li key={ todo.id }>
            <label>
              <input
                type="checkbox"
                checked={todo.complete}
                onChange={() => handleChangeCheckbox(todo.id)}
              />
              { todo.task }
            </label>
          </li>
        ) ) }
      </ul>

      <form onSubmit={handleSubmit}>
        <input type="text" value={task} onChange={handleChangeInput} />
        <button type="submit">Add todo</button>
      </form>
    </section>
  );
}

export default App
