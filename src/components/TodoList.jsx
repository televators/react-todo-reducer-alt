import TodoItem from "./TodoItem";

const TodoList = ( { dispatch, todos } ) => {

  return (
    <section className="task-list__wrapper">
      <ul className="task-list">
        { todos.map( todo => (
          <TodoItem key={ todo.id } dispatch={ dispatch } todo={ todo } />
        ) ) }
      </ul>
    </section>
  );
};

export default TodoList;
