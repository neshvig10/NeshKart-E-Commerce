import React, { useContext, useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './SearchBar';
// import styles from "../index.css"


const Navbar = () => {

	const {user,logout} = useAuth();
	const navigate = useNavigate();
	console.log(user);

	const [userId,setUserId]=useState();

	const location = useLocation();
	// function logoutAndNavigate(){
	// 	logout();
	// 	navigate("/products");
	// }




	useEffect(() => {
		async function getUserId() {

			const jwtToken = localStorage.getItem("jwtToken");
			console.log(jwtToken);
			

			if (!jwtToken) {
				console.error("JWT token is missing");
				return;
			}
			
			const response = await axios.get(`http://localhost:8080/api/auth/userId?jwt=${jwtToken}`);
			setUserId(response.data*1);
		}

        	getUserId();
 }, []);

  const routes = ["/","/products"];

 
return(

	
	<>			
			
			<div className='font-bold bg-blue-500 text-white flex justify-between h-12 py-3'>
			<div className='w-16'>
				<Link to="/" className='m-1 my-3'>Products</Link>
			</div>

			{routes.includes(location.pathname) &&

			<div className='w-3/4'>
				<SearchBar></SearchBar>
			</div>

			}


			<div className='w-500px'>
				{user!=null  ? 
					<>
							<Link to="/cart" className='m-1'>Cart</Link>
							<Link to={`/user/${userId}`} className='m-1'>Profile</Link>
							<Link to="/sellProduct" className='m-1'>Sell Products</Link>
							<Link to="/">
							<button onClick={logout} className='m-1'>Logout</button>
							</Link>

					</>
					:
					<>
								<Link to="./cart" className='m-1'>Cart</Link>
								<Link to="./login" className='m-1'>Login</Link>
								<Link to="./signup" className='m-1'>Register</Link>
					</>
				}
			
				</div>
			</div>

		
	</>	
	)
}
export default Navbar;

