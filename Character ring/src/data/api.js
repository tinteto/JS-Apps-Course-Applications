import { clearUserData, getUserData } from "../util.js";

const host = 'http://localhost:3030';

async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    };
    
    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const userData = getUserData(); 

    if (userData != null) {
        const token = userData.accessToken;
        options.headers['X-Authorization'] = token;
    }


    try {
        const response = await fetch(host + url, options);

        let result;

        if (response.status != 204) {
            result = await response.json(); // ако има грешка, този резултат ще бъде грешката
        }

        if (response.ok != true) {
            if (response.status == 403) { //невалиден токен
                clearUserData(); 
            }
            const error = result;
            throw error;
        }

        return result;

    } catch (err) {
        alert(err.message);
        throw err;
    }
}

export const get = request.bind(null, 'get');
export const post = request.bind(null, 'post');
export const put = request.bind(null, 'put');
export const del = request.bind(null, 'delete');


