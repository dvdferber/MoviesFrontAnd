import React, { useEffect, useState } from 'react'
import SubsriptionWatchComp from './SubscriptionWatchedComp'
import { useHistory } from 'react-router-dom'
import {deleteMovie} from '../Data/DataForMovies'
import './MovieComp.css'

const MovieComp = (props) => {
    const history = useHistory()
    const [movie, setMovie] = useState({name: '', genres:'', premiered:''})
    const [premissions] = useState(props.premissions)

    useEffect(()=>{
        setMovie(props.movie)
       
    },[props.movie])
    const DeleteMovie = async() => {
        let respond = await deleteMovie(movie.id)
        if(respond){
            history.push('/main/movies/all')
            props.awaking()
        }
    }
    const editMovie =() => {

        history.push({
            pathname:'/main/movies/exsist/editmovie',
            movie: {...movie},
            url: props.url
            })
    }
    return (
    <div className='movie-main-card'>
        <div className='image-continer'>
            <img className='movie-image' src={movie.image}  alt="not found"/><br/>
            <div className='movie-text-header'>
                <b>{movie.name},     {movie.premiered}</b><br/>
                <span>{movie.genres}</span><br/> 
            </div>       
        </div>
        <div className='movie-watch-and-btns'>
            <SubsriptionWatchComp whoWatch={movie.subscriptions}/>
            <div className='btn-movies'>
                {premissions.Delete_Movies && <input className='btn-movies-actions' type='button' value='Delete movie' onClick={DeleteMovie}/>}
                <span>&nbsp;&nbsp;</span>
                {premissions.Update_Movies &&<input className='btn-movies-actions' type='button' value='Edit movie' onClick={editMovie}/>}
            </div>
        </div>
           
    </div>
    )
}
export default MovieComp