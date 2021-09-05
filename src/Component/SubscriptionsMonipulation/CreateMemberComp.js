import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {createNew} from '../Data/DAL'
import './EditMemberComp'

const membersURl = 'https://server-side-cinema.herokuapp.com/api/members'

const CreateMemberComp = () =>{
    const history = useHistory()
    const [newMember, setNewMember] = useState({name: ''})
    const [isNameToSort, setIsNameToSort] = useState(false)

    const hendalNameChange = (e)=>{
        if(e.target.value !== ''){
            setNewMember({...newMember, name: e.target.value})
            setIsNameToSort(false)
        }else{
            setIsNameToSort(true)
        }

    }

    const addMember =async()=>{
        if(newMember.name !== '' &&  !isNameToSort){
            let resp = await createNew(membersURl, {...newMember})
            if(resp){
                history.push('/main/subscriptions')
            }
        }else{
            setIsNameToSort(true)
        }
        
    }
    return (
    <div  className='edit-member-main'>
        <h3 className='header-edit-member'>Create member</h3>
        <span className='input-member-edit'>Name: </span><br/>
        <input type='text' className='input-member-data' onChange={hendalNameChange}/><br/>
        {isNameToSort  && <span className='require-mgs'>*this field is required<br/></span>}
        <span className='input-member-edit'>email: </span><br/>
        <input type='mail' className='input-member-data' onChange={e => {setNewMember({...newMember, email: e.target.value})}}/><br/>
        <span className='input-member-edit'>city: </span><br/>
        <input type='city' className='input-member-data' onChange={e => {setNewMember({...newMember, city: e.target.value})}}/><br/>
        <div className='member-btn'>
            <input type='button' value='Cancel' className='member-edit-btn' onClick={()=>history.push('/main/subscriptions')}/><span>&nbsp;&nbsp;</span>
            <input type='button' value='Save' className='member-edit-btn' onClick={addMember}/>
        </div>
       


    </div>)
}
export default CreateMemberComp