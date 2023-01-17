import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

const Home = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    setAuth({});
    navigate("/login");
  };

  return (
    <>
      <header>
        <h1>MERN Assignment</h1>
        <div className="flexGrow">
          <button onClick={logout}>Sign Out</button>
        </div>
      </header>
      <section className="App-sidebar">
        <Link to="/students">List Students</Link>
        <Link to="/students/new">Create Student</Link>
      </section>
    </>
  );
};

export default Home;
