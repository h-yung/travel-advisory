import http from '../http-common';

const getAll = () => {
    return http.get('/advisories');
}
const get = id => {
    return http.get(`/advisories/${id}`);
}
const create = data => {
    return http.post('/advisories', data);
}
const update = (id, data) => {
    return http.put(`/advisories/${id}`, data);
}
const removeOne = id => { //notice
    return http.delete(`/advisories/${id}`);
}
const removeAll = () => {
    return http.delete('/advisories');
}
const findByCountry = country => {
    return http.get(`/advisories?country=${country}`);
}

const AdvisoryService = {
    getAll,
    get,
    create,
    update,
    removeOne,
    removeAll,
    findByCountry,
}

export default AdvisoryService;