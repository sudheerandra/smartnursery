import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { NurseryContext } from "../context/NurseryContext";

const Login = (props) => {
  const { setToken } = props;
  const {backendUrl} = useContext(NurseryContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const fieldChanges = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        backendUrl + "/api/user/admin",
        formData
      );
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token);
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gray-100 px-4 sm:px-6">
      <div className="bg-white shadow-md rounded-lg px-8 py-4 max-w-md shadow-lg rounded-xl py-6 w-full sm:w-auto">
        <h1 className="font-bold mb-2 text-3xl text-gray-800 text-center sm:text-left">
          Admin Pannel
        </h1>
        <form onSubmit={submitHandler}>
          <div className="mb-2 min-w-72">
            <p className="text-sm font-medium text-gray-900 mb-2">
              Email Address
            </p>
            <input
              className="rounded-md px-3 py-2 border outline-none border-gray-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition duration-150 max-w-full sm:max-w-md"
              type="email"
              placeholder="youremail@gmail.com"
              onChange={fieldChanges}
              name="email"
              value={formData.email}
              required
            />
          </div>
          <div className="mb-2 min-w-72">
            <p className="text-sm font-medium text-gray-900 mb-2">Password</p>
            <input
              className="rounded-md px-3 py-2 border outline-none border-gray-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition duration-150 max-w-full sm:max-w-md"
              type="password"
              placeholder="Password here..."
              onChange={fieldChanges}
              name="password"
              value={formData.password}
              required
            />
          </div>
          <button
            className="hover:bg-orange-500 bg-gray-500 text-white px-5 py-2 rounded-full hover:bg-orange-600 transition-colors font-semibold shadow-md w-full sm:w-auto text-base sm:text-lg"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;