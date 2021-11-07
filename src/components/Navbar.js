import { useLogout } from "./../hooks/useLogout";
import { Link } from "react-router-dom";
import Target from "../assets/target.svg";
import "./Navbar.css";

function Navbar() {
  const { logout, isPending } = useLogout();

  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={Target} alt="logo" />
          <span>Proger</span>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          {!isPending && (
            <button className="btn" onClick={logout}>
              Logout
            </button>
          )}
          {isPending && (
            <button className="btn" disabled>
              Visit again
            </button>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
