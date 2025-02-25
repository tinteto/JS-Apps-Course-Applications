import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteCharacter, getById } from '../data/characters.js';
import { getLikesForCharacter, getLikesForUser, postLikes } from '../data/likes.js';
import { getUserData } from '../util.js';

const detailsTemplate = (character, onDelete, onLike) => html`
<section id="details">
  <div id="details-wrapper">
            <img id="details-img" src=${character.imageUrl} alt="example1" />
      <div>
            <p id="details-category">${character.category}</p>
                  <div id="info-wrapper">
                    <div id="details-description">
                <p id="description">${character.description}</p>
                   <p id ="more-info">${character.moreInfo}</p>
                    </div>
                  </div>
                  <h3>Is This Useful:<span id="likes">${character.likes}</span></h3>
    
              
          ${character.canEdit || character.canLike ? html`
          <div id="action-buttons">
            ${character.canEdit ? html`
            <a href="/catalog/${character._id}/edit" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>` : null}
            ${character.canLike ? html`
            <a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>` : null}
          </div>` : null};    
      </div>
    </div>
  </section>`;


export async function detailsPage(ctx) {
  const id = ctx.params.id;

  const requests = [
    getById(id),
    getLikesForCharacter(id)
  ];

  const userData = getUserData();

  if (userData) {
    requests.push(getLikesForUser(id, userData._id));
  }

  const [character, likes, hasLiked] = await Promise.all(requests);
  character.likes = likes;


  if (userData) {
    character.canEdit = userData._id == character._ownerId;
    character.canLike = character.canEdit == false && hasLiked == 0;
  }


  update();
  function update() {
    ctx.render(detailsTemplate(character, onDelete, onLike));
  }


  async function onDelete() {
    const choice = confirm('Are you sure?');

    if (choice) {
      await deleteCharacter(id);
    }
    ctx.page.redirect('/catalog');
  }


  async function onLike() {
    await postLikes(id);
    character.likes++;
    character.canLike = false;

    update(); // ще преренди хтмл-а
  }
}