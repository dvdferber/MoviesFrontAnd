import { useEffect, useState, } from 'react'
import DAL from '../Data/DAL'
import { useHistory } from 'react-router-dom'
import './Users.css'


const usersJsonURl = 'http://localhost:7000/json/users/'
const usersDBurl = 'http://localhost:7000/api/users/'
const premissionURl = 'http://localhost:7000/json/premission'


const UserComp = (props) =>{
    const history = useHistory()
    const [user, setUser] = useState({firstName: "", lastName: "", createdDate:"", sessionTimeOut:10, permissions: [] })

    useEffect(()=>{
        setUser(props.user)
    },[props.user])

    const deleteUser = async() =>{
        let userID = user.id
        await DAL.deleteObj(userID, usersJsonURl)
        await DAL.deleteObj(userID, premissionURl)
        await DAL.deleteObj(userID, usersDBurl)
            props.trigger()
    }
    const goToEditUser = () =>{
        history.push(
        {
            pathname: '/main/users/edituser',
            user: {...user}
         })
    }
    let premissionToRender = []
    premissionToRender = user.permissions.map((prem, i) =>{
        return (<li key={i}>{prem}</li>)
    })
    return ( <div className='main-user-comp'>
        <span className='header-what-data'>First name:</span> <span className='user-data'>{user.firstName}</span><br/>
        <span className='header-what-data'>Last Name:</span> <span className='user-data'>{user.lastName}</span><br/>
        <span className='header-what-data'>User Name:</span> <span className='user-data'>{user.userName}</span><br/>
        <span className='header-what-data'>Creation Date:</span> <span className='user-data'>{user.createdDate.slice(0,10)}</span><br/>
        <span className='header-what-data'>Session time out:</span> <span className='user-data'>{user.sessionTimeOut}</span><br/>
        <div><span className='header-what-data'>Premission: </span>
            <ul>
                {premissionToRender}
            </ul>
        </div>
        <div className='user-btn-area'>
            <input className='user-btn' type='button' value='Edit' onClick={goToEditUser}/><span>&nbsp;&nbsp;</span>
            <input className='user-btn' type='button' value='Delete' onClick={deleteUser}/>
        </div>
    </div>)
}
export default UserComp