import {React} from 'react'

const SearchBar = () => {
    return (
        <>
            <div className='flex items-center mx-80'>
                <div className='w-1/2'>
                <input className='flex-grow border-2 border-blue-600 h-10 w-full outline-none p-2 my-2 rounded-l-md'></input>
                </div>
                <div>
                <img className='border-2 border-blue-600 h-10 w-14 p-1 my-2 rounded-r-md' src="../images/search.png" alt="" />
                </div>
            </div>

        </>
    )
}
export default SearchBar;