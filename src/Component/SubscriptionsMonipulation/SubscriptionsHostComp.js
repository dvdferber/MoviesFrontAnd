import React, { useState } from 'react'
import { Switch, Route , useHistory} from 'react-router-dom';
import AllMembersComp from './AllMembersComp'
import EditMemberComp from './EditMemberComp'
import CreateMemberComp from './CreateMemberComp';
import './SubsGeneralCss.css'

const SubscriptionsHostComp = () =>{
    const history = useHistory()
    const [premissions] = useState(JSON.parse(localStorage.getItem('allUserInfo')))

    const allMembers=()=>{
        history.push('/main/subscriptions')
    }
    const addMember =()=>{
        history.push('/main/subscriptions/createmember')
    }
    return(
        <div className='subscriptions-main-host'>
            <div className='member-navigation-btns'>
            {premissions.premissions.Create_Subscriptions &&<input type='button'  className='btn-menu-in-comp' value='Add members'onClick={addMember}/> }
            {premissions.premissions.View_Subscriptions && <input type='button' className='btn-menu-in-comp' value='All members'onClick={allMembers}/>}
            </div>
            {!premissions.premissions.View_Subscriptions && <h3 style={{color:'red'}}>Sorry you don't have premissions</h3>}
            
            <Switch>
                <Route exact path='/main/subscriptions' component={AllMembersComp}/>
                <Route path='/main/subscriptions/editmember' component={EditMemberComp}/>
                <Route path='/main/subscriptions/createmember' component={CreateMemberComp}/>
            </Switch>


        </div>
    )
}
export default SubscriptionsHostComp