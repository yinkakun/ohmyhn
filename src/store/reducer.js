const initialState = {
  ask: { stories: [], pageCount: 1 },
  news: { stories: [], pageCount: 1 },
  newest: { stories: [], pageCount: 1 },
  show: { stories: [], pageCount: 1 },
  jobs: { stories: [], pageCount: 1 },
  story: {},
  isFetching: false,
  error: false
};

const stories = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_STORY_BEGIN':
      return { ...state, error: false, isFetching: true };

    case 'FETCH_STORY_FAILURE':
      window.console.warn(action.error);
      return { ...state, error: true, isFetching: false };

    case 'FETCH_STORY_SUCCESS':
      return {
        ...state,
        story: action.story,
        isFetching: false,
        error: false
      };

    case 'FETCH_STORIES_BEGIN':
      return { ...state, error: false, isFetching: true };

    case 'FETCH_STORIES_FAILURE':
      window.console.warn(action.error);
      return { ...state, error: true, isFetching: false };

    case 'FETCH_STORIES_SUCCESS': {
      const { newStories } = action;
      const { storyType } = action;
      const oldStories = state[storyType].stories;
      const oldPageCount = state[storyType].pageCount;
      const newPageCount = oldPageCount + 1;

      return {
        ...state,
        [storyType]: { stories: [...oldStories, ...newStories], pageCount: newPageCount },
        isFetching: false,
        error: false
      };
    }

    default:
      return { ...state };
  }
};

export default stories;
