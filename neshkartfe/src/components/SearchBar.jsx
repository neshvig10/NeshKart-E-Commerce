import { React, useState } from 'react';
import { useSearch } from '../contexts/SearchContext';

const SearchBar = () => {

    const {searchFilter} = useSearch();

    const [searchVal,setSearchVal] = useState();

    function searchImpl(e){
        setSearchVal(e);
        searchFilter(e);
    }

    return (
        <>
            <div className='flex items-center mx-80'>
                <div className='w-full'> 
                    <input 
                        className='border-2 border-blue-700 bg-white text-black font-light p-2 h-10 w-full rounded-l-md' 
                        value={searchVal}
                        onChange={(e) => searchImpl(e.target.value)}
                        placeholder="Search..."
                    />
                </div>
                <div>
                    <img 
                        className='border-2 border-blue-600 h-10 w-14 rounded-r-md' 
                        src="../images/search.png" 
                        alt="Search Icon" 
                    />
                </div>
            </div>
        </>
    )
}

export default SearchBar;
