import {getAll, getByID} from './DAL'


const jsonPremissionURl = `https://server-side-cinema.herokuapp.com/json/premission`
const jsonUserURl = `https://server-side-cinema.herokuapp.com/json/users`;
const usersFromDbURl = 'https://server-side-cinema.herokuapp.com/api/users'

export async function clearUserData(){
    const usersJsonData = await getAll(jsonUserURl)
    const premissions = await getAll(jsonPremissionURl)
    const usersDbData = await getAll(usersFromDbURl)

    let clearUsers = usersDbData.map(user => {
        let person = getPersonDataById(usersJsonData, user._id);
        let premission = getUserPremissionById(premissions, user._id)
        if(person === undefined){
            person = {firstName : '', lastName: '' , createdDate: '', sessionTimeOut: 0}
        }
        if(premission === undefined){
            premission.permissions = []
        }
        let userObj = {
            id: user._id,
            firstName: person.firstName ,
            lastName: person.lastName ,
            createdDate: person.createdDate ,
            sessionTimeOut: person.sessionTimeOut ,
            userName: user.userName,
            permissions: premission.permissions
        }
        return userObj
    })
    return clearUsers
}

export async function isUserAlreadyExsist(NewuserName, originalUserName){
    const allUser = await getAll(usersFromDbURl)
    let searchUser = allUser.filter(user => {
        return user.userName === NewuserName && user.userName !== originalUserName})
    if(searchUser.length === 0){
        return true
    }else{
        return false
    }
}

export async function userDataWithBooleanPremissionById(id){
    const usersJsonData = await getByID(id, jsonUserURl)
    const premissions = await getByID(id, jsonPremissionURl)
    const usersDbData = await getByID(id, usersFromDbURl)
    delete usersJsonData.id
    delete premissions.id
    let premissionObj =  getObjPremissionFronArray(premissions.permissions)
        let clearUser = {
            ...usersJsonData, 
            premissions:premissionObj,
            id:usersDbData._id, 
            userName: usersDbData.userName
        }
    return clearUser
}

const getUserPremissionById = (premission, id) =>{
    return premission.find(prem => prem.id === id)
}
const getPersonDataById = (persons, id) =>{
    return persons.find(person => person.id === id )
}

export const getObjPremissionFronArray = (array) =>{
    if(Array.isArray(array)){
        let objPremission = {
            View_Subscriptions: array.includes("View Subscriptions"),
            Create_Subscriptions: array.includes("Create Subscriptions"),
            Update_Subscriptions: array.includes("Update Subscriptions"),
            Delete_Subscriptions: array.includes("Delete Subscriptions"),
            View_Movies: array.includes("View Movies"),
            Create_Movies: array.includes("Create Movies"),
            Update_Movies: array.includes("Update Movies"),
            Delete_Movies: array.includes("Delete Movies"),
            Admin: array.includes("Admin") 
        }
        return objPremission
    }
    else return array
}
export const connvertPremissionObjToArray = (objPremission) =>{
    let premissionArray = []
    for (const [key, value] of Object.entries(objPremission)) {
        if(value){
            let str = key.replace(/_/g, ' ')
            premissionArray.push(str)
        }
    }
    return premissionArray
}
