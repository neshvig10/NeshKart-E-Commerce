import axios from 'axios';
import {React, useState} from 'react';
import { useNavigate } from 'react-router-dom';


const Register = () => {

    const [userName,setUserName] = useState('');
    const [phone,setPhone] = useState();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [message,setMessage] = useState("");
    const navigate = useNavigate();

    const  registerUser = async (e) => {

        e.preventDefault();

        const user = {
            "userName" : userName,
            "userPhone" : phone,
            "userEmail" : email,
            "userPassword" : password
        }
        try{
            const response = await axios.post('http://localhost:8080/api/auth/signup', user);
            console.log(response);
            if(response.status === 200){
                navigate('/');
            }
            else{
                setMessage(response.data.message);
            }
                
        }
        catch(error){
            console.error("Error registering user",error);

        }

    }



    return (
        <>
            <div className='border-2 w-[300px] mx-[700px] my-[300px] py-5 px-5'> 
            <div>

            <h1 className='text-2xl font-bold'>
                NeshKart Signup
            </h1>

            </div>
            <div>
                    <p>{message}</p>

            </div>


            <div>

            <form onSubmit={registerUser}> 

                <div>
                        <label>
                                UserName 
                        </label> 
                        <input className='border-2' type="text" value={userName} onChange={(e)=> setUserName(e.target.value)} />
                </div>

                <div>
                    <label>
                        Phone 
                    </label> 
                    <input className='border-2' type="number" value={phone} onChange={(e)=> setPhone(e.target.value)} />
                </div>

                <div>
                    <label>
                        Email 
                    </label> 
                    <input className='border-2' type="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                </div>

                <div>
                    <label>
                        Password 
                    </label> 
                    <input className='border-2' type="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                </div>

                <div>
                    <label>
                        Confirm Password 
                    </label> 
                    <input className='border-2' type="password" value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-2 mx-20"
                >
                    Register
                </button>
                </form>


            </div>

                <div>
                    Already have an account ?
                    <a className='text-blue-400 underline' href="./login"> Login</a>
                </div>

            </div>
        </>
    )
}

export default Register;