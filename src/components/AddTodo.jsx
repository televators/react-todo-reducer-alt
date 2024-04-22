import { useState, useContext } from "react";
import { v4 as uuidv4 } from 'uuid';
import TodoContext from "../todoContext";

const AddTodo = () => {
  const dispatch = useContext( TodoContext );
  const [task, setTask]   = useState('');
  const handleChangeInput = event => {
    setTask( event.target.value );
  };
  const handleSubmit = event => {
    if (task) {
      dispatch({
        type: 'ADD_TODO',
        task,
        id: uuidv4(),
      });
    }

    setTask('');

    event.preventDefault();
  };

  return (
    <section className="task-form__wrapper">
      <form className="task-form" onSubmit={handleSubmit}>
        <input className="task-form__input" type="text" value={task} onChange={handleChangeInput} />
        <button className="task-form__submit" type="submit">Add todo</button>
      </form>
    </section>
  );
};

export default AddTodo;
