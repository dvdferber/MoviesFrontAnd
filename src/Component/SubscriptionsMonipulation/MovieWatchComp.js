import React, { useEffect, useState } from 'react'
import AddANewMovie from './AddANewMovie'
import {getMovieWatchByOnlyId} from '../Data/DataForMembers'
import { Link } from 'react-router-dom'
import './MovieWatchComp.css'

const MovieWatchComp =(props)=>{
    const [movies, setMovies] = useState([23])
    const [subscribeToNew, setSubscribeToNew] = useState(false)
    const [movieIds, setMovieIds] = useState('')
    const [memberId, setMemberId] = useState('')

    useEffect(()=>{
        let unmounted = true
        const getMovies =async()=>{
            let moviesResp = await getMovieWatchByOnlyId(props.members._id)
            unmounted && setMovies(moviesResp)
            let ids = moviesResp.map(movie => movie.id)
            unmounted && setMovieIds(ids)
            unmounted && setMemberId(props.members._id)
        }
        if(unmounted){
            getMovies()
        }
        return ()=>{
            unmounted = false
        }
    },[props.members, subscribeToNew])

    let moviesToRender = ''
    if(movies !== undefined && movies.length > 0){
        moviesToRender = movies.map((movie, i) => {                     
            let date = (movie.date === undefined)? movie.date : movie.date.slice(0, 10)
            return (<li key={i}><Link to={`/main/movies/${movie.id}`}>{movie.name}</Link>,  {date}</li>)
        })
    }
    return(
        <div className='main-movie-watch'>
            <h4>Movie Watch</h4>
            <input type='button' className='btn-subscribe-to-movie' value='Subscribe to movie' onClick={()=>setSubscribeToNew(!subscribeToNew)}/>
            {subscribeToNew && <AddANewMovie ids={movieIds} memberId={memberId} 
                close={d => setSubscribeToNew(!subscribeToNew)}    />}
            <div className='movie-watch-list'>
                <ul>{moviesToRender}</ul>
            </div>
        </div>
    )
}
export default MovieWatchComp