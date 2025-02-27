const itemName = 'userData';


export function getUserData() {
    return JSON.parse(localStorage.getItem(itemName));
}

export function setUserData(data) {
    return localStorage.setItem(itemName, JSON.stringify(data));
} // по-правилно е да извадим само някои свойства, а не цялата userData

export function clearUserData() {
    localStorage.removeItem(itemName);
}

export function createSubmitHandler(callback) {
    return function (event) {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        console.log(data);

        callback(data, form); // подаваме данните и формуляра
    };

   
}