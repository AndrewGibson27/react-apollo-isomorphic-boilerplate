import React, { Component } from 'react';
import { connect, PromiseState } from 'react-refetch';

import Comments from './comments';
import { ColumnNine } from '../styles/grid';

const Story = ({
  storyFetch,
  match: { params: { id } }
}) => {
  if (storyFetch.fulfilled) {
    const { value: { headline, body } } = storyFetch;

    return (
      <ColumnNine>
        <article>
          <h1>{headline}</h1>
          <p>{body}</p>
          <Comments
            storyId={id}
          />
        </article>
      </ColumnNine>
    );
  }

  return null;
};

export default connect(props => ({
  storyFetch: `/api/stories/${props.match.params.id}`
}))(Story);
