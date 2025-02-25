// import { html } from '../../node_modules/lit-html/lit-html.js';
// import { deleteOffer, getById } from '../data/offers.js';
// import { getUserData } from '../util.js';


// //TODO Replace with actual view
// const detailsTemplate = (offer, onDelete) => html`
//  <section id="details">
//           <div id="details-wrapper">
//             <img id="details-img" src=${offer.imageUrl} alt="example1" />
//             <p id="details-title">${offer.title}</p>
//             <p id="details-category">
//               Category: <span id="categories">${offer.category}</span>
//             </p>
//             <p id="details-salary">
//               Salary: <span id="salary-number">${offer.salary}</span>
//             </p>
//             <div id="info-wrapper">
//               <div id="details-description">
//                 <h4>Description</h4>
//                 <span>${offer.description}</span
//                 >
//               </div>
//               <div id="details-requirements">
//                 <h4>Requirements</h4>
//                 <span
//                   >${offer.requirements}</span
//                 >
//               </div>
//             </div>
//             <p>Applications: <strong id="applications">1</strong></p>

//             <!--Edit and Delete are only for creator-->
//             ${offer.canEdit ? html`
//             <div id="action-buttons">
//               <a href="/catalog/${offer._id}/edit" id="edit-btn">Edit</a>
//               <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a> 
//             </div>`
//     : null};

//               <!--Bonus - Only for logged-in users ( not authors )
//                <a href="" id="apply-btn">Apply</a> -->
//           </div>
//         </section>`;

// export async function detailsPage(ctx) {
//   const id = ctx.params.id; //изваждаме id-то от параметрите - свойството се казва 'id', защото сме го кръстили 'id' в page('/catalog/:id', detailsPage);
//   const offer = await getById(id); // изваждаме текущата оферта, като й подаваме id-то

//   const userData = getUserData();

//   if (userData && userData._id == offer._ownerId) {
//     offer.canEdit = true;
//   }

//   ctx.render(detailsTemplate(offer, onDelete)); //подаваме офертата на темплейта

//   async function onDelete() {
//     const choice = confirm('Are you sure?');

//     if(choice) {
//     await deleteOffer(id);
//     ctx.page.redirect('/catalog');
//     }
//   }
// }


import { html } from '../../node_modules/lit-html/lit-html.js';
import { apply, getApplications, getUserApplication } from '../data/applications.js';
import { deleteOffer, getById } from '../data/offers.js';
import { getUserData } from '../util.js';


//TODO Replace with actual view
const detailsTemplate = (offer, onDelete, onApply) => html`
 <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${offer.imageUrl} alt="example1" />
            <p id="details-title">${offer.title}</p>
            <p id="details-category">
              Category: <span id="categories">${offer.category}</span>
            </p>
            <p id="details-salary">
              Salary: <span id="salary-number">${offer.salary}</span>
            </p>
            <div id="info-wrapper">
              <div id="details-description">
                <h4>Description</h4>
                <span>${offer.description}</span
                >
              </div>
              <div id="details-requirements">
                <h4>Requirements</h4>
                <span
                  >${offer.requirements}</span
                >
              </div>
            </div>
            <p>Applications: <strong id="applications">${offer.applications}</strong></p>

            <!--Edit and Delete are only for creator-->
            ${offer.canEdit || offer.canApply ? html`
            <div id="action-buttons">
              ${offer.canEdit ? html`
              <a href="/catalog/${offer._id}/edit" id="edit-btn">Edit</a>
              <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>` : null}
              ${offer.canApply ? html`<a @click=${onApply} href="javascript:void(0)" id="apply-btn">Apply</a>`: null}
            </div>` : null};
          </div>
        </section>`;

export async function detailsPage(ctx) {
  const id = ctx.params.id; //изваждаме id-то от параметрите - свойството се казва 'id', защото сме го кръстили 'id' в page('/catalog/:id', detailsPage);

  const requests = [
    getById(id),
    getApplications(id),
  ];

  const userData = getUserData(); //взимаме потребителските данни

  if (userData) {
    requests.push(getUserApplication(id, userData._id)); //ид-то на офертата и ид-то на потребителя
  }

  const [offer, applications, hasApplied] = await Promise.all(requests);
  offer.applications = applications;


  if (userData) {
    offer.canEdit = userData._id == offer._ownerId; //връща true или false
    offer.canApply = offer.canEdit == false && hasApplied == 0; //връща true или false
  }



  update();

  function update() {
    ctx.render(detailsTemplate(offer, onDelete, onApply)); //подаваме офертата на темплейта
  }



  async function onDelete() {
    const choice = confirm('Are you sure?');

    if (choice) {
      await deleteOffer(id);
      ctx.page.redirect('/catalog');
    }
  }


  
  async function onApply() {
    await apply(id);
    offer.applications++;
    offer.canApply = false;

    update(); // ще преренди хтмл-а
  }
}