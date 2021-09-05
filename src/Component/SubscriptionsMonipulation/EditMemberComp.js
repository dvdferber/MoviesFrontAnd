import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {updateExsist} from '../Data/DAL'
import './EditAndCreate.css'

const membersURl = 'https://server-side-cinema.herokuapp.com/api/members'

const EditMemberComp = () =>{
    const location = useLocation()
    const history = useHistory()
    const [memberToEdit, setMemberToEdit] = useState({name: '', email: '', city:''})
    const [memberName] = useState(location.member.name)
    
    useEffect(()=>{
        let unmounted  =true
        let member = location.member
        unmounted && setMemberToEdit(member)
        return ()=>{
            unmounted = false
        }
    },[location.member])


    const saveMember =async()=>{
        let resp = await updateExsist(memberToEdit._id, membersURl, memberToEdit)
        if(resp){
            history.push('/main/subscriptions')
        }
        console.log(memberToEdit);
    }
    return (
    <div className='edit-member-main'>
        <h3 className='header-edit-member'>Edit member: {memberName}</h3>
        <span className='input-member-edit'>Name: </span><br/>
        <input type='text' className='input-member-data' defaultValue={memberToEdit.name} onChange={e => setMemberToEdit({...memberToEdit, name: e.target.value})}/><br/>
        <span className='input-member-edit'>Email: </span><br/>
        <input type='text' className='input-member-data' defaultValue={memberToEdit.email} onChange={e => setMemberToEdit({...memberToEdit, email: e.target.value})}/><br/>
        <span className='input-member-edit'>City: </span><br/>
        <input type='text' className='input-member-data' defaultValue={memberToEdit.city} onChange={e => setMemberToEdit({...memberToEdit, city: e.target.value})}/><br/>
        <div className='member-btn'>
            <input type='button' value='Save' className='member-edit-btn' onClick={saveMember}/><span>&nbsp;&nbsp;</span>
            <input type='button' value='Cancel'className='member-edit-btn' onClick={()=>history.push('/main/subscriptions')}/>
        </div>
    </div>)
}
export default EditMemberComp