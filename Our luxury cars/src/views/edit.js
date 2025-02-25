import { html } from '../../node_modules/lit-html/lit-html.js';
import { editCar, getCarById } from '../data/cars.js';
import { createSubmitHandler } from '../util.js';


const editTemplate = (car, onEdit) => html`
<section id="edit">
          <div class="form form-auto">
            <h2>Edit Your Car</h2>
            <form class="edit-form" @submit=${onEdit}>
              <input type="text" name="model" .value=${car.model} id="model" placeholder="Model" />
              <input
                type="text"
                name="imageUrl"
                .value=${car.imageUrl}
                id="car-image"
                placeholder="Your Car Image URL"
              />
              <input
                type="text"
                name="price"
                .value=${car.price}
                id="price"
                placeholder="Price in Euro"
              />
              <input
                type="number"
                name="weight"
                .value=${car.weight}
                id="weight"
                placeholder="Weight in Kg"
              />
              <input
                type="text"
                name="speed"
                .value=${car.speed}
                id="speed"
                placeholder="Top Speed in Kmh"
              />
              <textarea
                id="about"
                name="about"
                .value=${car.about}
                placeholder="More About The Car"
                rows="10"
                cols="50"
              ></textarea>
              <button type="submit">Edit</button>
            </form>
          </div>
        </section>
       `;


export async function editPage(ctx) {
    const id = ctx.params.id;
    const car = await getCarById(id);

    ctx.render(editTemplate(car, createSubmitHandler(onEdit)));

    async function onEdit({
        model,
        imageUrl, 
        price, 
        weight,
        speed,
        about
      }) {

        if(model == '' || imageUrl == '' || price == '' || weight == '' || speed == '' || about == '') {
            return alert('All fields required!');
        }

        const updatedCar = await editCar(id, {
            model,
            imageUrl, 
            price, 
            weight,
            speed,
            about
          });

          ctx.page.redirect('/catalog/' + id);

    }
}