import React, { useEffect, useState } from 'react'
import DAL from '../Data/DAL'
import { useHistory } from 'react-router-dom'
import './createAccount.css'

const CreactAccount = () =>{
    const history = useHistory()
    const [newUser, setNewUser] = useState({userName: '', password: ''})
    const [errMeg, setErrMeg] = useState(false)
    const [toShow, setToShow] = useState(false)
    const [isValid, setIsValid] = useState(true)

    useEffect(()=>{
        setErrMeg(false)
        setIsValid(true)
    },[newUser])

    const createAccount = async() =>{
        const URl = `http://localhost:7000/api/users`

        if(newUser.password.length > 5){
            let allusers = await DAL.getAll(URl)

            allusers.forEach(async(user) => {
                if((user.userName === newUser.userName && user.password === null) || 
                (user.userName === newUser.userName && user.password === undefined)){
                   let respond = await DAL.updateExsist(user._id, URl, {...newUser})
                   if(respond.password === newUser.password){
                        setToShow(false)
                        history.push('/')
                   }
                }else{
                    setToShow(true)
                } 
            })
            if(toShow){
                setErrMeg(true)
            }
        }else{
            setIsValid(false)
        }
    }
    

    return (
    <div className='create-account-main'>
        <h3 className='header-create-account'>Create Account</h3>
            <div className='input-area'>
                <input className='create-account-input' type='text' placeholder='User name' onChange={e => setNewUser({...newUser, userName: e.target.value})}/>
                    <br/><br/>
                <input className='create-account-input' type='password' placeholder='Password' onChange={e => setNewUser({...newUser, password: e.target.value })}/><br/>
                {!isValid  && <span className='require-mgs'>*the password mast include 6 characters</span>}<br/>
            </div><br/>
            {errMeg && <span className='require-mgs'>* something is inccorect</span>}<br/>
        <input className='btn-create-account' type='button' value='create' onClick={createAccount}/><br/>
    </div>
    )
}
export default CreactAccount