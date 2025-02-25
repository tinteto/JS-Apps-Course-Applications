import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllCharacters } from '../data/characters.js';



const catalogTemplate = (characters) => html`
       <h2>Characters</h2>
        <section id="characters">
          ${characters.length > 0 ? characters.map(characterCard) : html`<h2>No added Heroes yet.</h2>`}
        </section>`;

const characterCard = (character) => html`
 <div class="character">
            <img src=${character.imageUrl} alt="example1" />
            <div class="hero-info">
              <h3 class="category">${character.category} </h3>
              <p class="description">${character.description} </p>
              <a class="details-btn" href="/catalog/${character._id}">More Info</a>
            </div>
 </div>`;
       
    
export async function catalogPage(ctx) {

    const characters = await getAllCharacters();

    ctx.render(catalogTemplate(characters))
}