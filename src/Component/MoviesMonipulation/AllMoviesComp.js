import React, { useEffect, useState } from 'react'
import MovieComp from './MovieComp'
import SearchMovieComp from './SearchMovieComp'
import {getAllData, getMoviesById} from '../Data/DataForMovies'
import './MovieHostGeneral.css'


const AllMoviesComp = (props) =>{

    const [allMovies, setAllMovies] = useState([])
    const [userPremission] = useState(JSON.parse(localStorage.getItem('allUserInfo')))
    const [searchValue, setSearchValue] = useState('')
    const [reloudeCounter, setReloudeCounter] = useState(0)
    
    useEffect(()=>{
        let unmouted = true
        const movieId = props.match.params.id

        const getMovies = async() => {
            if(movieId === 'all' || movieId === undefined ){
                setSearchValue('')
                let moviesData = await getAllData()
                unmouted && setAllMovies(moviesData)
            }else{
                let movie = await getMoviesById(movieId)
                unmouted && setAllMovies([movie])
            }
        }
        if(unmouted){
            userPremission.premissions.View_Movies && getMovies()
        }
        return  ()=>{
            unmouted = false
        }
    },[props.match.params.id, reloudeCounter, userPremission])

    const setInputFromSearch = (input)=>{
        setSearchValue(input)
    }
    let filterdMovieis = allMovies.filter(movie => movie.name.toLowerCase().includes(searchValue))
    let moviesToRender = filterdMovieis.map((movie, i) =>{                                      
        return (<MovieComp key={movie.id} movie={movie} premissions={userPremission.premissions} 
            awaking={(d) => setReloudeCounter(reloudeCounter+ 1)} url={props.match.url}/>)
    })
    return(<div>
        {userPremission.premissions.View_Movies && <SearchMovieComp setInputFromSearch={(input) => setInputFromSearch(input)}/>}
        {!userPremission.premissions.View_Movies && <h3 style={{color:'red'}}>Sorry you don't have premission</h3>}
        <div className='rendering-all-the-movies'>
            {moviesToRender}
        </div>
    </div>)
}
export default AllMoviesComp