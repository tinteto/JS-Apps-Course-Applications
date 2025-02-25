import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllSolutions } from '../data/CRUD.js';


const catalogTemplate = (solutions) => html`
       <h2>Solutions</h2>
        <section id="solutions">
       ${solutions.length > 0 ? solutions.map(solutionOffer) : html`
       <h2 id="no-solution">No Solutions Added.</h2>`}
        </section>`;

const solutionOffer = (solution) => html`
<div class="solution">
            <img src=${solution.imageUrl} alt="example3" />
            <div class="solution-info">
              <h3 class="type">${solution.type}</h3>
              <p class="description">${solution.description}</p>
              <a class="details-btn" href="/catalog/${solution._id}">Learn More</a>
            </div>
          </div>`;



export async function catalogPage(ctx) {

    const solutions = await getAllSolutions();
    ctx.render(catalogTemplate(solutions));
}