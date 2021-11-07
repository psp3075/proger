import { useState, useEffect } from "react";
import Select from "react-select";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import { timestamp } from "../../firebase";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useHistory } from "react-router-dom";
import "./Create.css";

const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];

function Create() {
  const { documents } = useCollection("users");
  const { addDocument, response } = useFirestore("projects");
  const history = useHistory();
  const { user } = useAuthContext();
  // console.log(documents);

  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName };
      });
      setUsers(options);
    }
  }, [documents]);

  async function submitHandler(e) {
    e.preventDefault();
    setError(null);
    if (!category) {
      setError("please select a category");
      return;
    }

    if (assignedUsers.length < 1) {
      setError("please assign the project to atleast 1 person");
      return;
    }
    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const assignedUsersList = assignedUsers.map((user) => {
      return {
        displayName: user.value.displayName,
        photoURL: user.value.photoURL,
        id: user.value.id,
      };
    });

    const project = {
      name,
      details,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      category: category.value,
      assignedUsersList,
      comments: [],
      createdBy,
    };
    await addDocument(project);
    if (!response.error) {
      history.push("/");
    }
  }

  return (
    <div className="create-form">
      <h2 className="page-title">Create a new project</h2>
      <form onSubmit={submitHandler}>
        <label>
          <span>Project Name</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Project Details</span>
          <textarea
            required
            type="text"
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>
        <label>
          <span>Due Date</span>
          <input
            required
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Project Category</span>
          <Select
            options={categories}
            onChange={(option) => setCategory(option)}
          />
        </label>
        <label>
          <span>Members</span>
          <Select
            options={users}
            onChange={(option) => setAssignedUsers(option)}
            isMulti
          />
        </label>
        <button className="btn">Add Project</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Create;
