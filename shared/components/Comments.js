import React, { Component } from 'react';
import { connect, PromiseState } from 'react-refetch';

import Comment from './Comment';
import CommentForm from './CommentForm';

const Comments = ({
  commentsFetch,
  refreshComments,
  storyId
}) => {
  if (commentsFetch.fulfilled) {
    return (
      <div>
        <h2>Comments</h2>
        <ul>
          {commentsFetch.value.map(comment => (
            <Comment
              key={comment._id}
              body={comment.body}
            />
          ))}
        </ul>

        <CommentForm
          storyId={storyId}
          refreshComments={refreshComments}
        />
      </div>
    );
  }

  return null;
};

export default connect(props => {
  const url = `/api/comments/?story_id=${props.storyId}`;

  return {
    commentsFetch: url,

    refreshComments: () => ({
      commentsFetch: {
        url,
        force: true
      }
    })
  };
})(Comments);
