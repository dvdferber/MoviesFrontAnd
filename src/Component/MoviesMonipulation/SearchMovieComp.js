import React, { useState } from 'react'
import './MovieHostGeneral.css'


const SearchMovieComp = (props) =>{

    const [searchValue, setSearchInput] = useState('')

    const search= () =>{ 
       props.setInputFromSearch(searchValue.toLowerCase())
    }
    return (<div  className='search-main-item'>
        < input className='search-input' type='text' placeholder='  which movie do you looking for?' onChange={e => setSearchInput(e.target.value)}/>
        < input type='button' className='search-btn' value='🔍' onClick={search}/>
    </div>)
}
export default SearchMovieComp