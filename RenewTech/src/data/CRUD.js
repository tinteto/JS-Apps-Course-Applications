import { del, get, post, put } from "./api.js";


const endpoints = {
    catalog: '/data/solutions?sortBy=_createdOn%20desc',
    create: '/data/solutions',
    byId: '/data/solutions/'
}

export async function getAllSolutions() {
    return get(endpoints.catalog);

}

export async function getSolutionById(id) {
    return get(endpoints.byId + id);

}

export async function createSolution(data) {
   return post(endpoints.create, data);

}

export async function editSolution(id, data) {
    return put(endpoints.byId + id, data);

}

export async function deleteSolution(id) {
    return del(endpoints.byId + id);
}