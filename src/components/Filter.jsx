const Filter = ( { dispatchFilter } ) => {
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
    <section className="task-filter">
      <button className="task-filter__button" type="button" onClick={ handleShowAll }>Show all</button>
      <button className="task-filter__button" type="button" onClick={ handleShowComplete }>Show complete</button>
      <button className="task-filter__button" type="button" onClick={ handleShowIncomplete }>Show incomplete</button>
    </section>
  );
};

export default Filter;
