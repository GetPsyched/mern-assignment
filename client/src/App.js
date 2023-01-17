import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import RequireAuth from "./components/RequireAuth.js";
import Home from "./components/Home.js";
import ListStudent from "./components/ListStudent";
import CreateStudent from "./components/CreateStudent";
import UpdateStudent from "./components/UpdateStudent";
import Missing from "./components/Missing.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* private routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="/students" element={<ListStudent />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="/students/new" element={<CreateStudent />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="/students/update" element={<UpdateStudent />} />
        </Route>

        {/* default route */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
