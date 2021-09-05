import React, { useEffect, useState } from 'react'
import {addMemberToMovie} from '../Data/DataForMembers'
import {getAll} from '../Data/DAL'
import './AddANewMovie.css'


const AddANewMovie = (props) =>{
    const [movieList, setMovieList] = useState([])
    const [memberId, setMemberId] = useState('')
    const [newMovie, setNewMovie] = useState({})
    const [dateIsEmpty, setDateIsEmpty]= useState(false)
    const [datemge, setDateMge]= useState('')
    const [isValidDate, setIsValidDate] = useState(true)

    const movieURl = 'https://server-side-cinema.herokuapp.com/api/movies'

    useEffect(()=>{
        let unmounted = true
        const onLode= async()=> {
            unmounted && setMemberId(props.memberId)
            let allMoviesData = await getAll(movieURl)
            let shapeMovie = allMoviesData.filter(movie => !props.ids.includes(movie._id))
            unmounted && setMovieList(shapeMovie)
            // get default movie if user didnt select (the first movie to see)
            if(shapeMovie.length > 0){
                unmounted && setNewMovie({id: shapeMovie[0]._id, premiered: shapeMovie[0].premiered})
            }
        }
        if(unmounted){
            onLode()
        }
        return ()=>{
            unmounted = false
        }
    },[props.memberId, props.ids ])

    const setMovieDate = (e) =>{
        setIsValidDate(true)
        setNewMovie({...newMovie, date: e.target.value})
        setDateIsEmpty(false)
    }
    const insertMovieData =(e)=>{
        let data = e.target.value
        // sometime the compiler return string with a lot of \
        let movieIdAndDate = data.replace(/\\/g, '')
        data = JSON.parse(movieIdAndDate)
        setNewMovie({...newMovie, ...data})
        setIsValidDate(true)
    }
    // make sure you cant subscribe to movie the dosent lanch yet
    const checkTheDate = (movieTocheck) => {
        
        let movieLanchDate = new Date (movieTocheck.premiered).getTime()
        let userDate = new Date (movieTocheck.date).getTime()
        if(movieLanchDate > userDate){
            return false
        }
        else {
            return true
        }
    }
    const addToSubsctibe = async() =>{
        if(newMovie.date !== '' && newMovie.date !== null  && newMovie.date !== undefined && newMovie.id !== undefined){
            if(checkTheDate(newMovie)){
                let resp = await addMemberToMovie(memberId, {movieId: newMovie.id, date: newMovie.date})
                if(resp){
                    props.close()
                }
            }
            else{
                setDateMge(newMovie.premiered.slice(0,10))
                setIsValidDate(false)
            } 
        }
        else{
            setDateIsEmpty(true)
        }
        
    }

    let optionsToRender = movieList.map((movie, i) =>{
        let movieStr =  `{"id": "${movie._id}", "premiered": "${movie.premiered}"}` // need to store the date
        return (<option key={i} value={movieStr} >{movie.name} </option>) 
    })
    return (
        <div className='main-add-a-movie'>
            <b>Add a new movie</b><br/>
            <span className='input-a-movie-data'>movie: </span><br/>
            <select  onChange={insertMovieData}>
                {optionsToRender}
            </select><br/>
            {!isValidDate && <span className='require-mgs'>*this movie premiered is on {datemge}</span>}<br/>
            <span className='input-a-movie-data'>Date: </span><br/>
           <input type='date' min={new Date().toISOString().split("T")[0]} 
            className='input-date-btn' onChange={setMovieDate}/><br/>
            {dateIsEmpty && <span className='require-mgs'>*this field is require<br/></span>}

            <input type='button' value='Subscribe' className='add-the-movie-btn' onClick={addToSubsctibe}/>
        </div>
    )
}
export default AddANewMovie