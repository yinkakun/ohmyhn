import { render, html } from 'lit-html';
import spinner from './spinner';
import formatTime from '../utils/format-time';
import isPlural from '../utils/is-plural';
import { fetchStories } from '../store/actions';
import parseHash from '../utils/parse-hash';

const getStoryType = () => {
  const parsedHash = parseHash();
  const storyTypes = {
    top: 'news',
    '': 'news',
    new: 'newest',
    ask: 'ask',
    show: 'show',
    jobs: 'jobs'
  };

  return storyTypes[parsedHash.type] || 'newest';
};

const handleFetchError = store => {
  return {
    handleEvent() {
      const storyType = getStoryType(store);
      const state = store.getState();
      const { pageCount } = state[storyType];
      store.dispatch(fetchStories(storyType, pageCount));
    }
  };
};

const fetchError = store => {
  return html`
    <div class="fetch-error">
      <p>looks like you lost your connection. please check it and try again.</p>
      <button @click=${handleFetchError(store)} class="fetch-error__button">try again</button>
    </div>
  `;
};

const handleLoadMore = store => {
  return {
    handleEvent() {
      const $listContainer = document.querySelector('.story-list');
      const currentScrollPosition = $listContainer.scrollTop;
      const storyType = getStoryType(store);
      const state = store.getState();
      const { pageCount } = state[storyType];

      store.dispatch(fetchStories(storyType, pageCount));
      $listContainer.scrollTop = currentScrollPosition;
    }
  };
};

const loadMorebutton = store => {
  return html`
    <button @click=${handleLoadMore(store)} class="load-more__button">load more</button>
  `;
};

const storiesTemplate = (store, stories, loadMoreSpinner) => html`
  <ul class="story-list">
    ${stories.map(
      story =>
        html`
          <li class="story-list__item">
            <div class="story-list__details">
              <span>
                ${story.author} | ${formatTime(story.time)}
              </span>
              <a class="story-list__link" href="${story.url}" target="_blank"
                >${story.domain ? story.domain : ''}
              </a>
            </div>

            <p href="#" class="story-list__title">
              ${story.title}
            </p>

            <span class="story-list__links">
              <a class="story-list__link" href="#story&id=${story.id}">
                ${story.numberOfComments}
                ${isPlural(story.numberOfComments) ? 'comments' : 'comment'}
              </a>
            </span>
          </li>
        `
    )}
  </ul>
  ${loadMoreSpinner || loadMorebutton(store)}
`;

const renderStories = store => {
  const $view = document.getElementById('content-container');
  const state = store.getState();
  const storyType = getStoryType(store);
  const { stories } = state[storyType];

  if (stories.length === 0 && state.isFetching) {
    render(spinner, $view);
    return;
  }

  if (stories.length > 0 && state.isFetching) {
    render(storiesTemplate(store, stories, spinner), $view);
    return;
  }

  if (state.error) {
    render(fetchError(store), $view);
    return;
  }

  render(storiesTemplate(store, stories), $view);
};

export { getStoryType };
export default renderStories;
