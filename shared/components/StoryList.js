import React, { Component } from 'react';

import StoryItem from './StoryItem';

const StoryList = ({ stories, path }) => (
  <ul>
    {stories.map(story => (
      <StoryItem
        key={story._id}
        data={story}
        path={path}
      />
    ))}
  </ul>
);

export default StoryList;
