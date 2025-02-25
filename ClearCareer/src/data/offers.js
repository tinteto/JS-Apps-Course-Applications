//CRUD operations - get, post, put, del requests to the server

import { del, get, post, put } from "./api.js";

const endpoints = {
    catalog: '/data/offers?sortBy=_createdOn%20desc',
    byId: '/data/offers/'
}

export async function getAllOffers() {
    return get(endpoints.catalog);
}

export async function getById(id) {
    return get(endpoints.byId + id); // взимане на една оферта
}

export async function createOffer(data) {
    return post(endpoints.catalog, data); // приема данните, които потребителят въвежда
}

export async function updateOffer(id, data) {
    return put(endpoints.byId + id, data);
}

export async function deleteOffer(id) {
    return del(endpoints.byId + id);
}



