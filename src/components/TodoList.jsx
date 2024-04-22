import { useContext } from "react";
import TodoItem from "./TodoItem";
import TodoContext from "../todoContext";

const TodoList = ( { todos } ) => {
  const dispatch = useContext( TodoContext );

  return (
    <section className="task-list__wrapper">
      <ul className="task-list">
        { todos.map( todo => (
          <TodoItem key={ todo.id } todo={ todo } />
        ) ) }
      </ul>
    </section>
  );
};

export default TodoList;
