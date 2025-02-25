import { get, post } from "./api.js";


const endpoints = {
    likedSolution: '/data/likes',
    bySolutionId: (solutionId) => `/data/likes?where=solutionId%3D%22${solutionId}%22&distinct=_ownerId&count`,
    bySolutionAndUserId: (solutionId, userId) => `/data/likes?where=solutionId%3D%22${solutionId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}


export async function postLikes(solutionId) {
    return post(endpoints.likedSolution, { solutionId } );
}

export async function getLikesForSolution(solutionId) {
    return get(endpoints.bySolutionId(solutionId))
}

export async function getLikesForUser(solutionId, userId) {
    return get(endpoints.bySolutionAndUserId(solutionId, userId))
}