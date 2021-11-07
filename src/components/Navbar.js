import { useLogout } from "./../hooks/useLogout";
import { Link } from "react-router-dom";
import Target from "../assets/target.svg";
import { useAuthContext } from "../hooks/useAuthContext";
import "./Navbar.css";

function Navbar() {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={Target} alt="logo" />
          <span>Proger</span>
        </li>
        {!user && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        {!user && (
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        )}
        {user && (
          <li>
            {!isPending && (
              <button className="btn" onClick={logout}>
                Logout
              </button>
            )}
            {isPending && (
              <button className="btn" disabled>
                Logging out
              </button>
            )}
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
