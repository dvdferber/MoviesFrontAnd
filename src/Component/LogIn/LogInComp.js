import React, { useEffect, useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"
import './LogIn.css'


const LogInComp = (props) => {
    const [user, setUser] = useState({userName: '', password: ''})
    const [isCorrect, setIsCorrect] = useState(false)

    useEffect(()=>{
        setIsCorrect(false)
        let premission = {premissions:{ Admin: false,
            Create_Movies: false, Create_Subscriptions: false,
            Delete_Movies: false, Delete_Subscriptions: false,
            Update_Movies: false, Update_Subscriptions: false,
            View_Movies: false, View_Subscriptions: false}}
        localStorage.setItem('allUserInfo', JSON.stringify(premission))
    },[user])

    const chackIfMatch = async() =>{
        if(user.userName !== '' && user.password !== ''){
            const UPURl = `http://localhost:7000/api/users/login/${user.userName}/${user.password}`
            let isId = await axios.get(UPURl)
            if(isId.data){
                props.history.push({
                pathname: `/main/`,
                id: isId.data
                })

            }else{
                setIsCorrect(true)
            }
        }else{
            setIsCorrect(true)
        }
        
    }


    return (
        <div className='logInPage'>
            <h2 className='header-log-in'>Log In</h2><br/>
            <div className='input-filds'>
                <br/><input className='log-in-input' type='text' placeholder='User Name' onChange={e =>   {setUser({...user, userName: e.target.value})}}/><br/>
                <br/>
                <input className='log-in-input' type='password' placeholder='Password' onChange={e => {setUser({...user, password: e.target.value})}}/><br/>
            </div>
        {isCorrect && <span className='require-mgs'>The username or password is incorrect</span>}<br/>
        <input className='btn-login' type='button' value='Log in' onClick={chackIfMatch}/><br/>
        <div className='create-account'>
            <span>New User? </span><br/>
            <Link to="/CreateAccount">Creact accoumt</Link>
        </div>
        </div>
    )


}
export default LogInComp