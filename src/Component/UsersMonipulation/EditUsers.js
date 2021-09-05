import React, {useEffect, useState} from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import {connvertPremissionObjToArray, getObjPremissionFronArray, isUserAlreadyExsist} from '../Data/Utils'
import {updateExsist} from '../Data/DAL'
import './EditUser.css'


const usersJsonURl = 'https://server-side-cinema.herokuapp.com/json/users/'
const usersDBurl = 'https://server-side-cinema.herokuapp.com/api/users/'
const premissionURl = 'https://server-side-cinema.herokuapp.com/json/premission'

const EditUserComp = (props) =>{
    const location = useLocation()
    const history = useHistory()

    const [user, setDataFromUser] = useState({firstName: '', lastName:'' , sessionTimeOut: '', userName:''})
    const [firstName, setFirstName] = useState()
    const [originalUserName, setOriginalUserName] = useState()
    const [isUserNameExsist, setIsUserNameExsist] = useState(false)
    const [isUserNameToSort, setIsUserNameToSort] = useState(false)
    const [userToEdit, setUserToEdit] = useState({userName:''})
    const [userPremission, SetUserPremission] = useState({
            View_Subscriptions:false, Create_Subscriptions:false,
            Update_Subscriptions: false, Delete_Subscriptions:false,
            View_Movies: false, Create_Movies: false,
            Update_Movies: false, Delete_Movies: false,
    })

    useEffect(()=>{
        let userr = location.user
        let permissions = getObjPremissionFronArray(userr.permissions)
        setDataFromUser(userr)
        SetUserPremission(permissions)
        setUserToEdit({userName: userr.userName})
        setFirstName(userr.firstName)
        setOriginalUserName(userr.userName)
    },[location.user])

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
    const editUserName =(e) =>{
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
        let isExsist = await isUserAlreadyExsist(userToEdit.userName, originalUserName)
        if(isExsist && !isUserNameToSort){
            let personToSend = {...user}
            delete personToSend.permissions
            delete personToSend.userName
            let userResp = await updateExsist(user.id, usersDBurl, {...userToEdit})
            let jsonUserResp = await updateExsist(user.id, usersJsonURl, {...personToSend})
            let premissionTemp = connvertPremissionObjToArray(userPremission)
            premissionTemp = await updateExsist(user.id, premissionURl, {id:user.id, permissions: [...premissionTemp]})
            if(userResp || jsonUserResp || premissionTemp){
                history.push('/main/users')
            }
        }
        else{
            setIsUserNameExsist(true)
        }
    }
    const CancelEdit = () =>{
        history.push('/main/users')
    }

    return (
    <div className='edit-user-main'>
        <div className='header-edit-user'><h3>Edit user {firstName} </h3></div>
        <span className='input-haders-edit'>First Name: </span><br/><input  className='input-user-data' type='text' defaultValue={user.firstName} onChange={e => setDataFromUser({...user, firstName:e.target.value})}/><br/>
        <span className='input-haders-edit'>Last Name: </span><br/><input className='input-user-data' type='text' defaultValue={user.lastName} onChange={e => setDataFromUser({...user, lastName:e.target.value})}/><br/>
        <span className='input-haders-edit'>Session timeout: </span><br/><input className='input-user-data' type='number' min="0" defaultValue={user.sessionTimeOut} onChange={e => setDataFromUser({...user, sessionTimeOut:e.target.value})}/><br/>
        <span className='input-haders-edit'>User name: </span><br/>
        <input className='input-user-data' type='text' defaultValue={user.userName} onChange={editUserName}/><br/>
        {isUserNameToSort  && <span className='require-mgs'>*this field is required <br/></span>}
        {isUserNameExsist  && <span className='require-mgs'>*this userName already exsist</span>}<br/>
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
export default EditUserComp