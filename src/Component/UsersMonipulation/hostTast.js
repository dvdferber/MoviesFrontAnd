import React, {useState} from 'react'
import UsresComp from './UsersComp'
import CreateUserComp from './CreateUserComp'
import EditUsersComp from './EditUsers'
import { Switch, Route, useHistory } from 'react-router-dom'
import './Users.css'


function HostComp() {
    const history = useHistory()
    const [userPremission] = useState(JSON.parse(localStorage.getItem('allUserInfo')))

    const showAllUsers = () =>{
        history.push('/main/users')
    }
    const addUser = () =>{
        history.push('/main/users/createuser')
    }

    return (
        <div className='user-router-menu'>
            <div className='nav-users-btn'>
            {userPremission.premissions.Admin && <input className='btn-menu-in-comp' type='button' value='All users'onClick={showAllUsers}/>}
            {userPremission.premissions.Admin && <input className='btn-menu-in-comp' type='button' value='Add user' onClick={addUser}/>}<br/>
            </div>
            <Switch>
                <Route exact path='/main/users' component={UsresComp}/>
                <Route path='/main/users/createuser' component={CreateUserComp}/>
                <Route path='/main/users/edituser' component={EditUsersComp}/>
            </Switch>
        </div>
    )
}

export default HostComp
