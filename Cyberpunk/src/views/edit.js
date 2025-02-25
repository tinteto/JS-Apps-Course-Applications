import { html } from '../../node_modules/lit-html/lit-html.js';
import { editItem, getItemById } from '../data/items.js';
import { createSubmitHandler } from '../util.js';
import { notificationView } from './notification.js';


const editTemplate = (item, onEdit) => html`
   <section id="edit">
          <div class="form form-item">
            <h2>Edit Your Item</h2>
            <form class="edit-form" @submit=${onEdit}>
              <input type="text" name="item"  .value=${item.item} id="item" placeholder="Item" />
              <input
                type="text"
                name="imageUrl"
                .value=${item.imageUrl}
                id="item-image"
                placeholder="Your item Image URL"
              />
              <input
                type="text"
                name="price"
                .value=${item.price}
                id="price"
                placeholder="Price in Euro"
              />
              <input
                type="text"
                name="availability"
                .value=${item.availability}
                id="availability"
                placeholder="Availability Information"
              />
              <input
                type="text"
                name="type"
                .value=${item.type}
                id="type"
                placeholder="Item Type"
              />
              <textarea
                id="description"
                name="description"
                .value=${item.description}
                placeholder="More About The Item"
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
    const item = await getItemById(id);

    ctx.render(editTemplate(item, createSubmitHandler(onEdit)));

    async function onEdit({
        item,
        imageUrl, 
        price, 
        availability,
        type,
        description
      }) {

        if(item == '' || imageUrl == '' || price == '' || availability == '' || type == '' || description == '') {
          return notificationView('All fields are required');
        }

        const updatedItem = await editItem(id, {
            item,
            imageUrl, 
            price, 
            availability,
            type,
            description
          });

          ctx.page.redirect('/catalog/' + id);

    }
}