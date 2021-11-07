import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import "./Signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { signup, isPending, error } = useSignup();

  function signupHandler(e) {
    e.preventDefault();
    signup(email, password, username, thumbnail);
  }

  function fileChangeHandler(e) {
    setThumbnail(null);
    let profilePic = e.target.files[0];

    if (!profilePic) {
      setThumbnailError("Please select a valid file");
      return;
    }
    if (!profilePic.type.includes("image")) {
      setThumbnailError("selected file must be an image");
      return;
    }
    if (profilePic.size > 1000000) {
      setThumbnailError("Image file size too large ");
      return;
    }

    setThumbnailError(null);
    setThumbnail(profilePic);
    console.log("thumbnail updated");
  }

  return (
    <form className="auth-form" onSubmit={signupHandler}>
      <h2>Sign up</h2>

      <label>
        <span>Username</span>
        <input
          required
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </label>
      <label>
        <span>Email</span>
        <input
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Password</span>
        <input
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>Profile Image</span>
        <input required type="file" onChange={fileChangeHandler} />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>
      {!isPending && <button className="btn">Signup</button>}
      {isPending && (
        <button className="btn" disabled>
          Loading
        </button>
      )}

      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default Signup;
