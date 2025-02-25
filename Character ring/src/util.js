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
    return function (event) { //browser form submissions cause the page to reload
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
     
        const data = Object.fromEntries(formData.entries());
    //formData.entries() - get array of values
    // Object.fromEntries - връща обект input name attribute and input value (което потребителят е въвел) - {email: 'peter@abv.bg', password: '123456'}
        
    callback(data, form); // подаваме данните и формуляра
    };

   
}