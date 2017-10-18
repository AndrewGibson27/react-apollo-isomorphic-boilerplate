import React, { Component } from 'react';
import { connect, PromiseState } from 'react-refetch';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  componentWillReceiveProps({
    postCommentResponse,
    refreshComments
  }) {
    if (postCommentResponse.fulfilled) {
      refreshComments();
    }
  }

  _onChange({ target: { value } }) {
    this.setState({ value });
  }

  _onSubmit(e) {
    e.preventDefault();
    this.props.postComment(this.state.value);
  }

  render() {
    return (
      <form
        onSubmit={this._onSubmit}
      >
        <textarea
          value={this.state.value}
          onChange={this._onChange}
        />
        <input
          type="submit"
        />
      </form>
    );
  }
}

export default connect(({ storyId: story_id }) => ({
  postComment: (body) => ({
    postCommentResponse: {
      url: '/api/comments',
      method: 'POST',
      body: JSON.stringify({ body, story_id })
     }
   })
}))(CommentForm);
