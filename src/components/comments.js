import { html } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import formatTime from '../utils/format-time';
import isPlural from '../utils/is-plural';

const toggleNestedComments = {
  handleEvent($event) {
    const El = $event.target;
    El.classList.toggle('is-visible');
    if (El.dataset.textSwap === El.textContent) {
      El.textContent = El.dataset.textOriginal;
    } else {
      El.dataset.textOriginal = El.textContent;
      El.textContent = El.dataset.textSwap;
    }
  },
  capture: true
};

const commentsTemplate = comments => {
  return html`
    ${comments
      .filter(comment => comment.text !== null)
      .map(
        comment =>
          html`
            <article class="comment">
              <header class="comment__header">
                <span>${comment.author}</span>
                <time>${formatTime(comment.created_at_i)}</time>
              </header>

              <p class="comment__text">
                ${unsafeHTML(comment.text)}
              </p>

              ${comment.children.length
                ? html`
                    <div class="nested-comment">
                      <span
                        @click=${toggleNestedComments}
                        data-text-swap="hide ${isPlural(comment.children.length)
                          ? 'replies'
                          : 'reply'}"
                        data-text-original="${comment.children.length} more ${isPlural(
                          comment.children.length
                        )
                          ? 'replies'
                          : 'reply'}"
                        class="nested-comment__toggle"
                        >${comment.children.length} more
                        ${isPlural(comment.children.length) ? 'replies' : 'reply'}</span
                      >

                      ${commentsTemplate(comment.children)}
                    </div>
                  `
                : ''}
            </article>
          `
      )}
  `;
};

export default commentsTemplate;
