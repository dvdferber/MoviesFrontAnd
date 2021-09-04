import React, {useEffect, useState } from 'react'
import {clearUserData} from '../Data/Utils'
import UserComp from './UserComp'

const UsresComp = (props) =>{
    const [users, setUsers] = useState([])
    const [userPremission] = useState(JSON.parse(localStorage.getItem('allUserInfo')))
    const [trigger, setTrigger] = useState(false)


    useEffect(()=>{
        let unmonted = false
        const getData = async()=>{
            let data =  await clearUserData()// function in utils file
            let anlySimpleUsers = data.filter(user => !user.permissions.includes('Admin'))
            setUsers(anlySimpleUsers)
        }
        if(!unmonted){
            userPremission.premissions.Admin && getData()
        }
        return ()=>{
            unmonted = true
        }
    },[trigger, userPremission])
    
    let usersToRender = users.map((user) => {
        return <UserComp key={user.id} user={user} trigger={bool => setTrigger(!trigger)}/>
    })
    return (<div>
        {!userPremission.premissions.Admin && <h3 style={{color:'red'}}>Sorry you don't have premission</h3>}
        {usersToRender}
    </div>)
}
export default UsresComp