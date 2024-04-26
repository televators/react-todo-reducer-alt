import { useReducer } from "react";
import { v4 as uuidv4 } from 'uuid';
import 'milligram';
import './App.css';
import DispatchContext from "./DispatchContext";
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
        return state;
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
          complete: false,
        });
      default:
        return state;
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

  const dispatch = action => {
    [dispatchTodos, dispatchFilter].forEach( fn => fn( action ) );
  };

  return (
    <DispatchContext.Provider value={ dispatch }>
      <Filter/>
      <TodoList todos={ filteredTodos } />
      <AddTodo />
    </DispatchContext.Provider>
  );
}

export default App
