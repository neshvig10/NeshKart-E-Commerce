import axios from 'axios';
import {React, useState} from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const [userRole,setUserRole] = useState("Customer");
    const [message,setMessage] = useState("");
    const navigate = useNavigate();


    const loginUser = async(e) => {

        e.preventDefault();

        const user = {
            "userName" : userName,
            "userPassword" : password,
            "userRole" : userRole
        }

        console.log(user);
        try{
            const response = await axios.post("http://localhost:8080/api/auth/login",user);
            console.log(response);
            if (response.status === 200){
                console.log("Logged In successfully");
                navigate("/");
            }
            else{

            }
        }
        catch(error){
            console.error("Error logging in",error);
        }

    }

    return (
        <>

            <div className='border-2 w-[300px] mx-[700px] my-[300px] py-5 px-5'> 

                <div>
                    <p>{message}</p>

                </div>
                <div>
                    <h1 className='text-2xl font-bold'>NeshKart Login</h1>
                    <br />
                </div>

                <div>

                <form onSubmit={loginUser}> 

                    <div>

                            <label>
                                    UserName 
                            </label> 
                            
                            <input className='border-2' type="text" value={userName} onChange={(e)=> setUserName(e.target.value)} />

                    </div>

                    <div>
                        <label>
                            Password 
                        </label> 
                        <input className='border-2' type="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                    </div>
                    

                    <div className='w-4'>
                        <label>Role</label>
                        <select name="role" id="userrole" onChange={(e) => setUserRole(e.target.value)}>
                            <option value="Customer">Customer</option>
                            <option value="Seller">Seller</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-2 mx-20"
                        onClick={loginUser}
                    >
                        Login
                    </button>
                    



                    </form>

                </div>

                <div>
                    Don't have an account ?
                    <a className='text-blue-400 underline' href="./signup">Register</a>
                </div>
                

            </div>

        </>
    )
}

export default Login;
