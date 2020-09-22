import axios from 'axios'
const url = 'http://localhost:3001/persons'
const getAll = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}
const deleteOne = (id) => {
    const  request = axios.delete(`http://localhost:3001/persons/${id}`)
    return request.then(response => response.data)
}
const update = (person) => {
    const request = axios.put(url + `/${person.id}`,person)
    return request.then(response => response.data)
}
export default{
    getAll, deleteOne,update
}