import React, { useContext } from "react";
import Sidebar from "../../Components/Admin Sidebar/Sidebar";
import AuthContext from "../../Context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div>
        <Sidebar />
        <h3 className="text-center">Welcome {user?.username}</h3>
      </div>
    </>
  );
};

export default Dashboard;
