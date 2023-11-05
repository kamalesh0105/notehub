import { Routes, Route } from "react-router-dom";
import Public from "./components/Public";
import Login from "./libs/auth/Login";
import Layout from "./components/Layout";
import DashLayout from "./components/DashLayout";
import Welcome from "./libs/auth/Welcome";
import NotesList from "./libs/notes/NotesList";
import UsersList from "./libs/user/UserList";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="dash" element={<DashLayout />}>
          <Route index element={<Welcome />} />
          <Route path="notes" element={<NotesList />} />
          <Route path="user" element={<UsersList />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
