import { html } from '../../node_modules/lit-html/lit-html.js';
import { editSolution, getSolutionById } from '../data/CRUD.js';
import { createSubmitHandler } from '../util.js';


const editTemplate= (solution, onEditFunc) => html`
   <section id="edit">
          <div class="form">
            <img class="border" src="./images/border.png" alt="" />
            <h2>Edit Solution</h2>
            <form class="edit-form" @submit=${onEditFunc}>
              <input
                type="text"
                name="type"
                .value=${solution.type}
                id="type"
                placeholder="Solution Type"
              />
              <input
                type="text"
                name="image-url"
                .value=${solution.imageUrl}
                id="image-url"
                placeholder="Image URL"
              />
              <textarea
                id="description"
                name="description"
                .value=${solution.description}
                placeholder="Description"
                rows="2"
                cols="10"
              ></textarea>
              <textarea
                id="more-info"
                name="more-info"
                .value=${solution.learnMore}
                placeholder="more Info"
                rows="2"
                cols="10"
              ></textarea>
              <button type="submit">Edit</button>
            </form>
          </div>
        </section>`;


export async function editPage(ctx) {
    const id = ctx.params.id;
    const solution = await getSolutionById(id);

    ctx.render(editTemplate(solution, createSubmitHandler(onEditFunc)));

    async function onEditFunc({
        type,
        ["image-url"]: imageUrl, 
        description, 
        ["more-info"]: learnMore}) {

        if(type == '' || imageUrl == '' || description == '' || learnMore == '') {
          return alert('All field are required!');
        }

        const editedSolution = await editSolution(id, {
            type,
            imageUrl, 
            description, 
            learnMore
          });

        ctx.page.redirect('/catalog/' + id); 

        }
}