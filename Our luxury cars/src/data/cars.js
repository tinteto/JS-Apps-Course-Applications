import { del, get, post, put } from "./api.js"

const endpoints = {
    catalog: '/data/cars?sortBy=_createdOn%20desc',
    createNewCar: '/data/cars',
    byId: '/data/cars/',
    byName: (query) => `/data/cars?where=model%20LIKE%20%22${query}%22`
}


export async function getAllCars() {
    return get(endpoints.catalog);
}

export async function getCarById(id) {
    return get(endpoints.byId + id)
}


export async function createCar(data) {
    return post(endpoints.createNewCar, data);
}


export async function editCar(id, data) {
    return put(endpoints.byId + id, data)
}

export async function deleteCar(id) {
    return del(endpoints.byId + id);
}


export async function searchCar(query) {
    return get(endpoints.byName(query));
}