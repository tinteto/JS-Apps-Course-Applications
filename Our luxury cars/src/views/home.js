import { html } from '../../node_modules/lit-html/lit-html.js';

//TODO Replace with actual view
const homeTemplate = () => html`
<section id="hero">
          <h1>
            Accelerate Your Passion Unleash the Thrill of Sport Cars Together!
          </h1>
        </section>
`


export function homePage(ctx) {
    ctx.render(homeTemplate());
}