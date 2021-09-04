import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './SubsMovieComp.css'


const SubsriptionWatchComp = (props) =>{
    const [SubscriptionWatch, setSubscriptionWatch] = useState([])

    useEffect(()=>{
        let data = props.whoWatch
        setSubscriptionWatch(data)
    },[ props.whoWatch])

    let subsriptionToRender = ''
    if(SubscriptionWatch !== undefined){
        subsriptionToRender = SubscriptionWatch.map((subs, i) => {
            return (<li key={i}><Link to="/main/subscriptions">{subs.name}</Link>, {subs.date}</li>)
        })
    }
    
    return (
    <div className = 'main-subs-watch'>
        <b id='sub-header'>Subsription watch</b>
        <ul>{subsriptionToRender}</ul>
    </div>
    )
}
export default SubsriptionWatchComp