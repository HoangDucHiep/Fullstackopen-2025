import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => axios.get(baseUrl).then(response => response.data);

const create = newObj => axios.post(baseUrl, newObj).then(response => response.data);

const deletePhone = id => axios.delete(`${baseUrl}/${id}`).then(response => response.data);

const updatePhone = (id, newObj) => {
    const request = axios.put(`${baseUrl}/${id}`, newObj)
    return request.then(response => response.data)
}

export default {
    getAll,
    create,
    deletePhone,
    updatePhone
}