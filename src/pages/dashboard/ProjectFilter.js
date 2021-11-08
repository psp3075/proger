const filterList = [
  "all",
  "mine",
  "development",
  "design",
  "marketing",
  "sales",
];

function ProjectFilter({ currentFilter, changeFilter }) {
  function handleClick(filter) {
    changeFilter(filter);
  }

  return (
    <div className="project-filter">
      <nav>
        <p>Filter </p>
        {filterList.map((option) => (
          <button
            key={option}
            onClick={() => handleClick(option)}
            className={currentFilter === option ? "active" : ""}
          >
            {option}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default ProjectFilter;
