import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {updateExsist} from '../Data/DAL'
import './EditAndCreatMovie.css'

const EditMovieComp = (props) =>{
    const history = useHistory()
    const location = useLocation()

    const [newMovie, setNewMovie] = useState({movie:{}})
    const [movieName] = useState(location.movie.name)
    const [dateIsEmpty, setDateIsEmpty]= useState(false)
    const [nameIsEmpty, setNameIsEmpty]= useState(false)

    useEffect(()=>{
        setNewMovie(location.movie)
    },[location.movie])
    
    const SaveEdit = async() =>{
        if((newMovie.premiered !== null && newMovie.premiered !== undefined && newMovie.premiered !== '') && 
        (newMovie.name !== null && newMovie.name !== undefined && newMovie.name !== '') ){
            const moviesURl = 'https://server-side-cinema.herokuapp.com/api/movies'
            let resp = await updateExsist(newMovie.id, moviesURl, {...newMovie, genres: newMovie.genres.split(',')} )
            if(resp){
                if(location.url === '/main/movies/all' || location.url === '/main/movies'){
                    history.push(`/main/movies/all`)
                }else{
                    history.push(`/main/movies/${newMovie.id}`)
                } 
            }
        }else if(dateIsEmpty){
            setDateIsEmpty(true)
        }else if(nameIsEmpty){
            setNameIsEmpty(true)
        }
    }
    const endalNamechange =(e)=>{
        e.target.value.length > 0 ? setNameIsEmpty(false): setNameIsEmpty(true)
        setNewMovie({...newMovie, name: e.target.value})
    }
    const heandelDateInput =(e)=>{
        e.target.value.length > 0 ? setDateIsEmpty(false): setDateIsEmpty(true)
        setNewMovie({...newMovie, premiered: e.target.value})
    }
    const cancel =() =>{

        if(location.url === '/main/movies/all' || location.url === '/main/movies'){
            history.push(`/main/movies/all`)
        }else{
            history.push(`/main/movies/${newMovie.id}`)
        }
    }
    return(
    <div className='edit-movie-main'>
        <h4 className='header-edit-movie'>Edit movie: {movieName}</h4>
        <span className='input-movie-edit'>Name: </span><br/>
        {nameIsEmpty && <span className='require-mgs'>*this field is require</span>}
        <input type='text'  className='input-movie-data' defaultValue={newMovie.name}  onChange={endalNamechange}/><br/>
        <span className='input-movie-edit'>Genres: </span><br/>
        <input type='text' className='input-movie-data' defaultValue={newMovie.genres}  onChange={e => setNewMovie({...newMovie, genres: e.target.value})}/><br/>
        <span className='input-movie-edit'>Image (URL): </span><br/>
        <input type='text' className='input-movie-data'  defaultValue={newMovie.image}  onChange={e => setNewMovie({...newMovie, image: e.target.value})}/><br/>
        <span className='input-movie-edit'>Premired: </span><br/>
        <input type='date'  className='input-movie-data'  onChange={heandelDateInput}/><br/>
        {dateIsEmpty && <span className='require-mgs'>*this field is require</span>}<br/>
        <input type='button' className='movie-edit-btn' value='Save edit' onClick={SaveEdit}/>  <span>&nbsp;&nbsp;</span>        
        <input type='button' className='movie-edit-btn' value='Cancel' onClick={cancel}/>
    </div>
    )
}
export default EditMovieComp