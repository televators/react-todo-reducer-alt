import TodoItem from "./TodoItem";

const TodoList = ( { todos } ) => {
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
