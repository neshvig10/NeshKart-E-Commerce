import React, { useContext, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
// import styles from "../index.css"


const Navbar = () => {

	const {user,logout} = useAuth();
	console.log(user);
	

return(

	
	<>			
			
			<div className='font-bold bg-blue-500 text-white flex justify-between h-12 py-3'>
			<div className=''>
				<Link to="./products" className='m-1 my-3'>Products</Link>
			</div>

			<div>
				{user!=null  ? 
					<>
							<Link to="./cart" className='m-1'>Cart</Link>
							<Link to={`/user/${user.user}`} className='m-1'>Profile</Link>
							<Link to="./sellProduct" className='m-1'>Sell Products</Link>
							<button onClick={logout} className='m-1'>Logout</button>

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

