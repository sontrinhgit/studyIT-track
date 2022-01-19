import axios from "axios"

//set Header la token gia tri nhan vao cho moi request gui di 
const setAuthToken = token => {
    if(token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete axios.defaults.headers.common['Authorzation']
    }
}

export default setAuthToken