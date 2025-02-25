import { html } from '../../node_modules/lit-html/lit-html.js';
import { createCharacter } from '../data/characters.js';
import { createSubmitHandler } from '../util.js';

const createTemplate = (onCreate) => html`
     <section id="create">
          <div class="form">
            <img class="border" src="./images/border.png" alt="">
            <h2>Add Character</h2>
            <form class="create-form" @submit=${onCreate}>
              <input
                type="text"
                name="category"
                id="category"
                placeholder="Character Type"
              />
              <input
                type="text"
                name="image-url"
                id="image-url"
                placeholder="Image URL"
              />
              <textarea
              id="description"
              name="description"
              placeholder="Description"
              rows="2"
              cols="10"
            ></textarea>
            <textarea
              id="additional-info"
              name="additional-info"
              placeholder="Additional Info"
              rows="2"
              cols="10"
            ></textarea>
              <button type="submit">Add Character</button>
            </form>
            <img class="border" src="./images/border.png" alt="">
          </div>
        </section>`;


export function createPage(ctx) {
    ctx.render(createTemplate(createSubmitHandler(onCreate)));

    async function onCreate({
        category,
        ['image-url']: imageUrl,
        description,
        ['additional-info']: moreInfo }) {

      if([ category, imageUrl, description, moreInfo ].some(el => el == '')) {
        return alert('All field are required');
    }

        await createCharacter({
            category,
            imageUrl,
            description,
            moreInfo });

        ctx.page.redirect('/catalog');
    }
  
}