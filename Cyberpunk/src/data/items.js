import { del, get, post, put } from "./api.js"

const endpoints = {
    catalog: '/data/cyberpunk?sortBy=_createdOn%20desc',
    createNewItem: '/data/cyberpunk',
    byId: '/data/cyberpunk/'

}


export async function getAllItems() {
    return get(endpoints.catalog);
}

export async function getItemById(id) {
    return get(endpoints.byId + id)
}


export async function createItem(data) {
    return post(endpoints.createNewItem, data);
}


export async function editItem(id, data) {
    return put(endpoints.byId + id, data)
}

export async function deleteItem(id) {
    return del(endpoints.byId + id);
}
