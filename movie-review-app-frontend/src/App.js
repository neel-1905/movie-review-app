import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./Context/AuthContext";

import Home from "./Pages/Home/Home";
import Movie from "./Pages/Movie/Movie";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import MoviesByName from "./Pages/Movies By Name/MoviesByName";
import Movies from "./Pages/All Movies/Movies";
import Dashboard from "./Pages/Admin Dashboard/Dashboard";
import UsersList from "./Pages/Users List/UsersList";
import EditUser from "./Pages/Edit User/EditUser";
import AddMovie from "./Pages/Add Movie/AddMovie";
import ListMovies from "./Pages/Movies List/ListMovies";
import EditMovie from "./Pages/Edit Movie/EditMovie";
import Profile from "./Pages/Profile/Profile";
import AddUser from "./Pages/Add User/AddUser";
import UpdateReview from "./Pages/Update Review/UpdateReview";

function App() {
  return (
    <>
      <Router>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movie" element={<Movie />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/moviesByName" element={<MoviesByName />} />
            <Route path="adminDashboard" element={<Dashboard />} />
            <Route path="/usersList" element={<UsersList />} />
            <Route path="/editUser" element={<EditUser />} />
            <Route path="/addMovie" element={<AddMovie />} />
            <Route path="/listMovies" element={<ListMovies />} />
            <Route path="/editMovie/:movieId" element={<EditMovie />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/addUser" element={<AddUser />} />
            <Route path="/updateReview/:id" element={<UpdateReview />} />
          </Routes>
        </AuthContextProvider>
      </Router>
    </>
  );
}

export default App;
