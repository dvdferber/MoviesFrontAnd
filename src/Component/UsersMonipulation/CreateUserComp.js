import React, { useState} from 'react'
import { useHistory } from 'react-router-dom'
import {connvertPremissionObjToArray, isUserAlreadyExsist} from '../Data/Utils'
import {createNew} from '../Data/DAL'
import './EditUser.css'


const usersJsonURl = 'https://server-side-cinema.herokuapp.com/json/users/'
const usersDBurl = 'https://server-side-cinema.herokuapp.com/api/users/'
const premissionURl = 'https://server-side-cinema.herokuapp.com/json/premission'

const CreateUserComp = (props) =>{
    const history = useHistory()

    const [user, setDataFromUser] = useState({firstName: '', lastName:'' , sessionTimeOut: 0})
    const [userToEdit, setUserToEdit] = useState({userName: ''})
    const [isUserNameExsist, setIsUserNameExsist] = useState(false)
    const [isUserNameToSort, setIsUserNameToSort] = useState(false)
    const [userPremission, SetUserPremission] = useState({
            View_Subscriptions:false, Create_Subscriptions:false,
            Update_Subscriptions: false, Delete_Subscriptions:false,
            View_Movies: false, Create_Movies: false,
            Update_Movies: false, Delete_Movies: false,
    })

    const checkIfSubscriptionInTrue = (e) =>{
        if(userPremission.Create_Subscriptions || userPremission.Update_Subscriptions || userPremission.Delete_Subscriptions){
            SetUserPremission({...userPremission, View_Subscriptions:true})
        }else{
            SetUserPremission({...userPremission, View_Subscriptions:e.target.checked})
        }
    }
    const checkIfMoviesInTrue = (e) =>{
        if(userPremission.Create_Movies || userPremission.Update_Movies || userPremission.Delete_Movies){
            SetUserPremission({...userPremission, View_Movies:true})
        }else{
            SetUserPremission({...userPremission, View_Movies:e.target.checked})
        }
    }
    const addToUserName = (e)=>{
        setUserToEdit({userName:e.target.value})
        setIsUserNameExsist(false)
        if(e.target.value === ''){
            setIsUserNameToSort(true)
        }
        else{
            setIsUserNameToSort(false)
        }   
    }

    const SaveAllChanges = async() =>{
        let isExsist = await isUserAlreadyExsist(userToEdit.userName)
        if(isExsist && !isUserNameToSort && userToEdit.userName){
            let userDBresp = await createNew(usersDBurl, {...userToEdit})
            await createNew(usersJsonURl, {...user,id: userDBresp._id, createdDate: new Date()})
            let premissionTemp = connvertPremissionObjToArray(userPremission)
            await createNew(premissionURl, {id: userDBresp._id, permissions:[...premissionTemp]})
            history.push('/main/users/')
        }
        else if(!isExsist){
            setIsUserNameExsist(true)
        }
    }
    
    const CancelEdit = () =>{
        history.push('/main/users')
    }

    return (<div className='edit-user-main'>
        <h3 className='header-edit-user'>Create new User</h3>
        <span className='input-haders-edit'>First Name: </span><br/>
        <input className='input-user-data' type='text' onChange={e => setDataFromUser({...user, firstName:e.target.value})}/><br/>
        <span className='input-haders-edit'>Last Name: </span><br/>
        <input className='input-user-data' type='text'  onChange={e => setDataFromUser({...user, lastName:e.target.value})}/><br/>
        <span className='input-haders-edit'>Session timeout: </span>
        <br/><input className='input-user-data' type='number' min="0" onChange={e => setDataFromUser({...user, sessionTimeOut:e.target.value})}/><br/>
        <span className='input-haders-edit'>User name: </span><br/>
        <input className='input-user-data' type='text'  onChange={addToUserName}/><br/>
        {isUserNameToSort  && <span className='require-mgs'>*this field is required</span>}<br/>
        {isUserNameExsist  && <span className='require-mgs'>*this user already exsist</span>}<br/>
        <span className='input-haders-edit'>Premission: </span><br/>                               
        <input type='checkbox' checked={userPremission.View_Subscriptions} onChange={checkIfSubscriptionInTrue}/>
        <span>View Subscription </span><br/>
        <input type='checkbox' checked={userPremission.Create_Subscriptions} onChange={e => SetUserPremission({...userPremission, Create_Subscriptions:e.target.checked, View_Subscriptions: true})}/>
        <span>Create Subscription </span><br/>
        <input type='checkbox' checked={userPremission.Update_Subscriptions} onChange={e => SetUserPremission({...userPremission, Update_Subscriptions:e.target.checked, View_Subscriptions: true})}/>
        <span>Edit Subscription </span><br/>
        <input type='checkbox' checked={userPremission.Delete_Subscriptions}  onChange={e => SetUserPremission({...userPremission, Delete_Subscriptions:e.target.checked ,View_Subscriptions: true})}/>
        <span>Delete Subscription </span><br/>
        <input type='checkbox' checked={userPremission.View_Movies}  onChange={checkIfMoviesInTrue}/>
        <span>View Movies </span><br/>
        <input type='checkbox' checked={userPremission.Create_Movies} onChange={e => SetUserPremission({...userPremission, Create_Movies:e.target.checked, View_Movies:true})}/>
        <span>Create Movies </span><br/>
        <input type='checkbox' checked={userPremission.Update_Movies} onChange={e => SetUserPremission({...userPremission, Update_Movies:e.target.checked, View_Movies:true})}/>
        <span>Edit Movies </span><br/>
        <input type='checkbox' checked={userPremission.Delete_Movies} onChange={e => SetUserPremission({...userPremission, Delete_Movies:e.target.checked, View_Movies:true})}/>
        <span>Delete Movies </span><br/>
        <input type='button' className='user-edit-btn' value='Save' onClick={SaveAllChanges}/><span>&nbsp;&nbsp;</span>
        <input type='button' className='user-edit-btn' value='Cancel' onClick={CancelEdit}/>

    </div>)
}
export default CreateUserComp