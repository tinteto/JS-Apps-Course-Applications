import { get, post } from "./api.js"

const endpoints = {
    likedCharacter: '/data/useful',
    byCharacterId: (characterId) => `/data/useful?where=characterId%3D%22${characterId}%22&distinct=_ownerId&count`,
    byCharacterAndUserId: (characterId, userId) => `/data/useful?where=characterId%3D%22${characterId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}


export async function postLikes(characterId) {
    return post(endpoints.likedCharacter, { characterId } );
}

export async function getLikesForCharacter(characterId) {
    return get(endpoints.byCharacterId(characterId))
}

export async function getLikesForUser(characterId, userId) {
    return get(endpoints.byCharacterAndUserId(characterId, userId))
}