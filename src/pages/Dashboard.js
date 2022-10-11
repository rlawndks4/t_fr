import "../styles/css/Dashboard.css";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    
  }, []);
  return (
    <div className="dashboard">
      <div className="dashboard__container">
        Logged in as
        <div>{}</div>
        <div>{}</div>
        <button className="dashboard__btn" >
          Logout
        </button>
      </div>
    </div>
  );
}
export default Dashboard;
