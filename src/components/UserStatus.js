import { useCollection } from "./../hooks/useCollection";
import Avatar from "./Avatar";
import "./UserStatus.css";

function UserStatus() {
  const { error, documents } = useCollection("users");
  return (
    <div className="user-list">
      <h2>All users</h2>
      {error && <div className="error">{error}</div>}
      {documents?.map((user) => (
        <div key={user.id} className="user-list-item">
          {user.online && <span className="user-online"></span>}
          <span>{user.displayName}</span>
          <Avatar src={user.photoURL} />
        </div>
      ))}
    </div>
  );
}

export default UserStatus;
