const delay = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const fetchStories = (storyType, pageCount) => {
  return async dispatch => {
    dispatch({ type: 'FETCH_STORIES_BEGIN' });
    await delay(100);
    fetch(`https://node-hnapi.herokuapp.com/${storyType}?page=${pageCount}`)
      .then(response => response.json())
      .then(data =>
        data.map(story => ({
          title: story.title,
          url: story.url,
          id: story.id,
          numberOfComments: story.comments_count,
          time: story.time,
          author: story.user,
          domain: story.domain
        }))
      )
      .then(
        result => dispatch({ type: 'FETCH_STORIES_SUCCESS', newStories: result, storyType }),
        error => dispatch({ type: 'FETCH_STORIES_FAILURE', error })
      );
  };
};

const fetchStory = storyId => {
  return async dispatch => {
    dispatch({ type: 'FETCH_STORY_BEGIN' });
    fetch(`https://hn.algolia.com/api/v1/items/${storyId}`)
      .then(response => response.json())
      .then(story => ({
        title: story.title,
        text: story.text,
        comments: story.children,
        timeCreated: story.created_at_i,
        url: story.url,
        author: story.author,
        points: story.points
      }))
      .then(
        result => dispatch({ type: 'FETCH_STORY_SUCCESS', story: result }),
        error => dispatch({ type: 'FETCH_STORY_FAILURE', error })
      );
  };
};

export { fetchStories, fetchStory };
