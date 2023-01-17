import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <article style={{ padding: "100px" }}>
      <h1>Looks like you are lost</h1>
      <p>Page Not Found</p>
      <div className="flexGrow">
        <Link to="/">Visit the Homepage</Link>
      </div>
    </article>
  );
};

export default Missing;
