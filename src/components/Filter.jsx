import { useContext } from "react";
import DispatchContext from "../DispatchContext";

const Filter = () => {
  const dispatch = useContext( DispatchContext );
  const handleShowAll = () => {
    dispatch({type: 'SHOW_ALL'});
  };
  const handleShowComplete = () => {
    dispatch({type: 'SHOW_COMPLETE'});
  };
  const handleShowIncomplete = () => {
    dispatch({type: 'SHOW_INCOMPLETE'});
  };

  return (
    <section className="task-filter">
      <button className="task-filter__button" type="button" onClick={ handleShowAll }>Show all</button>
      <button className="task-filter__button" type="button" onClick={ handleShowComplete }>Show complete</button>
      <button className="task-filter__button" type="button" onClick={ handleShowIncomplete }>Show incomplete</button>
    </section>
  );
};

export default Filter;
