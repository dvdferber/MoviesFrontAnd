import React, {useState} from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import AllMoviesComp from './AllMoviesComp'
import EditMovieComp from './EditMovieComp'
import CreateMovieComp from './CreateMovieComp'
import './MovieHostGeneral.css'

function MovieHostComp() {

    const history = useHistory()
    const [userPremission] = useState(JSON.parse(localStorage.getItem('allUserInfo')))
    const [rundomURl, setRandomUrl]= useState(false)

    const showAllMovies = () =>{
        if(rundomURl){
            setRandomUrl(!rundomURl)
            history.push({ pathname: '/main/movies/all'})
        }else{
            setRandomUrl(!rundomURl)
            history.push({ pathname: '/main/movies'})
        }
    }
    const addMovie = () =>{
        history.push('/main/movies/new/createmovie')
    }

    return (
        <div className='movies-main-host'>
            <div className='host-menu-btn'>
            {userPremission.premissions.View_Movies && <input type='button' className='btn-menu-in-comp' value='All Movies'onClick={showAllMovies}/>}
            {userPremission.premissions.Create_Movies && <input type='button' className='btn-menu-in-comp' value='Add Movie' onClick={addMovie}/>}<br/>
            </div>
            <Switch>
                <Route exact path='/main/movies' component={AllMoviesComp}/>
                <Route exact path='/main/movies/:id' component={AllMoviesComp}/>
                <Route path='/main/movies/:id/editmovie' component={EditMovieComp}/>
                <Route path='/main/movies/:id/createmovie' component={CreateMovieComp}/>
            </Switch>
        </div>
    )
}

export default MovieHostComp
