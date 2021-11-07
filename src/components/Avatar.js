import "./Avatar.css";

function Avatar({ src }) {
  return (
    <div className="avatar">
      <img src={src} alt="profile pic" />
    </div>
  );
}

export default Avatar;
