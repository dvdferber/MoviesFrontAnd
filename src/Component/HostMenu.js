import React, { useEffect, useState } from 'react'
import { BsPeopleCircle } from "react-icons/bs";
import MovieHostComp from './MoviesMonipulation/MovieHostComp'
import HostComp from './UsersMonipulation/hostTast'
import SubscriptionsHostComp from './SubscriptionsMonipulation/SubscriptionsHostComp'
import { Switch, useLocation ,Route} from 'react-router-dom'
import {userDataWithBooleanPremissionById} from './Data/Utils'
import './style.css'


const MenuComp = (props) =>{
    const location = useLocation()
    const [allUserInfo, setAllUserInfo] = useState({premissions:{Admin: false, View_Movies: false, View_Subscriptions:false }})
    const [hendelTimeOut, setHendelTimeOut] = useState()

    useEffect(()=>{
        let unmounted = false;
        const getData = async() =>{
            let data = await userDataWithBooleanPremissionById(location.id)
            if(data.premissions === undefined){
                data.premissions = {Admin: false, View_Movies: false, View_Subscriptions:false};
            }
            setAllUserInfo(data)
            localStorage.setItem('allUserInfo', JSON.stringify(data))
            let timeOut = setTimeout(() => {
                alert('Is time to log out')
                props.history.push('/')
                localStorage.clear()
            }, 10 + data.sessionTimeOut * 60000)
            setHendelTimeOut(timeOut)
        }
        if(!unmounted && location.id !== undefined){
            getData()
        }
        else if(!unmounted){
            setAllUserInfo(JSON.parse(localStorage.getItem('allUserInfo')))
        }
        return ()=>{
            unmounted = true
        }
    },[location.id, props.history])

    const goToUserManagment = () =>{
        props.history.push(`/main/users`)
    }
    const goToMovieHostComp =() =>{
        props.history.push(`/main/movies/all`)
    }
    const goToSubsciptions = () =>{
        props.history.push('/main/subscriptions')
    }
    const logOut = () =>{
        clearTimeout(hendelTimeOut)
        localStorage.clear()
        props.history.push(`/`)
    }

    return (
        <div>
        <div className='hostMenu-main'>
            <span id='welcome-user'><BsPeopleCircle size='25px' color='white'/> {allUserInfo.firstName} {allUserInfo.lastName}</span><br/>
            <div className='main-navigation-bar'>
                {allUserInfo.premissions.View_Movies && <input className='btn-host-menu' id='left' type='button' value='Movies' onClick={goToMovieHostComp}/>}
                {allUserInfo.premissions.View_Subscriptions &&< input className='btn-host-menu' type='button' value='Subsription' onClick={goToSubsciptions}/>}
                {allUserInfo.premissions.Admin && <input className='btn-host-menu' type='button' value='User Managment' onClick={goToUserManagment}/>}
                <input className='btn-host-menu' type='button' value='Log out' id='right' onClick={logOut}/>
            </div>
        </div>    
        <Switch>
            <Route  path='/main/users' component={HostComp}/>
            <Route  path='/main/movies' component={MovieHostComp}/>
            <Route  path='/main/movies/:id' component={MovieHostComp}/>
            <Route path='/main/subscriptions' component={SubscriptionsHostComp}/>
        </Switch>
    </div>
    )
}
export default MenuComp