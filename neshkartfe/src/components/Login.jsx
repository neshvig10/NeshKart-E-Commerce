import axios from "axios";
import { React, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [userId, setUserId] = useState();
  const [userPhone, setuserPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const {login} = useAuth();


  const loginUser = async (e) => {
    e.preventDefault();

    setMessage("");

    const user = {
      userPhone: userPhone,
      userPassword: password,
    };

    try{
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        user,
        { headers: { Authorization: localStorage.getItem("SavedToken") } }
      );

      let token = response.data;
      console.log(response.data);
      localStorage.setItem("jwtToken",token);
      localStorage.setItem("userPhone",userPhone);
      login(userPhone);
      navigate("/");
      window.location.reload(); 

    }catch(err){
      if (err.response){
        if (err.response.status===400){
          setMessage("Phone number does not exists");
        }
        else if (err.response.status === 401){
          setMessage("Password is wrong !");
        }
        else{
          setMessage("Login failed, try again");
        }
      }
      else{
        setMessage("Error occured, try again");
      }
    }


  };

  return (
    <>
          <div className="border-2 w-[300px] mx-[700px] my-[300px] py-5 px-5">
              <div>
                <h1 className="text-2xl font-bold">NeshKart Login</h1>
              </div>

              <div>
                <p className="text-red-400">{message}</p>
              </div>

              <div>
                <form onSubmit={loginUser}>
                  <div>
                    <label>Phone Number</label>
                    <input
                      className="border-2"
                      type="text"
                      value={userPhone}
                      onChange={(e) => setuserPhone(e.target.value)}
                    />
                  </div>

                  <div>
                    <label>Password</label>
                    <input
                      className="border-2"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-2 mx-20"
                    onClick={(e) => (true)}
                  >
                    Login
                  </button>
                </form>
              </div>

              <div>
                Don't have an account ?
                <Link className="text-blue-400 underline" to="/signup">
                  Register
                </Link>
              </div>
            </div>
    </>
  );
};

export default Login;
