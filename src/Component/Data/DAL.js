import axios  from 'axios'

export const getAll = async(url) =>{
    let response = await axios.get(url);
    return response.data
}
export const getByID = async(id, url) =>{
    if(id !== undefined){
        let response = await axios.get(`${url}/${id}`);
        return response.data
    } 
}
export const updateExsist = async(id, url, obj) =>{
    let response = await axios.put(`${url}/${id}`, obj)
    return response.data
}
export const createNew = async(url, obj) =>{
    let response = await axios.post(url, obj)
    return response.data
}
export const deleteObj = async(id, url) =>{
    let response = await axios.delete(`${url}/${id}`)
    return response.data
}


//export default   {getAll, getByID, updateExsist, createNew, deleteObj}