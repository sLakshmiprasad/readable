import React, { Component } from 'react';
import Comment from '../containers/Comment';
import Card from 'material-ui/Card';

export default class Comments extends Component {
  componentWillReceiveProps() {
    if (!this.props.comments) this.props.fetchComments(this.props.postId);
  }

  componentWillMount() {
    if (!this.props.comments) this.props.fetchComments(this.props.postId);
  }

  componentWillUnmount() {
    this.props.clearComments();
  }

  state = {
    editPost: false
  };

  render() {
    const { comments } = this.props;
    return (
      <Card className="comment-section">
        {comments &&
          comments.map((comment, i) => <Comment key={i} comment={comment} />)}
      </Card>
    );
  }
}
