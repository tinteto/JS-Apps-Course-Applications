import { del, get, post, put } from "./api.js"

const endpoints = {
    catalog: '/data/characters?sortBy=_createdOn%20desc',
    create: '/data/characters',
    byId: '/data/characters/'
}

export async function getAllCharacters() {
    return get(endpoints.catalog);

}

export async function getById(id) {
    return get(endpoints.byId + id);

}

export async function createCharacter(data) {
   return post(endpoints.create, data);

}

export async function updateCharacter(id, data) {
    return put(endpoints.byId + id, data);

}

export async function deleteCharacter(id) {
    return del(endpoints.byId + id);
}


