import { html } from '../../node_modules/lit-html/lit-html.js';
import { getById, updateCharacter } from '../data/characters.js';
import { createSubmitHandler } from '../util.js';

const editTemplate = (character, onEdit) => html`
   <section id="edit">
          <div class="form">
            <img class="border" src="./images/border.png" alt="">
            <h2>Edit Character</h2>
            <form class="edit-form" @submit=${onEdit}>
            <input type="text" name="category" .value=${character.category} id="category" placeholder="Character Type"/>
            <input type="text" name="image-url" .value=${character.imageUrl} id="image-url" placeholder="Image URL"/>
            <textarea id="description" name="description" .value=${character.description} placeholder="Description"  rows="2" cols="10"></textarea>
            <textarea id="additional-info" name="additional-info" .value=${character.moreInfo} placeholder="Additional Info" rows="2" cols="10"></textarea>
            <button type="submit">Edit</button>
            </form>
            <img class="border" src="./images/border.png" alt="">
          </div>
        </section>`;



export async function editPage(ctx) {
    const id = ctx.params.id;
    const character = await getById(id);

    ctx.render(editTemplate(character, createSubmitHandler(onEdit)));

    async function onEdit({
      category,
      ['image-url']: imageUrl,
      description,
      ['additional-info']: moreInfo  }) {

        if([ category, imageUrl, description, moreInfo ].some(el => el == '')) {
          return alert('All field are required');
      }
        await updateCharacter(id, {
            category,
            imageUrl, 
            description, 
            moreInfo });

          ctx.page.redirect('/catalog/' + id);
    }

}