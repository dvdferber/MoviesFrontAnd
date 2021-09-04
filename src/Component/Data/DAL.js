const axios = require('axios')

const getAll = async(url) =>{
    let response = await axios.get(url);
    return response.data
}
const getByID = async(id, url) =>{
    if(id !== undefined){
        let response = await axios.get(`${url}/${id}`);
        return response.data
    } 
}
const updateExsist = async(id, url, obj) =>{
    let response = await axios.put(`${url}/${id}`, obj)
    return response.data
}
const createNew = async(url, obj) =>{
    let response = await axios.post(url, obj)
    return response.data
}
const deleteObj = async(id, url) =>{
    let response = await axios.delete(`${url}/${id}`)
    return response.data
}


module.exports = {getAll, getByID, updateExsist, createNew, deleteObj}