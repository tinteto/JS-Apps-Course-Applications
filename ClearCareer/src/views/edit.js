import { html } from '../../node_modules/lit-html/lit-html.js';
import { getById, updateOffer } from '../data/offers.js';
import { createSubmitHandler } from '../util.js';


const editTemplate = (offer, onEdit) => html`
 <section id="edit">
          <div class="form">
            <h2>Edit Offer</h2>
            <form class="edit-form" @submit=${onEdit}>
              <input
                type="text"
                name="title"
                .value=${offer.title}
                id="job-title"
                placeholder="Title"
              />
              <input
                type="text"
                name="imageUrl"
                .value=${offer.imageUrl}
                id="job-logo"
                placeholder="Company logo url"
              />
              <input
                type="text"
                name="category"
                .value=${offer.category}
                id="job-category"
                placeholder="Category"
              />
              <textarea
                id="job-description"
                name="description"
                .value=${offer.description}
                placeholder="Description"
                rows="4"
                cols="50"
              ></textarea>
              <textarea
                id="job-requirements"
                name="requirements"
                .value=${offer.requirements}
                placeholder="Requirements"
                rows="4"
                cols="50"
              ></textarea>
              <input
                type="text"
                name="salary"
                .value=${offer.salary}
                id="job-salary"
                placeholder="Salary"
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>`;



export async function editPage(ctx) {
  
  const id = ctx.params.id; //изваждаме id-то от параметрите - свойството се казва 'id', защото сме го кръстили 'id' в page('/catalog/:id', detailsPage);
  
  const offer = await getById(id); //// изваждаме текущата оферта, като й подаваме id-то
   //данните, които идват от офертата ги слагаме във value-то на отделните инпут полета 

  ctx.render(editTemplate(offer, createSubmitHandler(onEdit))); //като сме взели офертата я подаваме като първи параметър на темплейта 


    async function onEdit({ title, imageUrl, category, description, requirements, salary }) { //функция за създаване на офертата чрез подадения формуляр

        if([ title, imageUrl, category, description, requirements, salary ].some(el => el == '')) {
                return alert('All field are required');
            } // кратък запис на if проверки дали някое от полетата не е празен стринг

        await updateOffer(id, {
            title,
            imageUrl,
            category,
            description,
            requirements,
            salary }); // приема id като първи параметър, за да вземе офертата с даденото id, да я редактира и да изпрати put заявка ако валидацията е минала

            ctx.page.redirect('/catalog/' + id); 
    }
}
