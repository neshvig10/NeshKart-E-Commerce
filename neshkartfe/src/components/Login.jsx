import axios from 'axios';
import {React, useState} from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const [userPhone,setuserPhone] = useState("");
    const [password,setPassword] = useState("");
    const [message,setMessage] = useState("");
    const navigate = useNavigate();


    const loginUser = async(e) => {

        e.preventDefault();

        const user = {
            "userPhone" : userPhone,
            "userPassword" : password,
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
                setMessage(response.data);

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
                                    Phone Number 
                            </label> 
                            
                            <input className='border-2' type="text" value={userPhone} onChange={(e)=> setuserPhone(e.target.value)} />

                    </div>

                    <div>
                        <label>
                            Password 
                        </label> 
                        <input className='border-2' type="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
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
