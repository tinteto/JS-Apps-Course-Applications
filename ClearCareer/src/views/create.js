import { html } from '../../node_modules/lit-html/lit-html.js';
import { createOffer } from '../data/offers.js';
import { createSubmitHandler } from '../util.js';


const createTemplate = (onCreate) => html`
<section id="create">
          <div class="form">
            <h2>Create Offer</h2>
            <form class="create-form" @submit=${onCreate}>
              <input
                type="text"
                name="title"
                id="job-title"
                placeholder="Title"
              />
              <input
                type="text"
                name="imageUrl"
                id="job-logo"
                placeholder="Company logo url"
              />
              <input
                type="text"
                name="category"
                id="job-category"
                placeholder="Category"
              />
              <textarea
                id="job-description"
                name="description"
                placeholder="Description"
                rows="4"
                cols="50"
              ></textarea>
              <textarea
                id="job-requirements"
                name="requirements"
                placeholder="Requirements"
                rows="4"
                cols="50"
              ></textarea>
              <input
                type="text"
                name="salary"
                id="job-salary"
                placeholder="Salary"
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>`;



export function createPage(ctx) {
    ctx.render(createTemplate(createSubmitHandler(onCreate)));

    
    async function onCreate({
        title,
        imageUrl,
        category,
        description,
        requirements,
        salary }) { //функция за създаване на офертата чрез подадения формуляр

        if([ title, imageUrl, category, description, requirements, salary ].some(el => el == '')) {
                return alert('All field are required');
            } // кратък запис на if проверки дали някое от полетата не е празен стринг

        const result = await createOffer({
            title,
            imageUrl,
            category,
            description,
            requirements,
            salary }); // ако валидацията е минала изпращаме post заявка

            ctx.page.redirect('/catalog');
    }
}