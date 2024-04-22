import { useReducer, createContext } from "react";
import { v4 as uuidv4 } from 'uuid';
import 'milligram';
import './App.css';
import TodoContext from "./todoContext";
import Filter from "./components/Filter";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";

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
    console.log( state );

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
          complete: false,
        });
      default:
        throw new Error();
    }
  };

  const [filter, dispatchFilter] = useReducer( filterReducer, 'ALL' );
  const [todos, dispatchTodos]   = useReducer( todoReducer, initialTodos );
  const filteredTodos = todos.filter( todo => {
    if ( filter === 'ALL' ) {
      return true;
    }

    if ( filter === 'COMPLETE' && todo.complete ) {
      return true;
    }

    if ( filter === 'INCOMPLETE' && !todo.complete ) {
      return true;
    }

    return false;
  } );

  return (
    <TodoContext.Provider value={ dispatchTodos }>
      <Filter dispatch={ dispatchFilter } />
      <TodoList todos={ filteredTodos } />
      <AddTodo />
    </TodoContext.Provider>
  );
}

export default App
