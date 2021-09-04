import React from 'react'
import { Switch, Route } from 'react-router-dom'
import {FcCamcorderPro} from 'react-icons/fc'
import './style.css'

import LogInComp from './LogIn/LogInComp'
import CreactAccount from "./LogIn/CreactAccoumt"
import MenuComp from './HostMenu'

const HostComponnet = () =>{
    
    return  <div>
        <div className='web-site-header'>
            <h1>&nbsp;&nbsp;&nbsp;&nbsp; <FcCamcorderPro/> Movies - Subscription web site</h1>
        </div>   
        <div className='color-line'></div>
                <hr/>
                <Switch>
                    <Route exact path="/" component={LogInComp} />
                    <Route path="/CreateAccount" component={CreactAccount} />
                    <Route path='/main/' component={MenuComp}/>
                </Switch>
            </div>
}
export default HostComponnet