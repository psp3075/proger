import Avatar from "../../components/Avatar";
import ReactTooltip from "react-tooltip";
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useHistory } from "react-router-dom";

function ProjectSummary({ project }) {
  const { deleteDocument } = useFirestore("projects");
  const { user } = useAuthContext();
  const history = useHistory();

  function clickHandler(e) {
    deleteDocument(project.id);
    history.push("/");
  }
  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">{project.name}</h2>
        <p>By {project.createdBy.displayName}</p>
        <p className="due-date">
          Project due by {project.dueDate.toDate().toDateString()}
        </p>
        <p className="details">{project.details}</p>
        <h4>Project is assigned to :</h4>
        <div className="assigned-users">
          {project.assignedUsersList.map((user) => (
            <div key={user.id} data-tip={user.displayName}>
              <ReactTooltip />
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
      </div>
      {user.uid === project.createdBy.id && (
        <button className="btn" onClick={clickHandler}>
          Mark as done
        </button>
      )}
    </div>
  );
}

export default ProjectSummary;
