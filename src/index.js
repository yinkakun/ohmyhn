import './index.css';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import renderStories /* { getStoryType } */ from './components/stories';
import renderStory from './components/story';
import configureStore from './store/configure-store';
import parseHash from './utils/parse-hash';
import { fetchStories, fetchStory } from './store/actions';
import setActiveLink from './utils/active-link';

const store = configureStore();

store.dispatch(fetchStories('news', 1));
store.dispatch(fetchStories('newest', 1));
store.dispatch(fetchStories('jobs', 1));
store.dispatch(fetchStories('ask', 1));
store.dispatch(fetchStories('show', 1));

const mount = () => {
  const { id } = parseHash();

  if (id) {
    renderStory(store, id);
  } else {
    renderStories(store);
  }
};

window.addEventListener('load', () => {
  setActiveLink();
  const { id } = parseHash();
  if (id) store.dispatch(fetchStory(id));
  mount();
});

window.addEventListener('popstate', () => {
  setActiveLink();
  const { id } = parseHash();
  if (id) store.dispatch(fetchStory(id));
  mount();
});

store.subscribe(mount);

OfflinePluginRuntime.install();
