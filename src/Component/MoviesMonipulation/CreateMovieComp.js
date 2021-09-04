import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import DAL from '../Data/DAL'
import './EditAndCreatMovie.css'

const CreateMovieComp = (props) =>{
    const history = useHistory()
    const [newMovie, setNewMovie] = useState({movie:{}})
    const [dateIsEmpty, setDateIsEmpty]= useState(false)
    const [nameIsEmpty, setNameIsEmpty]= useState(false)

    const Save = async() =>{
        if((newMovie.premiered !== null && newMovie.premiered !== undefined && newMovie.premiered !== '') && 
        (newMovie.name !== null && newMovie.name !== undefined && newMovie.name !== '') ){
            const moviesURl = 'http://localhost:7000/api/movies'
            let genres = (newMovie.genres) ? newMovie.genres.split(',') : '';
            let resp = await DAL.createNew(moviesURl, {...newMovie, genres: genres} )
            if(resp){
                history.push('/main/movies/all')
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
        history.push('/main/movies/all')
    }
    return(
    <div className='edit-movie-main'>
        <h4 className='header-edit-movie'>Create movie area</h4>
        <span className='input-movie-edit'>Name: </span><br/>
        {nameIsEmpty && <span className='require-mgs'>*this field is require</span>}
        <input type='text'  className='input-movie-data'  onChange={endalNamechange}/><br/>
        <span className='input-movie-edit'>Genres: </span><br/>
        <input type='text' className='input-movie-data' onChange={e => setNewMovie({...newMovie, genres: e.target.value})}/><br/>
        <span className='input-movie-edit'>Image (URL): </span><br/>
        <input type='text' className='input-movie-data'  onChange={e => setNewMovie({...newMovie, image: e.target.value})}/><br/>
        <span className='input-movie-edit'>Premired: </span><br/>
        <input type='date' min={new Date().toISOString().split("T")[0]} className='input-movie-data'  
            onChange={heandelDateInput}/><br/>
            {dateIsEmpty && <span className='require-mgs'>*this field is require</span>}
        <div className='movie-btn'>
            <input type='button' className='movie-edit-btn' value='Save' onClick={Save}/>  <span>&nbsp;&nbsp;</span>        
            <input type='button' className='movie-edit-btn' value='Cancel' onClick={cancel}/>
        </div>
    </div>
    )
}
export default CreateMovieComp