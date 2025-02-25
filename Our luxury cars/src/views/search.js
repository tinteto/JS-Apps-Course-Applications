import { html } from '../../node_modules/lit-html/lit-html.js';
import { searchCar } from '../data/cars.js';
// import { getUserData } from '../util.js';


const searchTemplate = (onSearch, foundCars) => html`
    <section id="search">
        <div class="form">
        <h4>Search</h4>
        <form class="search-form">
            <input type="text" name="search" id="search-input" />
            <button @click=${onSearch} class="button-list">Search</button>
        </form>
        </div>
        <div class="search-result">

            ${foundCars.length > 0
                ? html`
                    ${foundCars.map((car) => foundCarCard(car))} 
                `
                : html`
                    <h2 class="no-avaliable">No result.</h2>
                `}
        </div>
    </section>
`;

const foundCarCard = (car) => html`
    <div class="car">
        <img src=${car.imageUrl} alt="example1"/>
        <h3 class="model">${car.model}</h3>
        <a class="details-btn" href="/catalog/${car._id}">More Info</a>
    </div>
`;

export async function searchPage(ctx) {
    let foundCars = [];
    // const userData = getUserData();

   ctx.render(searchTemplate(onSearch, foundCars));

    async function onSearch(e) {
        e.preventDefault();
        const name = document.getElementById('search-input').value;

        if(name == '') {
            return alert('The field is required');
        }

        foundCars = await searchCar(name);
        // console.log(foundCars);

        ctx.render(searchTemplate(onSearch, foundCars));
    }
}