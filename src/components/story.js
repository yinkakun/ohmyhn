import { render, html } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import spinner from './spinner';
import commentsTemplate from './comments';
import formatTime from '../utils/format-time';
import getUrlDomain from '../utils/get-url-domain';
import { fetchStory } from '../store/actions';
import parseHash from '../utils/parse-hash';

const handleFetchError = store => {
  return {
    handleEvent() {
      const { id } = parseHash();
      store.dispatch(fetchStory(id));
    }
  };
};

const fetchError = store => {
  return html`
    <div class="fetch-error">
      <p>Looks like you lost your connection. Please check it and try again.</p>
      <button @click=${handleFetchError(store)} class="fetch-error__button">try again</button>
    </div>
  `;
};

const storyTemplate = story => html`
  <div class="story">
    <header class="story__header">
      <h2 class="story__title">
        ${story.title}
      </h2>
      <p class="story__details">
        <span>${story.author}</span>
        <time>${formatTime(story.timeCreated)}</time>
        ${story.url
          ? html`
              <a href=${story.url} target="_blank">[${getUrlDomain(story.url)}]</a>
            `
          : ''}
      </p>
    </header>

    <div class="story__text">
      ${unsafeHTML(story.text)}
    </div>

    <section class="comment-list">
      <h2 class="comment-list__heading">
        <span class="line"></span>
        <span>
          Responses
        </span>
        <span class="line"></span>
      </h2>

      ${commentsTemplate(story.comments)}
    </section>
  </div>
`;

const renderStory = store => {
  const $view = document.getElementById('content-container');
  const state = store.getState();
  const { story } = state;
  // const { id } = parseHash();
  // const { stories } = state;
  // const story = stories.find(storyd => storyd.id === id);

  if (state.isFetching) {
    render(spinner, $view);
    return;
  }

  if (state.error) {
    render(fetchError(store), $view);
    return;
  }

  render(storyTemplate(story), $view);
};

export default renderStory;
