import React, { useEffect, useState } from 'react'
import MovieWatchComp from './MovieWatchComp'
import { useHistory } from 'react-router-dom'
import { deleteMemmber } from "../Data/DataForMembers";
import './MemberComp.css'


const MembersComp = (props) =>{
    const history = useHistory()
    const [member, setMember] = useState({name: '', email: '', city: '', movies: []})
    const [premissions] = useState(JSON.parse(localStorage.getItem('allUserInfo')))

    useEffect(()=>{
        let unmounted  =true
        unmounted && setMember(props.member)
        return ()=>{
            unmounted = false
        }
    },[props.member])
    
    const editMember = () =>{
        delete member.movies
        history.push({
            pathname:'/main/subscriptions/editmember',
            member: {...member}
        })
    }
    const deleteTheMember = async()=>{
        let resp = await deleteMemmber(member._id)
        if(resp){
            refrsh()
        }
    }
    const refrsh = () => {
        props.refrshMembers()
    }
    
 return (
 <div className='main-member-div'>
     <h2>{member.name}</h2>
     <b>Email: {member.email}</b><br/>
     <span>City: {member.city}</span><br/>
     <div className='mebers-battons'>
        {premissions.premissions.Delete_Subscriptions && <input type='button' className='member-edit-btn' value='Delete' onClick={deleteTheMember}/>}
        <span>&nbsp;&nbsp;</span>
        {premissions.premissions.Update_Subscriptions && <input type='button' className='member-edit-btn' value='Edit'onClick={editMember}/>}
     </div>
    <MovieWatchComp members={member} refrshParent={refrsh}/>


 </div>)   
}
export default MembersComp