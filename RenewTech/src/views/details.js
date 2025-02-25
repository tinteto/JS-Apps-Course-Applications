import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteSolution, getSolutionById } from '../data/CRUD.js';
import { getLikesForSolution, getLikesForUser, postLikes } from '../data/likes.js';
import { getUserData } from '../util.js';



const detailsTemplate = (solution, onDeleteFunc, onLikeFunc) => html`
<section id="details">
          <div id="details-wrapper">
            <img
              id="details-img"
              src=${solution.imageUrl}
              alt="example1"
            />
            <div>
              <p id="details-type">${solution.type}</p>
              <div id="info-wrapper">
                <div id="details-description">
                  <p id="description">${solution.description}</p>
                  <p id="more-info">${solution.learnMore}</p>
                </div>
              </div>
              <h3>Like Solution:<span id="like">${solution.likes}</span></h3>

            ${solution.allowEdit || solution.allowLike? html`
            <div id="action-buttons">
              ${solution.allowEdit ? html`
              <a href="/catalog/${solution._id}/edit" id="edit-btn">Edit</a>
                <a @click=${onDeleteFunc} href="javascript:void(0)" id="delete-btn">Delete</a>` : null}
               
                ${solution.allowLike ? html`
                <a @click=${onLikeFunc} href="javascript:void(0)" id="like-btn">Like</a>` : null}
              </div>` : null}
            </div>
          </div>
        </section>`;



export async function detailsPage(ctx) {
    const id = ctx.params.id;
   

    const requests = [
      getSolutionById(id),
      getLikesForSolution(id),
    ];

    const userData = getUserData();

    
  if (userData) {
    requests.push(getLikesForUser(id, userData._id));
  }

  const [solution, likes, hasLiked] = await Promise.all(requests);
  solution.likes = likes;

  if (userData) {
    solution.allowEdit = userData._id == solution._ownerId;
    solution.allowLike = solution.allowEdit == false && hasLiked == 0;
  }


    ctx.render(detailsTemplate(solution, onDeleteFunc, onLikeFunc));

    async function onDeleteFunc() {
        const sure = confirm('Are you sure you want to delete this solution?');

        if(sure) {
            await deleteSolution(id);
            ctx.page.redirect('/catalog');
        }
    }


    async function onLikeFunc() {
      await postLikes(id);
      solution.likes++;
      solution.allowLike = false;
  
      ctx.render(detailsTemplate(solution, onDeleteFunc, onLikeFunc));
    }

}