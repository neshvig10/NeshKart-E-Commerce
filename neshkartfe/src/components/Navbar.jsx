import React from 'react';
// import styles from "../index.css"


const Navbar = () => {
	return(
	<>
	<div className='font-bold bg-blue-500 text-white flex justify-between h-12 py-3'>
		<div className=''>
			<a href='./' className='m-1 my-3'> NeshKart</a>
			<a href="./products" className='m-1 my-3'>Products</a>
		</div>

		<div>
			<a href="./cart" className='m-1'>Cart</a>

			<a href="./login" className='m-1'>Login</a>
			<a href="./signup" className='m-1'>Register</a>

		</div>
	</div>


	</>	
	)
}
export default Navbar;

