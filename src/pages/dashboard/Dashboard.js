import { useCollection } from "../../hooks/useCollection";
import ProjectList from "../../components/ProjectList";
import ProjectFilter from "./ProjectFilter";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./Dashboard.css";
import { useState } from "react";

function Dashboard() {
  const { documents, error } = useCollection("projects");
  const [currentFilter, setCurrentFilter] = useState("all");
  const { user } = useAuthContext();

  function changeFilter(filter) {
    setCurrentFilter(filter);
  }

  const projects = documents?.filter(() => {
    switch (currentFilter) {
      case "all":
        return true;
      case "mine":
        let assignedToMe = false;
        document?.assignedUsersList?.forEach((u) => {
          if (user.uid === u.id) {
            assignedToMe = true;
          }
        });
        return assignedToMe;
      case "development":
      case "design":
      case "sales":
      case "marketing":
        console.log(document.category, currentFilter);
        return document.category === currentFilter;
      default:
        return true;
    }
  });

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && (
        <ProjectFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />
      )}
      {projects && <ProjectList projects={projects} />}
    </div>
  );
}

export default Dashboard;
