import React, { useEffect, useState } from 'react'
import MembersComp from './MemberComp'
import { getAllMembers } from '../Data/DataForMembers'

const AllMembersComp = () =>{
    const [allMembers, SetAllMembers] = useState([])
    const [userPremission] = useState(JSON.parse(localStorage.getItem('allUserInfo')))
    const [refrsh, setRefrsh] = useState(true)

    useEffect(()=>{
        let unmounted =true
        const getMembers = async() =>{
            let allMembers = await getAllMembers()
            unmounted && SetAllMembers([...allMembers])
        }
        if(unmounted){
            getMembers()
        }
        return ()=>{
            unmounted = false
        }
    },[refrsh])

    let membersToRender = allMembers.map((member, i) => {
        return (<MembersComp key={member._id} member={member} refrshMembers={d => setRefrsh(!refrsh)}/>)
    })
    return (
        <div >
            {userPremission.premissions.View_Subscriptions && membersToRender}
        </div>
    )
}
export default AllMembersComp