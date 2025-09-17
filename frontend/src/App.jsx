import React from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import BuyersPage from "./pages/BuyerPage";
import WorkerPage from "./pages/WorkerPage";
import AdminPage from "./pages/AdminPage";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { useState, useEffect } from "react";


const App = () => {
  const [token, setToken] = useState("");

  //getting token from localstroge for after refreshed user logout issue
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && storedToken !== "undefined") {
      setToken(storedToken);
    } else {
      localStorage.removeItem("token");
      setToken("");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken}/>
          <div className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/buyers" element={<BuyersPage />} />
              <Route path="/workers" element={<WorkerPage />} />
              <Route path="/admin" element={<AdminPage />} />{" "}
              {/* ✅ Admin route */}
            </Routes>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
