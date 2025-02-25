const itemName = 'userData'; // данните, които се запазват във сториджа, когато имаме логнат потребител: email, _id, accessToken


export function getUserData() { // взимаме данните от сториджа
    return JSON.parse(localStorage.getItem(itemName)); //converts string into an object
}

export function setUserData(data) {  //запазваме данните в сториджа
    return localStorage.setItem(itemName, JSON.stringify(data));
} // по-правилно е да извадим само някои свойства, а не цялата userData (email, _id, accessToken)

export function clearUserData() { //изтриваме данните от сториджа
    localStorage.removeItem(itemName);
}

export function createSubmitHandler(callback) {
    return function (event) {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
      

        callback(data, form); // подаваме данните и формуляра
    };

   
}