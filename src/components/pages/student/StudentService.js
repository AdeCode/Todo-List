import http from './http-common'

const getAll = () => {
    return http.get('/students')
};

const get = id => {
    return http.get(`/student/${id}`)
};

const create = data => {
    return http.post('/addStudent', data)
};

const update = (id, data) => {
    return http.put(`/student/${id}`, data)
};

const remove = id => {
    return http.delete(`/student/${id}`)
};

const removeAll = () => {
    return http.delete(`/students`)
};

const findByName = name => {
    //return http.get(`/students?name=${name}`)
    return http.get(`/search/${name}`)
};

const createUser = (data) => {
    return http.post('/create-user', data)
}

const userLogin = (data) => {
    return http.post('/user-login', data)
}

export default {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByName,
    createUser,
    userLogin
};
