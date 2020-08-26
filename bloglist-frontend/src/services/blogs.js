import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'
let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
  console.log(token)
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const getName = async newObject => {
  
  const response = await axios.get('http://localhost:3003/api/blogs')
  return response.data
}


const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }


console.log("config:",config)
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
const getBlog = (newObject) => {
// newObject.map((blog) => {
//   const request = axios.get(`http://localhost:3003/api/blogs/:${blog.id}`)
//   return request.then(response => response.data)
// })
  ///console.log("newobject:",newObject)
  const request = axios.get(`http://localhost:3003/api/blogs/${newObject}`)
  
  return request.then(response =>response.data)
 }

const updata = (id,newObject) => {
  const request = axios.put(`http://localhost:3003/api/blogs/${id}`,newObject)
  return request.then(response => response.data)
}
export default { getAll,create ,setToken,getName, getBlog,updata}